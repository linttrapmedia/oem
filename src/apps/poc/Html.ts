import { State } from './Types';

export function HtmlState(html: () => HTMLElement, ...atoms: State<any>[]) {
  const _html = html();
  atoms.forEach((atom) => atom.sub(() => _html.replaceChild(html(), _html.childNodes[0])));
  return _html;
}

export const useHtml = HtmlState;
