import { Template } from '@core/framework/Template';
import { Trait } from '@core/framework/Trait';
import { FooterNav } from '../../components/FooterNav';
import { Section } from '../../components/Section';

export const Workflow = () => {
  const html = Template.Html({
    attr: Trait.Attr,
    style: Trait.Style,
  });
  return html('div')(
    Section({
      title: `Workflow`,
      subtitle: 'Running the dev server, configuring your app and deployment',
    }),
    Section({
      title: 'Dev Server',
      subtitle: '`npm run dev`',
      description:
        'There are two dev servers, one for your app and one for the refresh server. An `EventSource` snippet is injected into the template in dev mode and on file change, `esbuild` hits the refresh server which results in a `window.location.reload` being called.',
    }),
    Section({
      title: 'Config',
      subtitle: 'An all-in-one SPA, MPA, Library, Static Site Generator platform',
      description: 'See the `./oem.js` file for details',
      content: Template.Fragment(
        html('p')(
          'OEM can be configured to operate as a SPA (Single Page Application), a MPA (Multi-Page Application), a Library, a static site generator and any combination thereof. The basic concept is there is a config file which allows you to specify what javascript and html page to compile. ',
        ),
        html('p')(
          'The `pages` object provides a user-defined object literal which specifies a template to be precompiled like that of a static site generator. All key/value pairs in the page entry is injected and available in the template with each key/val pair being run through an optional `transform` function useful for customizing your html build script. ',
        ),
      ),
    }),
    Section({
      title: `Testing`,
      subtitle: 'Coming soon',
    }),
    Section({
      title: `Deploying`,
      subtitle: `A bunch of folders and files.`,
      content:
        "To keep things simple each folder in the distribution folder is considered an 'app'. Each can be deployed separately or together.",
    }),
    FooterNav({
      prev: 'designSystem',
      prevText: 'Design System',
      next: 'faqs',
      nextText: 'FAQs',
    }),
  );
};
