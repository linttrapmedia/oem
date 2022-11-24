module.exports = {
  asset: {
    'dist/oem.js.org/assets': 'src/apps/oem.js.org/assets',
  },
  typescript: {
    'dist/oem.js.org/main-1.0.0.js': 'src/apps/oem.js.org/main.ts',
    'dist/poc/main.js': 'src/apps/poc/main.ts',
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
      bundle: 'main.js',
    },
  },
  devServers: {
    'dist/oem.js.org': 3005,
    'dist/poc': 3006,
  },
};
