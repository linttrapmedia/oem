import { Template } from '@core/framework/Template';
import { Trait } from '@core/framework/Trait';
import { FooterNav } from '../../components/FooterNav';
import { Section } from '../../components/Section';
import { SubSection } from '../../components/SubSection';

export const FAQS = () => {
  const html = Template.Html({
    attr: Trait.Attr,
    style: Trait.Style,
  });
  return html('div')(
    Section({
      title: `FAQs`,
      content: Template.Fragment(
        SubSection({
          title: 'What is OEM?',
          subtitle:
            'A web application UI framework, Design System and Starter Kit combined and configured in a way to make product development fast and efficient.',
        }),
        SubSection({
          title: 'When should I use OEM?',
          subtitle: `Whenever. Since OEM is meant to be "adopted" and maintained by you. Therefore — since it's your code — the answer is "whenever you code"!`,
        }),
        SubSection({
          title: 'Why use OEM?',
          subtitle: `Zero dependencies. Zero tech debt. Designer and product friendly. Built for true SDLC and product work. `,
        }),
        SubSection({
          title: 'How do I start using OEM?',
          subtitle: '[Start by going to the home page](/)',
        }),
      ),
    }),
    FooterNav({
      prev: 'workflow',
      prevText: 'Workflow',
      next: 'contributing',
      nextText: 'Contributing',
    }),
  );
};
