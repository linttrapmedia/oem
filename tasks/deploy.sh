#!/bin/sh
# delete this, it's only used to deploy the oem.js.org website

git checkout gh-pages && \
npm run clean && \
git merge main --no-commit --no-ff && \
npm run build && \
mv dist docs && \
echo oem.js.org >> docs/CNAME && \
echo oem.js.org >> CNAME && \
git add . && \
git commit -m 'deploy' && \
git push && \
rm -rf docs && \
git checkout main \