const { copyAssets } = require('./lib/assets')
const { compileTypescript } = require('./lib/typescript')
const { compileHtml } = require('./lib/html')
const { consoleSection } = require('./lib/util/console')

consoleSection('ASSETS', copyAssets)
consoleSection('HTML', compileHtml)
consoleSection('TYPESCRIPT', compileTypescript)
