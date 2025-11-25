import { tag, trait } from 'docs/config';

type Content = HTMLElement | string | number;

export const Table = (...content: Content[]) =>
  tag.table(trait.style('width', '100%'), trait.style('borderCollapse', 'collapse'), ...content);

Table.Header = (...content: Content[]) => tag.thead(trait.style('textAlign', 'left'), ...content);

Table.Body = (...content: Content[]) => tag.tbody(...content);

Table.Row = (...content: Content[]) =>
  tag.tr(trait.style('borderBottom', '1px solid rgba(0, 0, 0, 0.3)'), ...content);

Table.HeaderCell = (...content: Content[]) =>
  tag.th(
    trait.style('padding', '10px'),
    trait.style('fontWeight', '600'),
    trait.style('borderBottom', '2px solid black'),
    ...content,
  );

Table.Cell = (...content: Content[]) => tag.td(trait.style('padding', '10px'), ...content);
