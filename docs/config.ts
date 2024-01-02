import { HTML } from '@oem/html/HTML';
import { useAttribute } from '@oem/html/traits/Attribute';
import { useEvent, useStyle } from '@oem/index';

declare module Prism {
  const highlight: any;
  const languages: any;
}

export const usePrism = () => (el: HTMLElement) => {
  el.style.whiteSpace = 'pre';
  el.style.fontFamily = 'monospace';
  el.style.color = 'white';
  el.style.backgroundColor = 'black';
  el.style.padding = '30px';
  el.style.borderRadius = '5px';
  el.style.overflow = 'auto';
  el.style.maxWidth = '100%';
  el.style.width = '100%';
  el.style.boxSizing = 'border-box';
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'childList') {
        if (mutation.addedNodes.length > 0) {
          observer.disconnect();
          const formattedCode = Prism.highlight(el.innerText, Prism.languages[`typescript`]);
          el.innerHTML = formattedCode;
        }
      }
    });
  });
  observer.observe(el, { childList: true });
  return el;
};

export const { a, button, code, div, img, pre, span } = HTML({
  attr: useAttribute(),
  on_click: useEvent('click'),
  prism: usePrism(),
  style: useStyle(),
  'style:tablet': useStyle({ mediaMinWidth: 960 }),
  'style:mouseover': useStyle({ event: 'mouseover' }),
  'style:mouseout': useStyle({ event: 'mouseout' }),
});
