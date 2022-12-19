const http = require('http')
const { consoleAction } = require('../util/console')
const port = 8001

const startRefreshDevServer = () => {
  http
    .createServer(function (req, res) {
      consoleAction('Served', `http://localhost:${port}${req.url}`)
      refresh = req.url === '/refresh'
      res.setHeader('Cache-Control', 'no-cache')
      res.setHeader('Content-Type', 'text/event-stream')
      res.setHeader('Connection', 'keep-alive')
      res.setHeader('Access-Control-Allow-Origin', '*')
      res.setHeader('X-Accel-Buffering', 'no')
      res.flushHeaders()
      setInterval(() => (refresh ? (res.write(`data: ${refresh}\n\n`), res.end('\n\n')) : null), 500)
    })
    .listen(port)

  consoleAction('Serving', `http://localhost:${port}`)
}

const refreshServerSnippet = `<script>
const source = new EventSource("http://localhost:${port}");
source.addEventListener('message', () => (source.close(), window.location.reload()));
</script>`

module.exports = {
  startRefreshDevServer,
  refreshServerSnippet,
  port,
}
