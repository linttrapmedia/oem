import { Tail } from './Types';

export const Row = (el: HTMLElement) => (gap: `${string}px` | number) => {
  el.style.display = 'flex';
  el.style.flexDirection = 'row';
  el.style.gap = typeof gap === 'number' ? `${gap}px` : gap;
};

// export const InnerHtml = (el: HTMLElement) => (nodes: Node[], state: State) => {
//   const run = () => {
//     const children = typeof nodes === 'function' ? nodes() : nodes;
//     children.forEach((child: Node) => el.appendChild(child));
//   };
//   if (typeof nodes === 'function' && nodes.prototype.atom) nodes.prototype.sub(run);
//   run();
// };

export const InnerText = (el: HTMLElement) => (text: string | Function) => {
  const run = () => (el.innerText = typeof text === 'function' ? text() : text);
  if (typeof text === 'function' && text.prototype.atom) text.prototype.sub(run);
  run();
};

export const OnClick =
  (el: HTMLElement) =>
  (cb: (...args: any[]) => void, ...args: any[]) => {
    el.addEventListener('click', () => cb(...args));
  };

export const Traits = {
  row: Row,
  // inner_html: InnerHtml,
  inner_text: InnerText,
  on_click: OnClick,
};

export const CreateTrait = <T extends (...args: any) => any>(trait: string, func: T) => {
  (<any>Traits)[trait] = func;
  return (...args: Tail<Parameters<T>>) => [trait, ...args];
};

export default Object.entries(Traits).reduce(
  (acc, [key, val]) => ({
    ...acc,
    [key]: (...args: any[]) => [key, ...args],
  }),
  {} as {
    [K in keyof typeof Traits]: (
      ...args: Parameters<ReturnType<typeof Traits[K]>>
    ) => [K, ...Parameters<ReturnType<typeof Traits[K]>>];
  },
);
