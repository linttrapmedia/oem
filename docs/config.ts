import { Template } from 'src/html/HTML';
import { useAttribute } from 'src/html/traits/Attribute';
import { useBreakpointStyle } from 'src/html/traits/BreakpointStyle';
import { useEventStyle } from 'src/html/traits/EventStyle';

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

export const { a, button, code, div, img, pre, span } = Template({
  attr: useAttribute(),
  on_click: useEventStyle('click'),
  prism: usePrism(),
  style: useBreakpointStyle(0),
  'style:tablet': useBreakpointStyle(960),
  'style:mouseover': useEventStyle('mouseover'),
  'style:mouseout': useEventStyle('mouseout'),
});
