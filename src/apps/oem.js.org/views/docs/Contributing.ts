import { Template } from '@core/framework/template'
import { Documentation } from '../common/Documentation'
import { Section } from '../common/Section'

export function ContributingView() {
  return Documentation({
    content: Template.Fragment(
      Section({
        title: `Contributing`,
        subtitle: 'Go to our [github](https://github.com/linttrapmedia/oem) and do a PR!',
      }),
    ),
  })
}
