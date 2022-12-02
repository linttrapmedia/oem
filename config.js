module.exports = {
  asset: {
    'dist/oem.js.org/assets': 'src/apps/oem.js.org/assets',
  },
  typescript: {
    'dist/oem.js.org/main-1.0.0.js': 'src/apps/oem.js.org/main.ts',
    'dist/oem/main-1.0.0.js': 'src/apps/oem/main.ts',
  },
  html: {
    'dist/oem.js.org/index.html': {
      template: 'src/apps/oem.js.org/main.html',
      title: 'OEM | The Dependency-Free UI Framework',
      bundle: 'main-1.0.0.js',
    },
    'dist/oem/index.html': {
      template: 'src/core/templates/html/main.html',
      title: 'OEM | The Dependency-Free UI Framework',
      bundle: 'main-1.0.0.js',
    },
  },
  devServers: {
    'dist/oem.js.org': 3005,
    'dist/oem': 3006,
  },
};
