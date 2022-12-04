declare module Prism {
  const highlight: any;
  const languages: any;
}

export const Snippet = (snippet: string) => {
  const text = Prism.highlight(snippet, Prism.languages[`typescript`]);
  const el = document.createElement('div');
  el.style.whiteSpace = 'pre';
  el.style.color = 'white';
  el.style.lineHeight = '1.5em';
  el.innerHTML = text;
  return el;
};
