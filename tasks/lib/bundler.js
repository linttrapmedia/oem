const esbuild = require('esbuild');
const oem = require('../../oem');
const http = require('http');

const bundleJavascript = (isDev = false) => {
  esbuild
    .build({
      entryPoints: [...Object.entries(oem.javascript).map(([k, v]) => k)],
      entryNames: `[dir]/[name]-${oem.version}`,
      bundle: true,
      outdir: oem.distFolder,
      outbase: `${oem.srcFolder}/app/pages`,
      watch: isDev
        ? {
            onRebuild: () => http.get(`http://localhost:${oem.devRefreshPort}/refresh`),
          }
        : false,
      minifyWhitespace: !isDev,
      minify: !isDev,
      sourcemap: true,
    })
    .catch(() => process.exit(1));
};

module.exports = {
  bundleJavascript,
};
