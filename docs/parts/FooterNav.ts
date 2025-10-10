import { div, menuState, MenuStateTypes } from '../config';

export const FooterNav = ({
  next,
  prev,
}: {
  next?: { title: string; menuState: MenuStateTypes };
  prev?: { title: string; menuState: MenuStateTypes };
}) =>
  div(
    ['style', 'display', 'flex'],
    ['style', 'justifyContent', 'space-between'],
    ['style', 'alignItems', 'center'],
    ['style', 'width', '100%'],
    ['style', 'boxSizing', 'border-box'],
    ['style', 'padding', '20px 0'],
    ['style', 'fontFamily', 'monospace'],
    ['style', 'fontSize', '14px'],
    ['style', 'flexDirection', 'column'],
    ['style', 'backgroundColor', 'black'],
    ['style', 'color', 'white'],
    ['style', 'borderRadius', '5px'],
  )(
    prev && div(['style', 'cursor', 'pointer'], ['click', () => menuState.set(prev.menuState)])(`← ${prev.title}`),
    next && div(['style', 'cursor', 'pointer'], ['click', () => menuState.set(next.menuState)])(`${next.title} →`),
  );
