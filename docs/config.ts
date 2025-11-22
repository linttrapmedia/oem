import { Template } from '@/oem';
import { useAttributeTrait } from '@/traits/Attribute';
import { useEventTrait } from '@/traits/Event';
import { useInnerHTMLTrait } from '@/traits/InnerHTML';
import { useStyleTrait } from '@/traits/Style';

declare namespace Prism {
  const highlight: any;
  const languages: any;
}

// Custom trait for code highlighting
export const usePrism = (el: HTMLElement, language: string) => {
  el.style.display = 'block';
  el.style.whiteSpace = 'pre';
  el.style.fontFamily = "'Courier New', Courier, monospace";
  el.style.color = 'white';
  el.style.backgroundColor = '#222222';
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

export const [tag, trait] = Template({
  attr: useAttributeTrait,
  event: useEventTrait,
  style: useStyleTrait,
  html: useInnerHTMLTrait,
  prism: usePrism,
});
