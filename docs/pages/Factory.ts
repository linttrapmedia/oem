import { FooterNav } from '../parts/FooterNav';
import { Page } from '../parts/Page';
import { Section } from '../parts/Section';

export const Factory = () =>
  Page(
    Page.Header('Factory', 'Pre-built components,  templates and generators for rapid development'),

    Section({
      title: 'Thank You',
      subtitle: `We appreciate your interest in OEM. We hope you find this project useful. Feel free to contribute or provide feedback!`,
      content: FooterNav({
        next: { title: 'Intro', menuState: 'introduction' },
        prev: { title: 'Patterns', menuState: 'patterns' },
      }),
    }),
  );
