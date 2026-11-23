#!/usr/bin/env bash
# Build the production site and publish it to Cloudflare Pages (https://subhameyeclinic.pages.dev).
# Requires a one-time `npx wrangler login`. Set GSC_VERIFY to keep the Search Console verification tag.
set -euo pipefail
cd "$(dirname "$0")/.."
npm run build
npx wrangler pages deploy dist --project-name subhameyeclinic --branch main --commit-dirty=true
echo "Live: https://subhameyeclinic.pages.dev/"
