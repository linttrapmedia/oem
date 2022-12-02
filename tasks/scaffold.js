const {
  consoleSection,
  consoleAction,
  consoleFailure,
  consoleSuccess,
  consoleBreak,
} = require('./lib/util/console')
const { copyRecursiveSync } = require('./lib/util/fs')
const [, , scaffoldFolder, templateFolder = '/spa'] = process.argv
const template = './src/core/templates' + templateFolder

if (!scaffoldFolder) {
  consoleFailure('Error', 'Where am I scaffolding to?\n')
  process.exit(1)
}

consoleSection('Scaffolding')
consoleAction('Copying', template, '=>', scaffoldFolder)

try {
  copyRecursiveSync(template, scaffoldFolder)
  consoleSuccess(
    'Success',
    scaffoldFolder,
    'has been scaffolded. Now, be sure to setup the project in the config.js config file.',
  )
  consoleBreak()
} catch (err) {
  consoleFailure('Error', err.message)
}
