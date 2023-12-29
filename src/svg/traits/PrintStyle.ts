export const usePrintStyle = () => {
  const id = 'print-style';
  let style: HTMLStyleElement = document.getElementById(id) as HTMLStyleElement;
  if (!style) {
    style = document.createElement('style');
    style.id = id;
    style.setAttribute('type', 'text/css');
    style.setAttribute('media', 'print');
    document.getElementsByTagName('head')[0].appendChild(style);
  }
  const sheet = style.sheet;

  return (
    el: HTMLElement,
    prop: keyof CSSStyleDeclaration,
    val: (() => string | number) | (string | number),
    condition?: boolean | (() => boolean),
  ) => {
    el.dataset.printId = el.dataset.printId ?? (Math.random() * 100000000).toFixed(0);
    const selector = id + '-' + el.dataset.printId;
    const _val = String(typeof val === 'function' ? val() : val);

    const apply = () => {
      const propFmt = (<string>prop).replace(/([A-Z])/g, '-$1').toLowerCase();
      sheet.insertRule(`.${selector} { ${propFmt}:${_val} !important; }`, 0);
      el.classList.add(selector);
    };

    (typeof condition === 'function' ? condition() : condition ?? true) ? apply() : null;
    return el;
  };
};
