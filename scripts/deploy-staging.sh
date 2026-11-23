#!/usr/bin/env bash
# Build the noindex staging copy and publish it to the gh-pages branch (https://aryanshah0.github.io/subham-eye-clinic/).
set -euo pipefail
cd "$(dirname "$0")/.."
BASE=/subham-eye-clinic/ STAGING=1 npm run build
tmp=$(mktemp -d)
git worktree add -f "$tmp" gh-pages 2>/dev/null || { git fetch origin gh-pages:gh-pages && git worktree add -f "$tmp" gh-pages; }
find "$tmp" -mindepth 1 -maxdepth 1 ! -name .git -exec rm -rf {} +
cp -R dist/. "$tmp"/ && rm -rf "$tmp/.vite"
( cd "$tmp" && git add -A && git commit -q -m "Staging deploy $(date +%F)" && git push -q origin gh-pages ) || echo "nothing to deploy"
git worktree remove --force "$tmp"
echo "Staging: https://aryanshah0.github.io/subham-eye-clinic/"
