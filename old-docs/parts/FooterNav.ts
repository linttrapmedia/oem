import { html, menuState, MenuStateTypes } from '../config';

export const FooterNav = ({
  next,
  prev,
}: {
  next?: { title: string; menuState: MenuStateTypes };
  prev?: { title: string; menuState: MenuStateTypes };
}) =>
  html.div(
    ['style', 'display', 'flex'],
    ['style', 'flexDirection', 'row'],
    ['style', 'justifyContent', 'space-evenly'],
    ['style', 'alignItems', 'center'],
    ['style', 'width', '100%'],
    ['style', 'boxSizing', 'border-box'],
    ['style', 'padding', '20px'],
    ['style', 'fontFamily', 'monospace'],
    ['style', 'fontSize', '14px'],
    ['style', 'backgroundColor', 'black'],
    ['style', 'color', 'white'],
    ['style', 'borderRadius', '5px'],
  )(
    prev &&
      html.div(
        ['style', 'cursor', 'pointer'],
        ['event', 'click', () => menuState.set(prev.menuState)],
      )(`← ${prev.title}`),
    next &&
      html.div(
        ['style', 'cursor', 'pointer'],
        ['event', 'click', () => menuState.set(next.menuState)],
      )(`${next.title} →`),
  );
