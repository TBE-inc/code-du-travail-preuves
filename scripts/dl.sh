#!/bin/bash
# usage: dl.sh listfile ; lines: dest|url
UA="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0 Safari/537.36"
while IFS='|' read -r dest url; do
  [ -z "$dest" ] && continue
  curl -sSL -A "$UA" --max-time 120 -o "$dest" "$url"
  printf '%s\t%s\t%s\n' "$(stat -c %s "$dest" 2>/dev/null)" "$(file -b "$dest" 2>/dev/null | cut -c1-40)" "$(basename "$dest")"
done < "$1"
