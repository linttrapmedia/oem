import { Theme } from './Theme';

type MPAprops<T extends string> = {
  pages: Record<T, { title: string; page: () => HTMLElement }>;
  content: (page: T) => HTMLElement;
};

export const MPA = <T extends string>({ pages, content }: MPAprops<T>) => {
  window.addEventListener('DOMContentLoaded', async () => {
    // global styling
    const globalStyles = `html,body { 
          height:100%; 
          width:100%; 
          padding:0;
          margin:0;
          font-family:${Theme.Font('Space Grotesk')};
          display:flex;
          justify-content:center;
          overflow-x:hidden; 
        }`;
    const style = document.createElement('style');
    style.innerHTML = globalStyles;
    document.head.appendChild(style);

    // handle page routing
    const page = new URLSearchParams(window.location.search).get('p') as keyof typeof pages;
    document.body.appendChild(content(page));

    // handle anchor link
    const hash = window.location.hash ?? null;
    if (hash.length) {
      const element = document.querySelector(hash);
      if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
};
