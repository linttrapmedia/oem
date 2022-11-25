export const useRoot = (el: Node | (() => Node), select = 'body') => {
  window.addEventListener('DOMContentLoaded', () => {
    const node = typeof el === 'function' ? el() : el;
    document.querySelector(select).appendChild(node);
  });
};
