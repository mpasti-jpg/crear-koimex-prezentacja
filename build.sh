#!/bin/sh
# Skleja src/_head.html + src/slide-*.html + src/_foot.html w index.html
cd "$(dirname "$0")" || exit 1
cat src/_head.html src/slide-*.html src/_foot.html > index.html
echo "index.html: $(wc -c < index.html) B, slajdów: $(grep -c '<section class="slide' index.html)"
