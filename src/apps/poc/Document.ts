export const root = (el: Node, select = 'body') => {
  window.addEventListener('DOMContentLoaded', () => {
    document.querySelector(select).appendChild(el);
  });
};
