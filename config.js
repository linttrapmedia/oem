module.exports = {
  asset: {
    'dist/oem.js.org/assets': 'src/apps/oem.js.org/assets',
  },
  typescript: {
    'dist/oem.js.org/main-1.0.0.js': 'src/apps/oem.js.org/main.ts',
    'dist/poc/1.js': 'src/apps/poc/1.ts',
  },
  html: {
    'dist/oem.js.org/index.html': {
      template: 'src/apps/oem.js.org/main.html',
      title: 'OEM | The Dependency-Free UI Framework',
      bundle: 'main-1.0.0.js',
    },
    'dist/poc/index.html': {
      template: 'src/apps/poc/poc.html',
      title: 'OEM | The Dependency-Free UI Framework',
      bundle: '1.js',
    },
  },
  devServers: {
    'dist/oem.js.org': 3005,
    'dist/poc': 3006,
  },
};
