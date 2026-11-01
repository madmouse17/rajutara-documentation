#!/usr/bin/env bash
# Record the 10 s clip of the real Rajutara window for the landing page: public/media/*.
#
#   scripts/record-demo.sh /path/to/rajutara /path/to/kaos-lengan-pendek-marker.optm
#
# Needs xvfb-run, ffmpeg, xwd (x11-apps) and Pillow. The app runs on Mesa software OpenGL under Xvfb with a
# throwaway HOME, so no saved window state or settings leak into the clip. Output: WebM (VP9) and MP4
# (H.264) of 1280x720 without sound, and a JPEG poster of the first frame.
set -euo pipefail

bin=${1:?path to the rajutara binary}
file=${2:?path to the marker file}
here=$(cd "$(dirname "$0")" && pwd)
out="$here/../public/media"
work=$(mktemp -d)
trap 'rm -rf "$work"' EXIT
mkdir -p "$out" "$work/home"

HOME="$work/home" XDG_CONFIG_HOME="$work/home/.config" XDG_DATA_HOME="$work/home/.local/share" \
  xvfb-run -a -s "-screen 0 1280x720x24" python3 "$here/record-demo.py" "$bin" "$file" "$work/raw.mkv" --poster "$work/first.png"

ffmpeg -loglevel error -y -i "$work/raw.mkv" -an -c:v libvpx-vp9 -b:v 0 -crf 38 -row-mt 1 -pix_fmt yuv420p \
  "$out/rajutara-marker-demo.webm"
ffmpeg -loglevel error -y -i "$work/raw.mkv" -an -c:v libx264 -preset slow -crf 28 -pix_fmt yuv420p \
  -movflags +faststart "$out/rajutara-marker-demo.mp4"
python3 - "$work/first.png" "$out/rajutara-marker-demo-poster.jpg" <<'PY'
import sys
from PIL import Image
Image.open(sys.argv[1]).convert("RGB").save(sys.argv[2], quality=84, optimize=True, progressive=True)
PY
ls -l "$out"
