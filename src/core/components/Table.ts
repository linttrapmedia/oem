import { Template } from '@core/framework/Template';
import { Theme } from '@core/framework/Theme';

// templating

const { table, thead, tbody, tfoot, tr, th, td } = Template.Html();

const asdf = th(['style', 'color', 'green'])(td());

// interface

type TableRecord = { id: string | number };

type TableColumn<K> = {
  key: K;
  header: string;
  width?: number | 'auto';
  sortable?: boolean;
  filter?: boolean;
  hidden?: boolean;
  transform?: (v: any) => string;
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

export const Table = <Record extends TableRecord>({ columns, records }: TableProps<Record>) => {
  return table(['style', 'width', '100%'], ['style', 'borderCollapse', 'collapse'])(
    thead()(
      tr()(
        ...columns.map((c) =>
          th(
            ['style', 'textAlign', 'left'],
            ['style', 'backgroundColor', Theme().color('white', 0, 0.1)],
            ['style', 'padding', '10px'],
            ['style', 'fontSize', '12px'],
          )(c.header),
        ),
      ),
    ),
    tbody()(
      ...records.map((record) =>
        tr()(
          ...columns.map(({ key, transform = (v) => v }) =>
            td(
              ['style', 'padding', '10px'],
              ['style', 'verticalAlign', 'top'],
              ['style', 'borderBottom', `1px solid ${Theme().color('white', 0, 0.1)}`],
            )(transform(record[key] as unknown as string)),
          ),
        ),
      ),
    ),
  );
};
