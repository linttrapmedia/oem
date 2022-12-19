const { FgBlue, Reset, FgGreen, FgRed, FgYellow } = require('./colors')

/** Pretty format section */
const consoleSection = (title, callback = null) => {
  console.log(FgBlue, '===', title, '===', Reset, '\n')
  if (callback) callback()
  console.log()
}

const consoleAction = (key, ...value) => {
  console.log(FgBlue, key + ':', Reset, ...value)
}

const consoleSuccess = (key, ...value) => {
  console.log(FgGreen, key + ':', Reset, ...value)
}

const consoleFailure = (key, ...value) => {
  console.log(FgRed, key + ':', Reset, ...value)
}

const consoleWarning = (key, ...value) => {
  console.log(FgYellow, key + ':', Reset, ...value)
}

const consoleBreak = console.log

module.exports = {
  consoleSection,
  consoleAction,
  consoleSuccess,
  consoleFailure,
  consoleWarning,
  consoleBreak,
}
