const fs = require('fs');
const http = require('http');
const url = require('url');
const path = require('path');
const config = require('../../../oem');
const { consoleAction } = require('../util/console');
const root = path.resolve(__dirname, '../../../');

const mimeType = {
  '.css': 'text/css',
  '.html': 'text/html',
  '.ico': 'image/x-icon',
  '.jpg': 'image/jpeg',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.mp3': 'audio/mpeg',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.ttf': 'application/font-sfnt',
  '.wav': 'audio/wav',
};

// Dev Server
const devServer = (app, appFolder, port) => {
  http
    .createServer((req, res) => {
      const parsedUrl = url.parse(req.url);
      const hasExtension = path.extname(parsedUrl.pathname);
      const hasTrailingSlash = parsedUrl.pathname.slice(-1) === '/';
      if (!hasExtension && !hasTrailingSlash) {
        res.writeHead(301, { Location: parsedUrl.pathname + '/' });
        res.end();
        return;
      }
      const rawpath = parsedUrl.pathname === '/' ? '/index.html' : parsedUrl.pathname;
      const sanitizePath = path.normalize(rawpath).replace(/^(\.\.[\/\\])+/, '');
      const filepath =
        path.extname(sanitizePath) === '' ? sanitizePath + 'index.html' : sanitizePath;
      let pathname = path.join(appFolder, filepath);

      // handle missing path
      if (!fs.existsSync(pathname)) {
        console.error('not found:', parsedUrl.pathname);
        res.statusCode = 404;
        res.end(`File ${pathname} not found!`);

        // serve files
      } else {
        consoleAction('Served', `http://localhost:${port}/${app}${parsedUrl.pathname}`);
        fs.readFile(pathname, function (err, data) {
          if (err) {
            res.statusCode = 500;
            res.end(`Error in getting the file.`);
          } else {
            const ext = path.parse(pathname).ext;
            res.setHeader('Content-type', mimeType[ext] || 'text/plain');
            res.end(data);
          }
        });
      }
    })
    .listen(port);

  consoleAction('Serving', `${app} listening at http://localhost:${port}`);
};

const startDevServer = () => {
  Object.entries(config.devServers).forEach(([folder, port]) =>
    devServer(folder, `${root}/${folder}`, port),
  );
};

module.exports = {
  startDevServer,
};
