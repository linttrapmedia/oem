#!/bin/sh

git checkout gh-pages && \
npm run clean && \
git merge main --no-commit --no-ff && \
npm run build && \
mv public docs && \
echo oem.js.org >> docs/CNAME && \
git add . && \
git commit -m 'deploy' && \
git push && \
rm -rf docs && \
git checkout main \