import { Template } from '@core/framework/Template';
import { Documentation } from './common/Documentation';
import { Section } from './common/Section';

export function ContributingPage() {
  return Documentation({
    content: Template.Fragment(
      Section({
        title: `Contributing`,
        subtitle: 'Go to our [github](https://github.com/linttrapmedia/oem) and do a PR!',
      }),
    ),
  });
}
