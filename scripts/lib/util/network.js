const { networkInterfaces } = require('os')
const { consoleAction } = require('./console')

const getNetworkInterfaces = () => {
  return Object.entries(networkInterfaces()).reduce((acc, [key, interfaces]) => {
    const v4Interfaces = interfaces
      .filter(interface => interface.family === 'IPv4' || interface.family === 4)
      .flat()
    if (v4Interfaces[0]?.address) acc[key] = v4Interfaces[0].address
    return acc
  }, {})
}

const printNetworkInterfaces = () => {
  Object.entries(getNetworkInterfaces()).forEach(([k, v]) => consoleAction(k, v))
}

module.exports = {
  getNetworkInterfaces,
  printNetworkInterfaces,
}
