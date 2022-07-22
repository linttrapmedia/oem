const { copyAssets } = require('./lib/assets');
const { bundleJavascript } = require('./lib/bundler');
const { compilePages } = require('./lib/pages');

copyAssets();
compilePages();
bundleJavascript();
