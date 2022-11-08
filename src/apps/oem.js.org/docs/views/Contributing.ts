import { Template } from '@core/framework/Template';
import { Documentation } from '../views/common/Documentation';
import { Section } from '../views/common/Section';

export function ContributingView() {
  return Documentation({
    content: Template.Fragment(
      Section({
        title: `Contributing`,
        subtitle: 'Go to our [github](https://github.com/linttrapmedia/oem) and do a PR!',
      }),
    ),
  });
}
