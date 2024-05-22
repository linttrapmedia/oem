import { fsm } from './fsm/machine';
import { TodoType } from './state';

export const useTodoDelete = (el: HTMLElement, todo: TodoType) => {
  el.addEventListener('click', (click: Event) => {
    click.stopPropagation();
    fsm('TODO:DELETE', todo);
  });
};

export const useTodoToggle = (el: HTMLElement, todo: TodoType) => {
  el.addEventListener('click', () => {
    fsm('TODO:TOGGLE', todo);
  });
};

export const useTodoSubmit = (el: HTMLElement) => {
  el.addEventListener('submit', (submitEvent: Event) => {
    submitEvent.preventDefault();
    const form = submitEvent.target as HTMLFormElement;
    form.reset();
    fsm('TODO:ADD');
  });
};

export const useTodoInput = (el: HTMLElement) => {
  el.addEventListener('input', (inputEvent: Event) => {
    const inputEl = inputEvent.target as HTMLInputElement;
    const inputValue = inputEl.value;
    fsm('TODO:INPUT', inputValue);
  });
};
