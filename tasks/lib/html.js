const { consoleAction } = require('./util/console')
const { refreshServerSnippet } = require('./servers/refresh')
const config = require('../../config')
const fs = require('fs')
const path = require('path')
const root = path.resolve(__dirname, '../../')
const refreshServer = require('./servers/refresh')
const http = require('http')

const compileTemplate = function (str, params) {
  const defaultParams = [...str.matchAll(/\$\{this\.(.*)\}/g)].reduce(
    (acc, curr) => ({ ...acc, [curr[1]]: '' }),
    {},
  )
  const f = new Function(`return \`${str}\`;`).call({ ...defaultParams, ...params })
  return f
}

const compileHtml = (isDev = false, html = config.html) => {
  Object.entries(html).forEach(([dist, page]) => {
    // template file
    const templateFile = `${root}/${page.template}`
    const templateFileExists = fs.existsSync(templateFile)
    if (!templateFileExists) return
    const templateString = fs.readFileSync(templateFile, 'utf-8')

    // create output directory
    const outFile = `${root}/${dist}`
    const outDir = path.dirname(outFile)
    const outdirExists = fs.existsSync(outDir)
    if (!outdirExists) fs.mkdirSync(outDir, { recursive: true })

    // write
    fs.writeFileSync(
      outFile,
      compileTemplate(templateString, {
        ...page,
        refreshServer: isDev ? refreshServerSnippet : '',
      }).replace(/>\s+</g, '><'),
    )

    consoleAction('Compiled', `${page.template} => ${dist}`)
  })

  if (isDev) watch()
}

// keep track of files being processed
const templatesToBeProcessed = Object.entries(config.html).reduce((acc, [key, val]) => {
  if (!acc[val.template]) acc[val.template] = {}
  acc[val.template][key] = val
  return acc
}, {})

const templatesBeingProcessed = {}

const watch = () => {
  Object.keys(templatesToBeProcessed).forEach(template => {
    consoleAction('Watching', `${root}/${template}`)
    fs.watch(`${root}/${template}`, event => {
      if (event === 'change' && !templatesBeingProcessed[template]) {
        templatesBeingProcessed[template] = true
        setTimeout(() => (templatesBeingProcessed[template] = false), 1000)
        compileHtml(true, templatesToBeProcessed[template])
        http.get(`http://localhost:${refreshServer.port}/refresh`)
      }
    })
  })
}

module.exports = {
  compileHtml,
}
