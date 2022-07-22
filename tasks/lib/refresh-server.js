const http = require('http');
const config = require('../../oem');

const startRefreshDevServer = () => {
  http
    .createServer(function (req, res) {
      console.log('request', req.url);
      refresh = req.url === '/refresh';
      res.setHeader('Cache-Control', 'no-cache');
      res.setHeader('Content-Type', 'text/event-stream');
      res.setHeader('Connection', 'keep-alive');
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('X-Accel-Buffering', 'no');
      res.flushHeaders();
      setInterval(() => (refresh ? (res.write(`data: ${refresh}\n\n`), res.end('\n\n')) : null), 500);
    })
    .listen(config.devRefreshPort);

  console.log(`♻️ Refresh Server: http://localhost:${config.devRefreshPort}`);
};

const refreshServerSnippet = `<script>
const source = new EventSource("http://localhost:${config.devRefreshPort}");
source.addEventListener('message', () => (source.close(), window.location.reload()));
</script>`;

module.exports = {
  startRefreshDevServer,
  refreshServerSnippet,
};
