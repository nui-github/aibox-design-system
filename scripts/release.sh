#!/usr/bin/env bash
# Create (or update) the GitHub release for the current version.
#
#   push to main      version from package.json -> tag vX.Y.Z at the pushed commit, if it has no release yet
#   push of a tag     tag vX.Y.Z as pushed (manual fallback)
#   workflow_dispatch INPUT_TAG (+ optional INPUT_COMMIT for a tag that does not exist yet); republishes the notes
#
# Every release needs release-notes/vX.Y.Z.md at that commit: line 1 is the title, the rest is the body.
# Refuses to release when package.json does not match the tag, tests fail, or dist/ is stale.
set -euo pipefail

repo="${GITHUB_REPOSITORY:?GITHUB_REPOSITORY is required}"
event="${GITHUB_EVENT_NAME:?GITHUB_EVENT_NAME is required}"
ref="${GITHUB_REF:-}"
sha="${GITHUB_SHA:?GITHUB_SHA is required}"
die() { echo "::error::$*"; exit 1; }
tag_exists() { git rev-parse -q --verify "refs/tags/$1" >/dev/null 2>&1; }

mode=main
tag=""
case "$event" in
  push)
    if [[ "$ref" == refs/tags/* ]]; then mode=tag; tag="${ref#refs/tags/}"; fi ;;
  workflow_dispatch)
    mode=dispatch; tag="${INPUT_TAG:?INPUT_TAG is required}" ;;
  *) die "unsupported event: $event" ;;
esac

# Decide the commit the release is built from.
if [[ "$mode" == dispatch ]]; then
  if tag_exists "$tag"; then sha="$(git rev-parse "refs/tags/$tag^{commit}")"
  elif [[ -n "${INPUT_COMMIT:-}" ]]; then sha="$(git rev-parse "${INPUT_COMMIT}^{commit}")"; fi
  git checkout -q --detach "$sha"
fi

version="$(node -p "require('./package.json').version")"
[[ "$mode" == main ]] && tag="v$version"
[[ "$tag" =~ ^v[0-9]+\.[0-9]+\.[0-9]+$ ]] || die "tag '$tag' is not vX.Y.Z"
[[ "$tag" == "v$version" ]] || die "tag $tag does not match package.json version $version at ${sha:0:7} (wrong commit?)"

release_exists=0
gh release view "$tag" --repo "$repo" >/dev/null 2>&1 && release_exists=1
if [[ "$mode" == main && $release_exists -eq 1 ]]; then
  echo "::notice::$tag already has a release; nothing to do"
  exit 0
fi

notes="release-notes/$tag.md"
[[ -f "$notes" ]] || die "missing $notes: add it (line 1 = release title, rest = notes) and push, or run this workflow again"

npm ci
npm test
git diff --exit-code -- dist || die "dist/ is not up to date with the sources; run npm test and commit dist/"

title="$(head -n 1 "$notes" | sed -E 's/^#+[[:space:]]*//')"
[[ -n "$title" ]] || title="$tag"
body="$(mktemp)"
tail -n +2 "$notes" > "$body"
if ! grep -q 'cdn.jsdelivr.net' "$body"; then
  base="https://cdn.jsdelivr.net/gh/${repo}@${version}/dist"
  {
    printf '\n\n## การใช้งาน\n```html\n'
    printf '<link rel="stylesheet" href="%s/tokens.css">\n' "$base"
    printf '<link rel="stylesheet" href="%s/ng-zorro-override.css">\n' "$base"
    printf '```\nโหลดหลัง CSS ของ ng-zorro-antd และระบุเวอร์ชันตายตัวเสมอ\n'
  } >> "$body"
fi

if [[ $release_exists -eq 1 ]]; then
  gh release edit "$tag" --repo "$repo" --title "$title" --notes-file "$body"
  echo "::notice::updated release $tag"
elif tag_exists "$tag"; then
  gh release create "$tag" --repo "$repo" --verify-tag --title "$title" --notes-file "$body"
  echo "::notice::created release $tag for the existing tag"
else
  gh release create "$tag" --repo "$repo" --target "$sha" --title "$title" --notes-file "$body"
  echo "::notice::created tag and release $tag at ${sha:0:7}"
fi
