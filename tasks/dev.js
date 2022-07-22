const { startDevServer } = require('./lib/dev-server');
const { startRefreshDevServer } = require('./lib/refresh-server');
const { copyAssets } = require('./lib/assets');
const { compilePages } = require('./lib/pages');
const { bundleJavascript } = require('./lib/bundler');

copyAssets();
compilePages(true);
bundleJavascript(true);
startDevServer();
startRefreshDevServer();
