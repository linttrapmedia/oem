import { Template } from '@core/framework/Template';
import { Trait } from '@core/framework/Trait';
import { Theme } from '@core/modules/Theme';
import { Table } from 'src/app/components/Display/Table';
import { DocComponent } from '../components/DocComponent';

const html = Template.Html({
  style: Trait.Style,
});

const tableExample = Table<{
  id: string;
  firstName: string;
  lastName: string;
}>({
  columns: [
    { key: 'id', header: 'ID' },
    { key: 'firstName', header: 'First Name' },
    { key: 'lastName', header: 'Last Name' },
    { key: 'fullName', header: 'Full Name', transform: (v) => v.toUpperCase() },
  ],
  records: [
    { firstName: 'oem', lastName: 'ftw', id: '1' },
    { firstName: 'dependencies', lastName: 'suck', id: '2' },
  ],
});

export const Displays = () =>
  html('div', ['style', 'padding', '30px'])(
    html('div', ['style', 'color', Theme.Color('white')], ['style', 'fontSize', '24px'])('Displays'),
    html('div', ['style', 'marginTop', '30px'])(
      DocComponent({
        title: 'Table',
        subtitle: 'A Basic HTML Table',
        usage: tableExample,
        props: [
          {
            name: 'columns',
            description: 'Table title',
            type: 'string',
          },
          {
            name: 'records',
            description: 'Table subtitle',
            type: 'string',
          },
        ],
      }),
    ),
  );
