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
        content: Table<{
          id: string;
          firstName: string;
          lastName: string;
        }>({
          columns: [
            { key: 'id', header: 'ID' },
            { key: 'firstName', header: 'First Name', transform: (v) => v.toUpperCase() },
            { key: 'lastName', header: 'Last Name' },
          ],
          records: [
            { firstName: 'oem', lastName: 'ftw', id: '1' },
            { firstName: 'dependencies', lastName: 'suck', id: '2' },
          ],
        }),
      }),
    ),
  );
