import { markdown } from '@core/utils/markdown';
import { Trait } from './Trait';
import { Types } from './Types';

function Html<
  Config extends { attr: typeof Trait.Attr; style: typeof Trait.Style },
>(): Types.HtmlTemplateTagMap<Config>;

function Html<Config extends Types.HtmlTemplateConfig>(config?: Config): Types.HtmlTemplateTagMap<Config>;

function Html<Config extends Types.HtmlTemplateConfig>(config = {}) {
  // default traits
  const _config: Types.HtmlTemplateConfig = {
    ...Types.TraitsDefault,
    ...config,
  };

  return Types.HtmlTagList.reduce((acc, tag) => {
    acc[tag as keyof HTMLElementTagNameMap] =
      <KS extends Array<keyof Config>>(
        ...traits: {
          [I in keyof KS]-?: [KS[I], ...Types.TraitParams<Config[Extract<KS[I], keyof Config>]>];
        }
      ) =>
      (...children: Types.HtmlChild[]) => {
        const el = document.createElementNS('http://www.w3.org/1999/xhtml', tag);
        traits.forEach(([trait, ...args]) => _config[trait as string](el, ...args));
        children.forEach((child) => {
          if (child instanceof Node) el.appendChild(child);
          if (typeof child === 'string' || typeof child === 'number') el.appendChild(CleanText(String(child)));
        });
        return el;
      };
    return acc;
  }, {} as Types.HtmlTemplateTagMap<Config>);
}

function Fragment(...children: Types.HtmlChild[]) {
  const el = document.createDocumentFragment();
  children.forEach((child) => {
    if (child instanceof Node) el.appendChild(child);
    if (typeof child === 'string' || typeof child === 'number') el.appendChild(CleanText(String(child)));
  });
  return el;
}

function DangerouslySetInnerHTML(html: Types.HtmlChild) {
  const el = document.createElement('div');
  el.innerHTML = html.toString();
  return el.innerHTML;
}

type MarkdownConfig = {
  styles?: string;
};
function Markdown(md: string, config?: MarkdownConfig) {
  const _div = document.createElement('div');
  const _frag = document.createDocumentFragment();
  if (config?.styles) {
    const style = document.createElement('style');
    style.innerHTML = config.styles;
    document.getElementsByTagName('head')[0].appendChild(style);
  }
  _div.innerHTML = markdown(md);
  while (_div.firstChild) _frag.appendChild(_div.firstChild);
  return _frag;
}

const Svg =
  <T extends Record<Types.SvgTraitProp, Types.SvgTraitFunc>>(traits: T) =>
  <KS extends Array<keyof T>>(
    tag: Types.SvgTags,
    ...attrs: { [I in keyof KS]-?: [KS[I], ...Types.SvgTraitParams<T[Extract<KS[I], keyof T>]>] }
  ) =>
  (...children: Types.SvgChild[]) => {
    const el = document.createElementNS('http://www.w3.org/2000/svg', tag);
    attrs.forEach(([attr, ...args]) => traits[attr](<any>el, ...args));
    children.forEach((child) => {
      if (child instanceof Node) el.appendChild(child);
      if (typeof child === 'string' || typeof child === 'number') el.innerHTML += child;
    });

    return el;
  };

// Helpers

const CleanText = (text: string) => {
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

export const Template = {
  DangerouslySetInnerHTML,
  Html,
  Markdown,
  Fragment,
  Svg,
};
