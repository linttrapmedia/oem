import { Condition, extractConditions, extractStates, StateType } from '@/oem';

type TextContent = string | number | undefined | unknown;

export function useTextContentTrait(
  el: HTMLElement,
  text: TextContent | TextContent[] | (() => TextContent | TextContent[]),
  ...rest: (StateType<any> | Condition)[]
) {
  const states = extractStates(text, ...rest);
  const conditions = extractConditions(...rest);
  const apply = () => {
    const _text = typeof text === 'function' ? text() : text;
    const applies = conditions.every((i) => (typeof i === 'function' ? i() : i));
    if (applies) {
      el.textContent = '';
      if (_text !== undefined) {
        if (Array.isArray(_text)) {
          _text
            .filter((t) => t !== undefined)
            .forEach((t) => {
              el.appendChild(document.createTextNode(String(t)));
            });
        } else {
          el.textContent = String(_text);
        }
      }
    }
  };
  apply();
  const unsubs = states.map((state) => state.sub(apply));
  return () => unsubs.forEach((unsub) => unsub());
}
