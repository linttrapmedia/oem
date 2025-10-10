import { HTML } from '../html/HTML';
import { State } from '../state/State';
import { StateType } from '../types';

type AllEvents = GlobalEventHandlersEventMap & HTMLElementEventMap & WindowEventMap;

export const Trait = <Args extends any[]>(trait: (el: HTMLElement, ...args: Args) => void) => {
  return function (...listeners: (StateType<any> | [string, keyof AllEvents])[]) {
    return function (el: HTMLElement, ...closureArgs: [...Args, boolean | (() => boolean)] | [...Args]) {
      const closureArgLength = closureArgs.length;
      const traitArgLength = trait.length; // this will be at least 1 (the element)

      function apply() {
        // edge case condition: the trait args matching the closure args exactly means a
        // condition function was passed and therefore should be evaluated
        const condition = closureArgLength === traitArgLength ? closureArgs[closureArgs.length - 1] : true;
        if (typeof condition === 'function' ? (condition as any)() : condition) {
          trait(el, ...(closureArgs as any));
        }
      }

      listeners.forEach((listener) => {
        if (Array.isArray(listener)) {
          const [target, event] = listener;
          const eventTarget = target === 'window' ? window : document.querySelector(target);
          if (eventTarget) eventTarget.addEventListener(event, apply);
        } else {
          listener.sub(apply);
        }
      });
      // immediate application
      apply();
    };
  };
};

const state = State<1>(1);

const useStyle = Trait((el: HTMLElement, color: 'red' | 'blue') => {
  el.style.color = color;
});

export const tmpl = HTML({ style: useStyle(state, ['window', 'click']) });

tmpl.div(['style', 'blue'])('This text is red!');
