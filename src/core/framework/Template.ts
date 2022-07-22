import { Theme } from '@core/modules/Theme';

const Html =
  <T extends Record<Types.HtmlTraitProp, Types.HtmlTraitFunc>>(config: T) =>
  <KS extends Array<keyof T>>(
    tag: Types.HtmlTags['tag'],
    ...traits: { [I in keyof KS]-?: [KS[I], ...Types.HtmlTraitParams<T[Extract<KS[I], keyof T>]>] }
  ) =>
  (...children: Types.HtmlChild[]) => {
    const el = document.createElementNS('http://www.w3.org/1999/xhtml', tag);
    traits.forEach(([trait, ...args]) => config[trait](el, ...args));
    children.forEach((child) => {
      if (child instanceof Node) el.appendChild(child);
      if (typeof child === 'string' || typeof child === 'number') el.appendChild(CleanText(String(child)));
    });
    return el;
  };

const Fragment = (...children: Types.HtmlChild[]) => {
  const el = document.createDocumentFragment();
  children.forEach((child) => {
    if (child instanceof Node) el.appendChild(child);
    if (typeof child === 'string' || typeof child === 'number') el.appendChild(CleanText(String(child)));
  });
  return el;
};

const Svg =
  <T extends Record<Types.SvgTraitProp, Types.SvgTraitFunc>>(traits: T) =>
  <KS extends Array<keyof T>>(
    tag: Types.SvgTags['tag'],
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
  const markdownBold = /\*\*(.*?)\*\*/g;
  const markdownItalic = /\*(.*?)\*/g;
  const markdownCode = /`(.*?)`/g;
  const markdownLinks = /!?\[([^\]]*)?\]\(((https?:\/\/|\/)?[A-Za-z0-9\:\/\. ].*)\)/gm;
  const cleanedText = text
    .replace(htmlAmp, '&amp;')
    .replace(htmlLT, '&lt;')
    .replace(htmlGT, '&gt;')
    .replace(htmlQuote, '&quot;')
    .replace(htmlSingleQuote, '&#039;')
    .replace(markdownBold, (_, $1) => `<b>${$1}</b>`)
    .replace(markdownItalic, (_, $1) => `<em>${$1}</em>`)
    .replace(
      markdownCode,
      (_, $1) =>
        `<code style="color:inherit;background-color:${Theme.Color(
          'yellow',
          0,
          0.2,
        )}; display:inline-block; padding:2px 5px; font-size:0.9em;">${$1}</code>`,
    )
    .replace(markdownLinks, (_, $1, $2) => `<a href="${$2}" style="color:inherit">${$1}</a>`);
  el.innerHTML = cleanedText;
  return el.content;
};

export const Template = {
  Html,
  Fragment,
  Svg,
};
