// used for cache busting
const version = '1.0.0';

const config = {
  version,
  // distribution folder
  distFolder: 'public',
  // code source folder
  srcFolder: 'src',
  // asset folder
  assetsFolder: 'src/app/assets',
  // development server port
  devPort: 8000,
  // development server refresh port
  devRefreshPort: 8001,

  /**
   * @key {string}  typescript file to compile & bundle
   * @val {string}  the compiled/bundled javascript file
   */
  javascript: {
    'src/app/pages/main.ts': 'public/main.js',
    'src/app/pages/docs/main.ts': 'public/docs/main.js',
    'src/app/pages/design-system/main.ts': 'public/design-system/main.js',
  },

  /**
   * @namespace
   * @property {object} pages - pages to compile [key is used as file to be compiled]
   * @property {number} pages.template - template to be used
   * @property {function} [pages.transform] - optional function every key/val is run through prior to injection into template. Example usage would be a key that lists a markdown file. The transform function could then load and transform that markdown file and return it's contents which will be used to be injected in the template
   * @property {string} pages.[key] - user defined key/val pairs to be injected into template made available on the `this` scope being used like this `${this.[key]}`.
   */
  pages: {
    '/index.html': {
      template: 'src/app/templates/main.html',
      script: `<script src="main-${version}.js"></script>`,
      title: 'Home',
    },
    '/docs/index.html': {
      template: 'src/app/templates/main.html',
      script: `<script src="main-${version}.js"></script>`,
      title: 'Docs',
    },
    '/design-system/index.html': {
      template: 'src/app/templates/main.html',
      script: `<script src="main-${version}.js"></script>`,
      title: 'Design System',
    },
  },
};

module.exports = config;
