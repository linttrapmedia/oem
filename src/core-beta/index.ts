export * from './Color';
export * from './Markdown';
import { OEM_APP } from './App';
import { OEM_ARRAY } from './Array';
import { OEM_BREAKPOINT } from './Breakpoint';
import { OEM_COMPONENT } from './Component';
import { OEM_ELEMENT } from './Element';
import { OEM_LOCATION } from './Location';
import { OEM_NUMBER } from './Number';
import { OEM_STRING } from './String';

const createProxyEl = <T extends HTMLElement>(tag: keyof HTMLElementTagNameMap) =>
  new Proxy({} as OEM_ELEMENT<T>, {
    get: (_, key) => {
      return Reflect.get(new OEM_ELEMENT<T>(tag), key);
    },
  });

export const A = createProxyEl<HTMLAnchorElement>('a');
// export const ABBRADDRESS = createProxyEl<HTMLElement>('abbraddress');
export const AREA = createProxyEl<HTMLAreaElement>('area');
export const ARTICLE = createProxyEl<HTMLElement>('article');
export const ASIDE = createProxyEl<HTMLElement>('aside');
export const AUDIO = createProxyEl<HTMLAudioElement>('audio');
export const B = createProxyEl<HTMLElement>('b');
export const BASE = createProxyEl<HTMLBaseElement>('base');
export const BDI = createProxyEl<HTMLElement>('bdi');
export const BDO = createProxyEl<HTMLElement>('bdo');
export const BLOCKQUOTE = createProxyEl<HTMLQuoteElement>('blockquote');
export const BODY = createProxyEl<HTMLBodyElement>('body');
export const BR = createProxyEl<HTMLBRElement>('br');
export const BUTTON = createProxyEl<HTMLButtonElement>('button');
export const CANVAS = createProxyEl<HTMLCanvasElement>('canvas');
export const CAPTION = createProxyEl<HTMLTableCaptionElement>('caption');
export const CITE = createProxyEl<HTMLElement>('cite');
export const CODE = createProxyEl<HTMLElement>('code');
export const COL = createProxyEl<HTMLTableColElement>('col');
export const COLGROUP = createProxyEl<HTMLTableColElement>('colgroup');
export const DATA = createProxyEl<HTMLDataElement>('data');
export const DATALIST = createProxyEl<HTMLDataListElement>('datalist');
export const DD = createProxyEl<HTMLElement>('dd');
export const DEL = createProxyEl<HTMLModElement>('del');
export const DETAILS = createProxyEl<HTMLDetailsElement>('details');
export const DFN = createProxyEl<HTMLElement>('dfn');
export const DIALOG = createProxyEl<HTMLDialogElement>('dialog');
export const DIV = createProxyEl<HTMLDivElement>('div');
export const DL = createProxyEl<HTMLDListElement>('dl');
export const DT = createProxyEl<HTMLElement>('dt');
export const EM = createProxyEl<HTMLElement>('em');
export const EMBED = createProxyEl<HTMLEmbedElement>('embed');
export const FIELDSET = createProxyEl<HTMLFieldSetElement>('fieldset');
export const FIGCAPTION = createProxyEl<HTMLElement>('figcaption');
export const FIGURE = createProxyEl<HTMLElement>('figure');
export const FOOTER = createProxyEl<HTMLElement>('footer');
export const FORM = createProxyEl<HTMLFormElement>('form');
export const H1 = createProxyEl<HTMLHeadElement>('h1');
export const H2 = createProxyEl<HTMLHeadElement>('h2');
export const H3 = createProxyEl<HTMLHeadElement>('h3');
export const H4 = createProxyEl<HTMLHeadElement>('h4');
export const H5 = createProxyEl<HTMLHeadElement>('h5');
export const H6 = createProxyEl<HTMLHeadElement>('h6');
export const HEAD = createProxyEl<HTMLHeadElement>('head');
export const HEADER = createProxyEl<HTMLElement>('header');
export const HGROUP = createProxyEl<HTMLElement>('hgroup');
export const HR = createProxyEl<HTMLHRElement>('hr');
export const HTML = createProxyEl<HTMLElement>('html');
export const I = createProxyEl<HTMLElement>('i');
export const IFRAME = createProxyEl<HTMLElement>('iframe');
export const IMG = createProxyEl<HTMLElement>('img');
export const INPUT = createProxyEl<HTMLInputElement>('input');
export const INS = createProxyEl<HTMLElement>('ins');
export const KBD = createProxyEl<HTMLElement>('kbd');
export const LABEL = createProxyEl<HTMLElement>('label');
export const LEGEND = createProxyEl<HTMLElement>('legend');
export const LI = createProxyEl<HTMLElement>('li');
export const LINK = createProxyEl<HTMLElement>('link');
export const MAIN = createProxyEl<HTMLElement>('main');
export const MAP = createProxyEl<HTMLElement>('map');
export const MARK = createProxyEl<HTMLElement>('mark');
export const MENU = createProxyEl<HTMLElement>('menu');
export const META = createProxyEl<HTMLElement>('meta');
export const METER = createProxyEl<HTMLElement>('meter');
export const NAV = createProxyEl<HTMLElement>('nav');
export const NOSCRIPT = createProxyEl<HTMLElement>('noscript');
export const OBJECT = createProxyEl<HTMLElement>('object');
export const OL = createProxyEl<HTMLElement>('ol');
export const OPTGROUP = createProxyEl<HTMLElement>('optgroup');
export const OPTION = createProxyEl<HTMLElement>('option');
export const OUTPUT = createProxyEl<HTMLElement>('output');
export const P = createProxyEl<HTMLElement>('p');
export const PICTURE = createProxyEl<HTMLElement>('picture');
export const PRE = createProxyEl<HTMLElement>('pre');
export const PROGRESS = createProxyEl<HTMLElement>('progress');
export const Q = createProxyEl<HTMLElement>('q');
export const RP = createProxyEl<HTMLElement>('rp');
export const RT = createProxyEl<HTMLElement>('rt');
export const RUBY = createProxyEl<HTMLElement>('ruby');
export const S = createProxyEl<HTMLElement>('s');
export const SAMP = createProxyEl<HTMLElement>('samp');
export const SCRIPT = createProxyEl<HTMLElement>('script');
export const SECTION = createProxyEl<HTMLElement>('section');
export const SELECT = createProxyEl<HTMLElement>('select');
export const SLOT = createProxyEl<HTMLElement>('slot');
export const SMALL = createProxyEl<HTMLElement>('small');
export const SOURCE = createProxyEl<HTMLElement>('source');
export const SPAN = createProxyEl<HTMLElement>('span');
export const STRONG = createProxyEl<HTMLElement>('strong');
export const STYLE = createProxyEl<HTMLElement>('style');
export const SUB = createProxyEl<HTMLElement>('sub');
export const SUMMARY = createProxyEl<HTMLElement>('summary');
export const SUP = createProxyEl<HTMLElement>('sup');
export const TABLE = createProxyEl<HTMLElement>('table');
export const TBODY = createProxyEl<HTMLElement>('tbody');
export const TD = createProxyEl<HTMLElement>('td');
export const TEMPLATE = createProxyEl<HTMLElement>('template');
export const TEXTAREA = createProxyEl<HTMLElement>('textarea');
export const TFOOT = createProxyEl<HTMLElement>('tfoot');
export const TH = createProxyEl<HTMLElement>('th');
export const THEAD = createProxyEl<HTMLElement>('thead');
export const TIME = createProxyEl<HTMLElement>('time');
export const TITLE = createProxyEl<HTMLElement>('title');
export const TR = createProxyEl<HTMLElement>('tr');
export const TRACK = createProxyEl<HTMLElement>('track');
export const U = createProxyEl<HTMLElement>('u');
export const UL = createProxyEl<HTMLElement>('ul');
export const VAR = createProxyEl<HTMLElement>('var');
export const VIDEO = createProxyEl<HTMLElement>('video');
export const WBR = createProxyEl<HTMLElement>('wbr');

export const APP = OEM_APP;
export const ARRAY = <T extends any>(ary: T[]) => new OEM_ARRAY<T>(ary);
export const BREAKPOINT = (
  breakpoint: number = 0,
  dimension?: 'height' | 'width',
  container?: string,
) => new OEM_BREAKPOINT(breakpoint, dimension ?? 'width', container);
export const COMPONENT = (...args: Parameters<OEM.COMPONENT>) => OEM_COMPONENT(...args);
export const LOCATION = () => new OEM_LOCATION();
export const STRING = (s: string) => new OEM_STRING(s);
export const NUMBER = (n: number) => new OEM_NUMBER(n);
export const COMMENT = (comment: string) => document.createComment(comment);

// export const OEM = {
//   NUMBER,
//   DIV,
// };
