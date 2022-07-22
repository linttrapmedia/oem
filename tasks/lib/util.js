const fs = require('fs');
const path = require('path');

/**
 * Look ma, it's cp -R.
 * @param {string} src  The path to the thing to copy.
 * @param {string} dest The path to the new copy.
 */
var copyRecursiveSync = function (src, dest) {
  var exists = fs.existsSync(src);
  var stats = exists && fs.statSync(src);
  var isDirectory = exists && stats.isDirectory();
  if (isDirectory) {
    fs.mkdirSync(`${__dirname}/../../${dest}`, { recursive: true });
    fs.readdirSync(src).forEach(function (childItemName) {
      copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName));
    });
  } else {
    fs.copyFileSync(src, dest);
  }
};

const readRecursive = (p, a = []) => {
  if (fs.statSync(p).isDirectory()) fs.readdirSync(p).map((f) => readRecursive(a[a.push(path.join(p, f)) - 1], a));
  return a;
};

module.exports = {
  copyRecursiveSync,
  readRecursive,
};
