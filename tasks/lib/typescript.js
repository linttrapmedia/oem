const config = require('../../config')
const esbuild = require('esbuild')
const path = require('path')
const { consoleAction } = require('./util/console')
const root = path.resolve(__dirname, '../../')
const refreshServer = require('./servers/refresh')
const http = require('http')

const compileTypescript = (isDev = false, typescript = config.typescript) => {
  Object.entries(typescript).forEach(([dest, src]) => {
    esbuild
      .build({
        entryPoints: [`${root}/${src}`],
        bundle: true,
        outfile: `${root}/${dest}`,
        minifyWhitespace: !isDev,
        minify: !isDev,
        watch: isDev
          ? {
              onRebuild: () => {
                consoleAction('Bundled', `${src} => ${dest}`)
                http.get(`http://localhost:${refreshServer.port}/refresh`)
              },
            }
          : false,
        sourcemap: true,
      })
      .catch(() => process.exit(1))
    consoleAction('Bundled', `${src} => ${dest}`)
  })
  if (isDev) consoleAction('Watching', 'src/**/*.ts')
}

module.exports = {
  compileTypescript,
}
