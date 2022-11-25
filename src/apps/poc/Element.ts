import { TraitRegistry } from './Traits';

const StripTags = (text: string) => {
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

export const CreateElement =
  (tag: string) =>
  (...traits: any[]) =>
  (...nodes: any[]) => {
    const el = document.createElement(tag);
    traits.forEach(([trait, ...args]: [keyof typeof TraitRegistry, any]) => {
      TraitRegistry[trait](el)(...args);
    });
    nodes.forEach((child: any) => {
      if (child instanceof Node) el.appendChild(child);
      if (typeof child === 'string' || typeof child === 'number') el.appendChild(StripTags(String(child)));
      if (typeof child === 'function') {
        const run = () => (el.innerText = child());
        if (child?.prototype?.atom === 'String' || child?.prototype?.atom === 'Number') {
          child.prototype.sub(run);
        }
        run();
      }
    });
    return el;
  };

export const a = CreateElement('a');
export const abbr = CreateElement('abbr');
export const address = CreateElement('address');
export const area = CreateElement('area');
export const article = CreateElement('article');
export const aside = CreateElement('aside');
export const audio = CreateElement('audio');
export const b = CreateElement('b');
export const base = CreateElement('base');
export const bdi = CreateElement('bdi');
export const bdo = CreateElement('bdo');
export const blockquote = CreateElement('blockquote');
export const body = CreateElement('body');
export const br = CreateElement('br');
export const button = CreateElement('button');
export const canvas = CreateElement('canvas');
export const caption = CreateElement('caption');
export const cite = CreateElement('cite');
export const code = CreateElement('code');
export const col = CreateElement('col');
export const colgroup = CreateElement('colgroup');
export const data = CreateElement('data');
export const datalist = CreateElement('datalist');
export const dd = CreateElement('dd');
export const del = CreateElement('del');
export const details = CreateElement('details');
export const dfn = CreateElement('dfn');
export const dialog = CreateElement('dialog');
export const div = CreateElement('div');
export const dl = CreateElement('dl');
export const dt = CreateElement('dt');
export const em = CreateElement('em');
export const embed = CreateElement('embed');
export const fieldset = CreateElement('fieldset');
export const figcaption = CreateElement('figcaption');
export const figure = CreateElement('figure');
export const footer = CreateElement('footer');
export const form = CreateElement('form');
export const h1 = CreateElement('h1');
export const h2 = CreateElement('h2');
export const h3 = CreateElement('h3');
export const h4 = CreateElement('h4');
export const h5 = CreateElement('h5');
export const h6 = CreateElement('h6');
export const head = CreateElement('head');
export const header = CreateElement('header');
export const hgroup = CreateElement('hgroup');
export const hr = CreateElement('hr');
export const html = CreateElement('html');
export const i = CreateElement('i');
export const iframe = CreateElement('iframe');
export const img = CreateElement('img');
export const input = CreateElement('input');
export const ins = CreateElement('ins');
export const kbd = CreateElement('kbd');
export const label = CreateElement('label');
export const legend = CreateElement('legend');
export const li = CreateElement('li');
export const link = CreateElement('link');
export const main = CreateElement('main');
export const map = CreateElement('map');
export const mark = CreateElement('mark');
export const menu = CreateElement('menu');
export const meta = CreateElement('meta');
export const meter = CreateElement('meter');
export const nav = CreateElement('nav');
export const noscript = CreateElement('noscript');
export const object = CreateElement('object');
export const ol = CreateElement('ol');
export const optgroup = CreateElement('optgroup');
export const option = CreateElement('option');
export const output = CreateElement('output');
export const p = CreateElement('p');
export const picture = CreateElement('picture');
export const pre = CreateElement('pre');
export const progress = CreateElement('progress');
export const q = CreateElement('q');
export const rp = CreateElement('rp');
export const rt = CreateElement('rt');
export const ruby = CreateElement('ruby');
export const s = CreateElement('s');
export const samp = CreateElement('samp');
export const script = CreateElement('script');
export const section = CreateElement('section');
export const select = CreateElement('select');
export const slot = CreateElement('slot');
export const small = CreateElement('small');
export const source = CreateElement('source');
export const span = CreateElement('span');
export const strong = CreateElement('strong');
export const style = CreateElement('style');
export const sub = CreateElement('sub');
export const summary = CreateElement('summary');
export const sup = CreateElement('sup');
export const table = CreateElement('table');
export const tbody = CreateElement('tbody');
export const td = CreateElement('td');
export const template = CreateElement('template');
export const textarea = CreateElement('textarea');
export const tfoot = CreateElement('tfoot');
export const th = CreateElement('th');
export const thead = CreateElement('thead');
export const time = CreateElement('time');
export const title = CreateElement('title');
export const tr = CreateElement('tr');
export const track = CreateElement('track');
export const u = CreateElement('u');
export const ul = CreateElement('ul');
export const video = CreateElement('video');
export const wbr = CreateElement('wbr');
