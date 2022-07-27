import { Template } from '@core/framework/Template';
import { Trait } from '@core/framework/Trait';
import { Theme } from '@core/modules/Theme';
import { Table } from 'src/app/components/Display/Table';
import { DocComponent } from '../components/DocComponent';

const html = Template.Html({
  style: Trait.Style,
});

type TableExampleRecord = {
  id: string;
  firstName: string;
  lastName: string;
};

const tableExample = Table<TableExampleRecord>({
  columns: [
    { column: 'id', header: 'ID' },
    { column: 'firstName', header: 'First Name' },
    { column: 'lastName', header: 'Last Name' },
    {
      header: 'Full Name',
      transform: (record: TableExampleRecord) => record.firstName + ' ' + record.lastName,
    },
    {
      header: 'Custom',
      transform: () =>
        html(
          'button',
          ['style', 'backgroundColor', Theme.Color('transparent')],
          ['style', 'border', 'none'],
          ['style', 'color', Theme.Color('white')],
          ['style', 'border', `1px solid ${Theme.Color('white', 0, 0.2)}`],
          ['style', 'fontSize', '11px'],
          ['style', 'padding', '5px 10px'],
        )('Edit'),
    },
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
