import { Template } from '@core/framework/Template';
import { Trait } from '@core/framework/Trait';
import { Theme } from '@core/modules/Theme';

const svg = Template.Svg({
  attr: Trait.SvgAttr,
  style: Trait.Style,
});

const Logo = (width: number = 86, height: number = 40, bg: string = Theme.Color('black')) =>
  svg(
    'svg',
    ['attr', 'width', width],
    ['attr', 'height', height],
    ['attr', 'viewBox', `0 0 86 40`],
    ['attr', 'fill', bg],
  )(
    svg('path', [
      'attr',
      'd',
      'M29.76,19.97c0,6.27-5.08,11.35-11.35,11.35s-11.35-5.08-11.35-11.35,5.08-11.35,11.35-11.35,11.35,5.08,11.35,11.35Zm21.08-11.35H28.14l12,11.35-12,11.35h22.7V8.62Zm27.34,22.7V8.62l-11.35,12-11.35-12V31.32h22.7ZM85.7,0H0V39.44H85.7V0ZM3.63,3.63H82.06V35.81H3.63V3.63Z',
    ])(),
  );

const LogoColor = (width: number = 86, height: number = 40) =>
  svg('svg', ['attr', 'width', width], ['attr', 'height', height], ['attr', 'viewBox', `0 0 95 50`])(
    svg(
      'rect',
      ['attr', 'x', 4.65],
      ['attr', 'y', 5.47],
      ['attr', 'width', 85.7],
      ['attr', 'height', 39.44],
      ['style', 'fill', Theme.Color('black', 20, 0.8)],
    )(),
    svg(
      'rect',
      ['attr', 'x', 8.28],
      ['attr', 'y', 9.1],
      ['attr', 'width', 78.43],
      ['attr', 'height', 32.18],
      ['style', 'fill', Theme.Color('white', 30, 0.9)],
    )(),
    svg(
      'circle',
      ['attr', 'cx', 23.07],
      ['attr', 'cy', 25.44],
      ['attr', 'r', 11.35],
      ['style', 'fill', Theme.Color('blue')],
    )(),
    svg(
      'polygon',
      ['attr', 'points', '55.49 14.09 32.8 14.09 44.8 25.44 32.8 36.79 55.49 36.79 55.49 14.09'],
      ['style', 'fill', Theme.Color('red')],
    )(),
    svg(
      'polygon',
      ['attr', 'points', '82.83 36.79 82.83 14.09 71.48 26.09 60.13 14.09 60.13 36.79 82.83 36.79'],
      ['style', 'fill', Theme.Color('red')],
    )(),
  );

const Icons = {
  logo: Logo,
  logoColor: LogoColor,
};

export const icon = <T extends keyof typeof Icons>(type: T) => {
  return Icons[type];
};
