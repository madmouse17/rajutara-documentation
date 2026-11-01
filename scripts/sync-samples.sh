#!/usr/bin/env bash
# Refresh everything on the site that is copied from the application repository: the sample tee files, the
# docs pages that are converted from its documents, the screenshots, the logo set and the geometry the
# pattern-to-marker sequence is drawn from.
#
#   scripts/sync-samples.sh /path/to/rajutara
#
# Run it after the samples, the glossary, the parity checklist, the screenshots or the logo change in the
# application repository, then rebuild and commit. Needs Python 3 with Pillow and numpy, and pdftoppm for the
# marker render.
set -euo pipefail

repo=${1:?path to the Rajutara checkout}
here=$(cd "$(dirname "$0")/.." && pwd)
sample=samples/kaos-lengan-pendek

mkdir -p "$here/public/$sample"
rm -f "$here/public/$sample"/*
cp "$repo/$sample"/* "$here/public/$sample/"

# Screenshots, as the application repository ships them.
for n in pds grading marker nest cutplan plot; do
  cp "$repo/docs/images/full-$n.jpg" "$here/src/assets/screens/full-$n.jpg"
done

# The logo set: favicon, header and footer marks.
for n in 128 256 512; do cp "$repo/assets/logo/rajutara-$n.png" "$here/src/assets/logo/rajutara-$n.png"; done
cp "$repo/assets/logo/rajutara-64.png" "$here/public/favicon.png"

cd "$here"
plt=$(ls "public/$sample"/*.plt)
pdf=$(ls "public/$sample"/*-marker.pdf)
python3 scripts/extract-tee.py "$plt" src/data/tee-marker.json
python3 scripts/render-marker.py "$pdf" src/assets/gallery/tee-marker.png --header-mm 260 --width 2400
python3 scripts/import-docs.py "$repo"
python3 scripts/clean-banner.py "$repo/assets/logo/rajutara-banner-wide.jpg" src/assets/brand/rajutara-banner.jpg --og public/og.jpg
python3 scripts/crop-gallery.py
rm -rf scripts/__pycache__
echo "synced from $repo"
