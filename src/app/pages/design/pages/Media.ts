import { Template } from '@core/framework/Template';
import { Trait } from '@core/framework/Trait';
import { Theme } from '@core/modules/Theme';

const html = Template.Html({
  style: Trait.Style,
});

export const Media = () =>
  html('div', ['style', 'padding', '30px'])(
    html('div', ['style', 'color', Theme.Color('white')], ['style', 'fontSize', '24px'])('Media'),
    html('div', ['style', 'marginTop', '30px'])('Content'),
  );
