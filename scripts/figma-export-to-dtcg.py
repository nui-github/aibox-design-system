import json, re, sys, collections

src, out = sys.argv[1], sys.argv[2]
d = json.load(open(src))
report = collections.defaultdict(list)

def slug(k):
    return k.strip().lower().replace('&', 'and').replace(' ', '-')

def is_leaf(n):
    return isinstance(n, dict) and 'value' in n and isinstance(n.get('type'), str)

def px(v):
    if isinstance(v, (int, float)):
        s = ('%g' % v)
        return s + 'px'
    return v

def color(v):
    if isinstance(v, str) and re.fullmatch(r'#[0-9a-fA-F]{8}', v) and v.lower().endswith('ff'):
        return v[:7].lower()
    return v.lower() if isinstance(v, str) and v.startswith('#') else v

def ref(v, ctx):
    """rewrite alias string to new path"""
    def fix(m):
        p = m.group(1)
        p = p.replace('i-box paltform.global.color.', 'i-box.i-box.color.global.')
        if p != m.group(1): report['alias_remapped_from_missing_collection'].append(m.group(1))
        parts = p.split('.')
        if parts[:2] == ['i-box', 'i-box']:
            parts = parts[2:]
            if parts[0] == 'font':  # font.font family.x -> font.family.x
                parts = ['font'] + [re.sub(r'^font ', '', parts[1])] + parts[2:]
        elif parts[:2] == ['i-box', 'backdrop']:
            parts = ['color', 'backdrop']
        return '{' + '.'.join(slug(x) for x in parts) + '}'
    return re.sub(r'\{([^{}]+)\}', fix, v)

def convert_leaf(n, ctx):
    t, v = n['type'], n['value']
    tok = {}
    if t == 'color':
        tok['$type'] = 'color'
        tok['$value'] = ref(v, ctx) if isinstance(v, str) and v.startswith('{') else color(v)
    elif t == 'dimension':
        tok['$type'] = 'dimension'
        tok['$value'] = ref(v, ctx) if isinstance(v, str) else px(v)
    elif t == 'string':
        ctype = ctx.get('stringtype')
        if ctype: tok['$type'] = ctype
        tok['$value'] = v
    else:
        raise ValueError(t)
    if n.get('description'): tok['$description'] = n['description']
    return tok

out_root = {}
def put(path, tok):
    cur = out_root
    for p in path[:-1]:
        cur = cur.setdefault(p, {})
        assert '$value' not in cur, ('collision', path)
    assert path[-1] not in cur, ('dup', path)
    cur[path[-1]] = tok

def collect(n, path, fn):
    if is_leaf(n):
        fn(path, n); return
    for k, v in n.items():
        if k in ('description', 'extensions') or not isinstance(v, dict): continue
        collect(v, path + [k], fn)

ib = d['i-box']['i-box']
# variables: color / spacing / border / radius / font
for grp in ['color', 'spacing', 'border', 'radius']:
    collect(ib[grp], [grp], lambda p, n: put([slug(x) for x in p], convert_leaf(n, {})))
def font_leaf(p, n):
    newp = [p[0], re.sub(r'^font ', '', p[1])] + p[2:]
    ctx = {'stringtype': 'fontFamily' if newp[1] == 'family' else 'fontWeight'}
    put([slug(x) for x in newp], convert_leaf(n, ctx))
collect(ib['font'], ['font'], font_leaf)
# backdrop alias -> color.backdrop
bd = d['i-box']['backdrop']
put(['color', 'backdrop'], convert_leaf(bd, {}))
report['dropped'].append('i-box.string (placeholder "String value")')

# composite text styles: top-level "font" -> typography (drop decomposed duplicate "typography")
def typo(p, n):
    v = n['value']
    val = {'fontFamily': v['fontFamily'], 'fontSize': px(v['fontSize']), 'fontWeight': v['fontWeight'],
           'letterSpacing': px(v['letterSpacing']), 'lineHeight': px(v['lineHeight'])}
    if v.get('textCase', 'none') != 'none': val['textCase'] = v['textCase']
    if v.get('textDecoration', 'none') != 'none': val['textDecoration'] = v['textDecoration']
    tok = {'$type': 'typography', '$value': val}
    if n.get('description'): tok['$description'] = n['description']
    put(['typography'] + [slug(x) for x in p[1:]], tok)
collect(d['font'], ['font'], typo)
report['dropped'].append('typography.* (385 per-property leaves duplicating the 35 font styles)')

# shadows
def shadows(base, path):
    layers = []
    for k in sorted(x for x in base if x.isdigit()):
        v = base[k]['value']
        s = {'color': color(v['color']), 'offsetX': px(v['offsetX']), 'offsetY': px(v['offsetY']),
             'blur': px(v['radius']), 'spread': px(v['spread'])}
        if v.get('shadowType') == 'innerShadow': s['inset'] = True
        layers.append(s)
    tok = {'$type': 'shadow', '$value': layers if len(layers) != 1 else layers[0]}
    put(path, tok)
def walk_fx(n, path):
    for k, v in n.items():
        if k in ('description', 'extensions') or not isinstance(v, dict): continue
        if any(x.isdigit() and isinstance(v[x], dict) and v[x].get('type') == 'custom-shadow' for x in v):
            shadows(v, path + [slug(k)])
            if v.get('description'): pass
        elif is_leaf(v): pass
        else: walk_fx(v, path + [slug(k)])
walk_fx(d['effect']['wb']['shadow'], ['shadow'])
report['skipped_no_value'].append('effect.wb.blur.* (3 blur styles exported with description only, no radius)')

# verify aliases resolve
def flat(n, p, acc):
    if '$value' in n: acc['.'.join(p)] = n; return
    for k, v in n.items():
        if not k.startswith('$'): flat(v, p + [k], acc)
acc = {}; flat(out_root, [], acc)
bad = []
for k, t in acc.items():
    v = t['$value']
    if isinstance(v, str) and v.startswith('{'):
        tgt = v[1:-1]
        seen = 0
        while tgt in acc and isinstance(acc[tgt]['$value'], str) and acc[tgt]['$value'].startswith('{') and seen < 10:
            tgt = acc[tgt]['$value'][1:-1]; seen += 1
        if tgt not in acc: bad.append((k, v))
print('tokens', len(acc), collections.Counter(t.get('$type') for t in acc.values()))
print('unresolved aliases', bad)
print({k: (len(v) if k != 'alias_remapped_from_missing_collection' else sorted(set(v))) for k, v in report.items()})
json.dump(out_root, open(out, 'w'), indent=2, ensure_ascii=False); open(out, 'a').write('\n')
