#!/bin/sh
# Run one script on the Java reference and the TypeScript port and diff their logs.
# usage: research/compare.sh <script> <name> [extra headless args...]
set -e
here="$(cd "$(dirname "$0")" && pwd)"
script="$(cd "$(dirname "$1")" && pwd)/$(basename "$1")"
name="$2"
shift 2
python3 "$here/oracle.py" run "$script" "$here/out/$name-java" >/dev/null
(cd "$here/../web" && npx tsx tools/headless.ts ../Townsmen6-Revolution_s40v2a.jar "$script" "$here/out/$name-ts" "$@" >/dev/null)
if cmp -s "$here/out/$name-java/frames.log" "$here/out/$name-ts/frames.log" && cmp -s "$here/out/$name-java/events.log" "$here/out/$name-ts/events.log"; then
  echo "$name: identical ($(wc -l < "$here/out/$name-java/frames.log") frames)"
else
  echo "$name: DIFFERENT"
  diff "$here/out/$name-java/frames.log" "$here/out/$name-ts/frames.log" | head -5
  diff "$here/out/$name-java/events.log" "$here/out/$name-ts/events.log" | head -5
  exit 1
fi
