import { Theme } from './Theme';

export const SPA = (page: HTMLElement) => {
  window.addEventListener('DOMContentLoaded', async () => {
    const globalStyles = `html,body { 
          min-height:100%; 
          width:100%; 
          padding:0;
          margin:0;
          font-family:${Theme.Font('Space Grotesk')};
        }`;
    const style = document.createElement('style');
    style.innerHTML = globalStyles;
    document.head.appendChild(style);
    document.body.appendChild(page);
  });
};
