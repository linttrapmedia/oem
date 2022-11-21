import { ROUTES, tags } from '@apps/oem.js.org/config';
import { CounterExample } from './common/CounterExample';
import { Documentation } from './common/Documentation';
import { Section } from './common/Section';
import { Snippet } from './common/Snippet';

const { div } = tags;

export function QuickstartPage() {
  return Documentation({
    next: ['Html', ROUTES.HTML],
    prev: ['Home', '/'],
    content: div(['flex', 'column', 40])(
      Section({
        title: 'Quickstart',
        subtitle: 'Think React + Redux + Tailwind + Material UI Together In A Single Syntax',
        content:
          'OEM is a dependency-free UI/UX framework and monorepo/micro-frontend platform. It uses a unique declarative syntax to control style and behavior inline which is expressive and easy to read at scale. The core framework is only a handful of modules that are easy to grok while the _extended_ framework includes a library of take-it-or-leave it features including a full blown design system. The overall architecture includes a set of highly configurable dev tasks which allows you to manage multiple apps as a monorepo and/or microfrontend.',
      }),
      Section({
        title: 'Setup',
        subtitle: 'Clone, Install, Start',
        content: Snippet(`npm i\nnpm start`, 'bash'),
      }),
      Section({
        title: 'A Quick Example',
        subtitle: 'A simple counter (State, Html, Styling and Logic in ~15 LOC!!!)',
      }),
      Section({
        content: CounterExample(),
      }),
      Section({
        content: Snippet(`function CounterExample() {
  const count = State.Number(0);

  const { div, button } = Template.Html({
    on_count: Trait.State(count, Trait.InnerText),
  });

  return div(['flex', 'row', 30])(
    button(['on_click', count.bind('subtract', 1)])('-'),
    div(['on_count', count.get])(count.get()),
    button(['on_click', count.bind('add', 1)])('+'),
  );
}
`),
      }),
    ),
  });
}
