const fs = require('fs');
const { copyRecursiveSync } = require('./util');

const config = require('../../oem');

const copyAssets = () => {
  const assetFolderExists = fs.existsSync(`${config.distFolder}/assets/`);
  if (assetFolderExists) fs.rmSync(`${config.distFolder}/assets/`, { recursive: true });
  copyRecursiveSync(`${__dirname}/../../${config.assetsFolder}`, `${config.distFolder}/assets/`);
};

module.exports = {
  copyAssets,
};
