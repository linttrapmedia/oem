import { State, SVG } from '../src';
import { HTML } from '../src/template/HTML';
import { useAttribute } from '../src/traits/Attribute';
import { useEvent } from '../src/traits/Event';
import { useInnerHTML } from '../src/traits/InnerHTML';
import { useStyle } from '../src/traits/Style';

declare namespace Prism {
  const highlight: any;
  const languages: any;
}

export const usePrism = () => (el: HTMLElement) => {
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
  attr: useAttribute(),
  click: useEvent({ event: 'click' }),
  prism: usePrism(),
  style: useStyle(),
  'html:menu': useInnerHTML({ state: menuState }),
  'html:menu_toggle': useInnerHTML({ state: menuOpen }),
  'style:menu': useStyle({ state: menuState }),
  'style:menu_toggle': useStyle({ state: menuOpen }),
  'style:tablet': useStyle({ mediaMinWidth: 800 }),
  'style:mouseover': useStyle({ event: 'mouseover' }),
  'style:mouseout': useStyle({ event: 'mouseout' }),
});

export const svg = SVG({
  attr: useAttribute(),
  style: useStyle(),
  click: useEvent({ event: 'click' }),
  'style:mouseover': useStyle({ event: 'mouseover' }),
  'style:mouseout': useStyle({ event: 'mouseout' }),
});
