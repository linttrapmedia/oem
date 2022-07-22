const oem = require('../../oem');
const fs = require('fs');
const { dirname } = require('path');
const { refreshServerSnippet } = require('./refresh-server');

const template = function (str, params) {
  const f = new Function(`return \`${str}\`;`).call(params);
  return f;
};

const compilePages = (isDev = false) => {
  // Create html pages
  Object.entries(oem.pages).forEach(([k, config]) => {
    // get template file
    const templateFile = `${__dirname}/../../${config.template}`;
    const templateFileExists = fs.existsSync(templateFile);
    if (!templateFileExists) return;
    const templateString = fs.readFileSync(templateFile, 'utf-8');

    // create output directory
    const outdir = dirname(`${__dirname}/../../${oem.distFolder}${k}`);
    const outdirExists = fs.existsSync(outdir);
    if (!outdirExists) fs.mkdirSync(outdir, { recursive: true });

    // transform params
    const noop = (_, v) => v;
    const transform = config.transform ?? noop;
    const params = Object.entries(config).reduce((acc, [k, v]) => {
      acc[k] = transform(k, v);
      return acc;
    }, {});

    // write
    fs.writeFileSync(
      `${oem.distFolder}${k}`,
      template(templateString, { ...params, refreshServer: isDev ? refreshServerSnippet : '' }).replace(/>\s+</g, '><'),
    );
  });
};

module.exports = {
  compilePages,
};
