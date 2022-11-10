import { markdown } from '@core/utils/markdown';
import { Trait } from './Trait';
import { Types } from './Types';

type DefTraits = {
  attr: typeof Trait.Attr;
  flex: typeof Trait.Flex;
  grid: typeof Trait.Grid;
  on_click: typeof Trait.OnClick;
  style: typeof Trait.Style;
  style_on_hover: typeof Trait.StyleOnHover;
  style_on_resize: typeof Trait.StyleOnResize;
  style_on_win_resize: typeof Trait.StyleOnWinResize;
  styles: typeof Trait.Styles;
};

function Html<Config extends DefTraits>(): Types.HtmlTemplateTagMap<Config>;
function Html<Config extends Types.HtmlTemplateConfig>(config?: Config): Types.HtmlTemplateTagMap<Config & DefTraits>;
function Html<Config extends Types.HtmlTemplateConfig>(config?: Config) {
  // default traits
  const _config: Types.HtmlTemplateConfig = {
    attr: config.attr || Trait.Attr,
    flex: config.flex || Trait.Flex,
    grid: config.grid || Trait.Grid,
    on_click: config.on_click || Trait.OnClick,
    style_on_hover: config.style_on_hover || Trait.StyleOnHover,
    style_on_resize: config.style_on_resize || Trait.StyleOnResize,
    style_on_win_resize: config.style_on_win_resize || Trait.StyleOnWinResize,
    style: config.style || Trait.Style,
    styles: config.styles || Trait.Styles,
    ...config,
  };

  return 'a,abbr,address,area,article,aside,audio,b,base,bdi,bdo,blockquote,body,br,button,canvas,caption,cite,code,col,colgroup,data,datalist,dd,del,details,dfn,dialog,div,dl,dt,em,embed,fieldset,figcaption,figure,footer,form,h1,h2,h3,h4,h5,h6,head,header,hgroup,hr,html,i,iframe,img,input,ins,kbd,label,legend,li,link,main,map,mark,menu,meta,meter,nav,noscript,object,ol,optgroup,option,output,p,picture,pre,progress,q,rp,rt,ruby,s,samp,script,section,select,slot,small,source,span,strong,style,sub,summary,sup,table,tbody,td,template,textarea,tfoot,th,thead,time,title,tr,track,u,ul,var,video,wbr'
    .split(',')
    .reduce((acc, tag) => {
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
