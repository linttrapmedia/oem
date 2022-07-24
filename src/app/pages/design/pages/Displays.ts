import { Template } from '@core/framework/Template';
import { Trait } from '@core/framework/Trait';
import { Theme } from '@core/modules/Theme';
import { Table } from 'src/app/components/Display/Table';
import { Section } from '../components/Section';

const html = Template.Html({
  style: Trait.Style,
});

export const Displays = () =>
  html('div', ['style', 'padding', '30px'])(
    html('div', ['style', 'color', Theme.Color('white')], ['style', 'fontSize', '24px'])('Displays'),
    html('div', ['style', 'marginTop', '30px'])(
      Section({
        title: 'Table',
        subtitle: 'A Basic HTML Table',
        content: Table.Data(
          Table.Head(Table.Row(Table.Header('Header'))),
          Table.Body(Table.Row(Table.Cell('Cell 1'))),
          Table.Body(Table.Row(Table.Cell('Cell 2'))),
        ),
      }),
    ),
  );
