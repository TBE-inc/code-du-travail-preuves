#!/usr/bin/env bash
# Construit le site et publie dist/ sur la branche gh-pages (GitHub Pages).
set -euo pipefail
cd "$(dirname "$0")"
npm run build
touch dist/.nojekyll
remote=$(git -C .. remote get-url origin)
tmp=$(mktemp -d)
cp -r dist/. "$tmp"
cd "$tmp"
git init -q -b gh-pages
git add -A
git -c user.name="$(git -C "$OLDPWD/.." config user.name)" -c user.email="$(git -C "$OLDPWD/.." config user.email)" commit -q -m "Publication du site"
git push -q -f "$remote" gh-pages
rm -rf "$tmp"
echo "Publié sur https://tbe-inc.github.io/code-du-travail-preuves/"
