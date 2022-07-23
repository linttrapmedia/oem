import { Template } from '@core/framework/Template';
import { Trait } from '@core/framework/Trait';
import { FooterNav } from '../../components/FooterNav';
import { Section } from '../../components/Section';

export const Contributing = () => {
  const html = Template.Html({
    attr: Trait.Attr,
    style: Trait.Style,
  });
  return html('div')(
    Section({
      title: `Contributing`,
      subtitle: 'Go to our [github](https://github.com/linttrapmedia/oem) and do a PR!',
    }),
    FooterNav({
      prev: 'faqs',
      prevText: 'FAQs',
    }),
  );
};
