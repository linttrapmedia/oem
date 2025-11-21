import { State, Template } from '@/oem';
import { useMediaQueryState } from '@/states/MediaQuery';
import { useAttributeTrait } from '@/traits/Attribute';
import { useEventTrait } from '@/traits/Event';
import { useInnerHTMLTrait } from '@/traits/InnerHTML';
import { useStyleTrait } from '@/traits/Style';

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

export type MenuStateTypes =
  | 'introduction'
  | 'docs'
  | 'templates'
  | 'state'
  | 'traits'
  | 'patterns';

export const menuState = State<MenuStateTypes>('introduction');
export const menuOpen = State(false);
export const isMobile = useMediaQueryState({ type: 'screen', minWidth: 0, maxWidth: 959 });
export const isTablet = useMediaQueryState({ type: 'screen', minWidth: 960, maxWidth: Infinity });

export const [html, trait] = Template({
  attr: useAttributeTrait,
  event: useEventTrait,
  prism: usePrism,
  style: useStyleTrait,
  html: useInnerHTMLTrait,
});
