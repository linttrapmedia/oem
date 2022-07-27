import { Template } from '@core/framework/Template';
import { Trait } from '@core/framework/Trait';
import { Theme } from '@core/modules/Theme';

// templating

const html = Template.Html({
  style: Trait.Style,
});

const table = html('table', ['style', 'width', '100%'], ['style', 'borderCollapse', 'collapse']);
const thead = html('thead');
const tbody = html('tbody');
const tfoot = html('tfoot');

const td = html(
  'td',
  ['style', 'textAlign', 'left'],
  ['style', 'padding', '10px'],
  ['style', 'fontSize', '12px'],
  ['style', 'color', Theme.Color('white')],
  ['style', 'borderBottom', `1px solid ${Theme.Color('white', 0, 0.1)}`],
);

const th = html(
  'th',
  ['style', 'textAlign', 'left'],
  ['style', 'backgroundColor', Theme.Color('white', 0, 0.1)],
  ['style', 'padding', '10px'],
  ['style', 'fontSize', '12px'],
  ['style', 'color', Theme.Color('white')],
);
const tr = html('tr');

// interface

type TableRecord = { id: string | number };

type TableColumn<K> = {
  column?: K;
  header: string;
  footer?: string;
  width?: number | 'auto';
  sortable?: boolean;
  filter?: boolean;
  hidden?: boolean;
  transform?: (v: any) => Types.HtmlChild;
};

type TableProps<R extends TableRecord> = {
  columns: TableColumn<keyof R>[];
  records: R[];
  paginate?: number;
  selectable?: boolean;
  exportCSV?: boolean;
  header?: HTMLElement;
  footer?: HTMLElement;
};

// presentation

export const Table = <Record extends TableRecord>({ columns, records, footer }: TableProps<Record>) => {
  return table(
    thead(tr(...columns.map((c) => th(c.header)))),
    tbody(
      ...records.map((record) =>
        tr(
          ...columns.map(({ column, transform }) =>
            td(transform ? transform(record) : column ? (record[column] as unknown as string) : null),
          ),
        ),
      ),
    ),
  );
};
