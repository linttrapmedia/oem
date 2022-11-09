import { ROUTES, tags } from '@apps/oem.js.org/config';
import { Documentation } from './common/Documentation';
import { Section } from './common/Section';
import { Snippet } from './common/Snippet';

const { div } = tags;

export function ConfigPage() {
  return Documentation({
    prev: ['Design System', ROUTES.DESIGN_SYSTEM],
    next: ['Contributing', ROUTES.CONTRIBUTING],
    content: div(['flex', 'column', 40])(
      Section({
        title: 'Config',
        subtitle: `OEM can be configured to operate as a SPA (Single Page Application), a MPA (Multi-Page Application), a Library, a static site generator and any combination thereof. The assets, typescript to be compiled, html and dev servers are all configured separately. This keeps both the config and tasks code clean.`,
        description: 'See the `./oem.js` file for details',
        content: Snippet(`// config.js
        
module.exports = {
  // copy asset folders
  asset: {
    'dist/app-one/assets': 'src/apps/app-one/assets',
    'dist/app-two/assets': 'src/apps/app-two/assets',
    ...
  },
  // specify the typescript files that need to be compiled
  typescript: {
    'dist/app-one/main-1.0.0.js': 'src/apps/app-one/main.ts',
    'dist/app-two/main-1.0.0.js': 'src/apps/app-two/main.ts',
    ...
  },
  // specify the html files that need to be compiled (each variable is available in the template)
  html: {
    'dist/app-one/index.html': {
      template: 'src/apps/app-one/template.html',
      title: 'And the Gospel',
      bundle: 'main-1.0.0.js',
    },
    'dist/app-two/index.html': {
      template: 'src/apps/app-two/template.html',
    },
   ...
  },
  // specify the folder and port for each "app" you want to serve
  devServers: {
    'dist/app-one': 3000,
    'dist/app-two': 3001,
    ...
  },
}

`),
      }),
      Section({
        title: `Testing`,
        subtitle: 'Coming soon',
      }),
      Section({
        title: `Deploying`,
        subtitle: `Since you are specify where you want assets, html and js to be compiled/copied to it's up to you do what you will with the resulting artifacts. If you keep each app in it's own folder this should be as easy as copying its contents over into an S3 bucket.`,
        content: Snippet(`npm run build
npm run deploy // <= That's up to you! S3?`),
      }),
    ),
  });
}
