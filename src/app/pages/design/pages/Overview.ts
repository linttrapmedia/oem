import { Template } from '@core/framework/Template';
import { Trait } from '@core/framework/Trait';

export const Overview = () => {
  const html = Template.Html({
    attr: Trait.Attr,
    style: Trait.Style,
  });
  return html('div')('Overview');
};
