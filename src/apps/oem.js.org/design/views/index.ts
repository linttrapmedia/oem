import { Documentation } from '@apps/oem.js.org/docs/views/common/Documentation';
import { Section } from '@apps/oem.js.org/docs/views/common/Section';
import { ROUTES, tags } from '../../config';

import { Buttons } from './buttons';
import { Colors } from './colors';
const { div, a } = tags;

export function DesignSystemPage() {
  return Documentation({
    prev: ['State', ROUTES.STATE_MANAGEMENT],
    next: ['Config', ROUTES.CONFIG],
    content: div(['flex', 'column', 40])(
      Section({
        title: `Design System`,
        subtitle: `The OEM "Design System" makes no attempt at trying to be cool. Instead it is a mix of core functions, components, snippets, principles and design philosophy meant to strike the balance of managing overall complexity without getting in the way of design expression and product development.`,
      }),
      Section({
        title: 'Quicklinks',
        content: div(['flex', 'row', 20])(
          a(['attr', 'href', '#Colors'])('Colors'),
          a(['attr', 'href', '#Buttons'])('Buttons'),
        ),
      }),
      Section({
        title: 'Colors',
        content: Colors,
      }),
      Section({
        title: 'Buttons',
        content: Buttons,
      }),
    ),
  });
}
