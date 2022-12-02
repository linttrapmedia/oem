const { consoleAction } = require('./util/console')
const { copyRecursiveSync } = require('./util/fs')
const config = require('../../config')
const path = require('path')
const root = path.resolve(__dirname, '../../')

const copyAssets = (asset = config.asset) => {
  return Object.entries(asset).forEach(([dest, src]) => {
    copyRecursiveSync(`${root}/${src}`, `${root}/${dest}`)
    consoleAction('Copied', `${src} => ${dest}`)
  })
}

module.exports = {
  copyAssets,
}
