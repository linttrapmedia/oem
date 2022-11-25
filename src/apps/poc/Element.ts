import { TraitRegistry } from './Traits';

const StringNode = (text: string) => {
  const el = document.createElement('template');
  const htmlAmp = /&/g;
  const htmlLT = /</g;
  const htmlGT = /</g;
  const htmlQuote = /"/g;
  const htmlSingleQuote = /'/g;
  const cleanedText = text
    .replace(htmlAmp, '&amp;')
    .replace(htmlLT, '&lt;')
    .replace(htmlGT, '&gt;')
    .replace(htmlQuote, '&quot;')
    .replace(htmlSingleQuote, '&#039;');
  el.innerHTML = cleanedText;
  return el.content;
};

const NumberNode = (num: number) => {
  const textNode = document.createTextNode(String(num));
  return textNode;
};

const FunctionNode = (el: HTMLElement, fn: () => Node) => {
  // const run = () => el.appendChild(fn());
  // if (fn?.prototype?.atom) fn.prototype.sub(run);
  // run();
  console.log(fn());
};

export const CreateElement =
  (tag: string) =>
  (...traits: any[]) =>
  (...nodes: any[]) => {
    const el = document.createElement(tag);
    traits.forEach(([trait, ...args]: [keyof typeof TraitRegistry, any]) => TraitRegistry[trait](el)(...args));
    nodes.forEach((child: any) => {
      if (child instanceof Node) el.appendChild(child);
      if (typeof child === 'string') el.appendChild(StringNode(child));
      if (typeof child === 'number') el.appendChild(NumberNode(child));
      if (typeof child === 'function') {
        const run = () => {
          const node = child();
          el.innerHTML = '';
          if (node instanceof Node) el.appendChild(node);
          if (typeof node === 'string') el.appendChild(StringNode(node));
          if (typeof node === 'number') el.appendChild(NumberNode(node));
        };
        if (child?.prototype?.atom) child.prototype.sub(run);
        run();
      }
    });
    return el;
  };

export const useElement = () => ({
  a: CreateElement('a'),
  abbr: CreateElement('abbr'),
  address: CreateElement('address'),
  area: CreateElement('area'),
  article: CreateElement('article'),
  aside: CreateElement('aside'),
  audio: CreateElement('audio'),
  b: CreateElement('b'),
  base: CreateElement('base'),
  bdi: CreateElement('bdi'),
  bdo: CreateElement('bdo'),
  blockquote: CreateElement('blockquote'),
  body: CreateElement('body'),
  br: CreateElement('br'),
  button: CreateElement('button'),
  canvas: CreateElement('canvas'),
  caption: CreateElement('caption'),
  cite: CreateElement('cite'),
  code: CreateElement('code'),
  col: CreateElement('col'),
  colgroup: CreateElement('colgroup'),
  data: CreateElement('data'),
  datalist: CreateElement('datalist'),
  dd: CreateElement('dd'),
  del: CreateElement('del'),
  details: CreateElement('details'),
  dfn: CreateElement('dfn'),
  dialog: CreateElement('dialog'),
  div: CreateElement('div'),
  dl: CreateElement('dl'),
  dt: CreateElement('dt'),
  em: CreateElement('em'),
  embed: CreateElement('embed'),
  fieldset: CreateElement('fieldset'),
  figcaption: CreateElement('figcaption'),
  figure: CreateElement('figure'),
  footer: CreateElement('footer'),
  form: CreateElement('form'),
  h1: CreateElement('h1'),
  h2: CreateElement('h2'),
  h3: CreateElement('h3'),
  h4: CreateElement('h4'),
  h5: CreateElement('h5'),
  h6: CreateElement('h6'),
  head: CreateElement('head'),
  header: CreateElement('header'),
  hgroup: CreateElement('hgroup'),
  hr: CreateElement('hr'),
  html: CreateElement('html'),
  i: CreateElement('i'),
  iframe: CreateElement('iframe'),
  img: CreateElement('img'),
  input: CreateElement('input'),
  ins: CreateElement('ins'),
  kbd: CreateElement('kbd'),
  label: CreateElement('label'),
  legend: CreateElement('legend'),
  li: CreateElement('li'),
  link: CreateElement('link'),
  main: CreateElement('main'),
  map: CreateElement('map'),
  mark: CreateElement('mark'),
  menu: CreateElement('menu'),
  meta: CreateElement('meta'),
  meter: CreateElement('meter'),
  nav: CreateElement('nav'),
  noscript: CreateElement('noscript'),
  object: CreateElement('object'),
  ol: CreateElement('ol'),
  optgroup: CreateElement('optgroup'),
  option: CreateElement('option'),
  output: CreateElement('output'),
  p: CreateElement('p'),
  picture: CreateElement('picture'),
  pre: CreateElement('pre'),
  progress: CreateElement('progress'),
  q: CreateElement('q'),
  rp: CreateElement('rp'),
  rt: CreateElement('rt'),
  ruby: CreateElement('ruby'),
  s: CreateElement('s'),
  samp: CreateElement('samp'),
  script: CreateElement('script'),
  section: CreateElement('section'),
  select: CreateElement('select'),
  slot: CreateElement('slot'),
  small: CreateElement('small'),
  source: CreateElement('source'),
  span: CreateElement('span'),
  strong: CreateElement('strong'),
  style: CreateElement('style'),
  sub: CreateElement('sub'),
  summary: CreateElement('summary'),
  sup: CreateElement('sup'),
  table: CreateElement('table'),
  tbody: CreateElement('tbody'),
  td: CreateElement('td'),
  template: CreateElement('template'),
  textarea: CreateElement('textarea'),
  tfoot: CreateElement('tfoot'),
  th: CreateElement('th'),
  thead: CreateElement('thead'),
  time: CreateElement('time'),
  title: CreateElement('title'),
  tr: CreateElement('tr'),
  track: CreateElement('track'),
  u: CreateElement('u'),
  ul: CreateElement('ul'),
  video: CreateElement('video'),
  wbr: CreateElement('wbr'),
});
