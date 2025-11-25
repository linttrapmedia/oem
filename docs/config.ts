import { State, Template } from '@/oem';
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

export const theme = State<'grey' | 'ada'>('grey');
export const prismCss = State('');
export const downloading = State(false);

export const traitLibrary = [
  ['useAttributeTrait', 'src/traits/Attribute.ts', 'Set HTML attributes'],
  ['useClassNameTrait', 'src/traits/ClassName.ts', 'Apply CSS class names'],
  ['useEventTrait', 'src/traits/Event.ts', 'Attach event listeners (click, input, etc.)'],
  ['useFocusTrait', 'src/traits/Focus.ts', 'Manage focus and blur events'],
  ['useInnerHTMLTrait', 'src/traits/InnerHTML.ts', 'Set inner HTML content'],
  ['useInputEventTrait', 'src/traits/InputEvent.ts', 'Handle input events'],
  ['useStyleTrait', 'src/traits/Style.ts', 'Apply inline styles'],
  ['useTextContentTrait', 'src/traits/TextContent.ts', 'Set text content'],
  ['useValueTrait', 'src/traits/InputValue.ts', 'Bind to input values'],
];

export const statesLibrary = [
  ['useMediaQueryState', 'src/states/MediaQuery.ts', 'Responsive state based on window size'],
];

export const examplesLibrary = [
  ['Single File Todo', 'examples/singleFileTodo', 'A simple todo list application using OEM.'],
  ['Todo', 'examples/todo', 'A todo application demonstrating state management.'],
  ['Counter', 'examples/counter', 'A simple counter application.'],
];

export const [tag, trait] = Template({
  attr: useAttributeTrait,
  event: useEventTrait,
  style: useStyleTrait,
  html: useInnerHTMLTrait,
  prism: usePrism,
});

// declare JSZip for downloading files as zip
declare var JSZip: any;

export async function download(paths: string[]) {
  const zip = new JSZip();
  const _paths = ['src/oem.ts', ...paths];

  for (const path of _paths) {
    const url = `https://raw.githubusercontent.com/linttrapmedia/oem/refs/heads/main/${path}`;
    const resp = await fetch(url);

    if (!resp.ok) {
      console.error('Failed:', path);
      continue;
    }

    const fileData = await resp.arrayBuffer();
    const fileName = path.split('/').pop();
    const folder = path.startsWith('src/traits')
      ? 'traits/'
      : path.startsWith('src/states')
      ? 'states/'
      : '';

    zip.file(folder + fileName, fileData);
  }

  const blob = await zip.generateAsync({ type: 'blob' });

  // create link and download
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'oem.zip';
  a.click();

  URL.revokeObjectURL(a.href);
}
