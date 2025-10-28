import { useAttribute } from '@/factory/traits/Attribute';
import { useEvent } from '@/factory/traits/Event';
import { useInnerHTML } from '@/factory/traits/InnerHTML';
import { useStyle } from '@/factory/traits/Style';
import { HTML, State, SVG } from '@/index';

declare namespace Prism {
  const highlight: any;
  const languages: any;
}

export const usePrism = (el: HTMLElement) => {
  el.style.display = 'block';
  el.style.whiteSpace = 'pre';
  el.style.fontFamily = 'monospace';
  el.style.color = 'white';
  el.style.backgroundColor = 'black';
  el.style.padding = '30px';
  el.style.borderRadius = '5px';
  el.style.overflowX = 'auto';
  el.style.maxWidth = '100%';
  el.style.width = '100%';
  el.style.minWidth = '0';
  el.style.boxSizing = 'border-box';
  el.style.wordBreak = 'normal';
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

export type MenuStateTypes = 'introduction' | 'docs' | 'templates' | 'state' | 'traits' | 'patterns' | 'factory';

export const menuState = State<MenuStateTypes>('introduction', {
  key: 'menuState',
  storage: localStorage,
});

export const menuOpen = State(false);

export const html = HTML({
  attr: useAttribute,
  click: useEvent({ event: 'click' }),
  prism: usePrism,
  style: useStyle,
  html: useInnerHTML,
});

export const svg = SVG({
  attr: useAttribute,
  style: useStyle,
  click: useEvent({ event: 'click' }),
});
