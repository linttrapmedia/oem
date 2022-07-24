import { Template } from '@core/framework/Template';
import { Trait } from '@core/framework/Trait';

const html = Template.Html({
  style: Trait.Style,
});

const Data = html('table');
const Caption = html('caption');
const Head = html('thead');
const Body = html('tbody');
const Foot = html('tfoot');
const Header = html('th');
const Row = html('tr');
const Cell = html('td');

export const Table = {
  Data,
  Caption,
  Head,
  Body,
  Foot,
  Header,
  Row,
  Cell,
};
