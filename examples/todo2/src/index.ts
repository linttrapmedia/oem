import { HTML, State, StateType } from '@/index';

function Attr(
  el: HTMLElement,
  attr: string,
  val: string | (() => string) | number | (() => number),
  condition: boolean | (() => boolean) = true,
  ...states: StateType<any>[]
) {
  const apply = () => {
    const cond = typeof condition === 'function' ? condition() : condition;
    const value = typeof val === 'function' ? val() : val;
    const isDifferent = el.getAttribute(attr) !== value;
    if (cond && isDifferent) el.setAttribute(attr, String(value));
  };
  states.forEach((state) => state.sub(apply));
  apply();
}

function InnerHTML(
  el: HTMLElement,
  content: HTMLElement | (() => HTMLElement),
  condition: boolean | (() => boolean) = true,
  ...states: StateType<any>[]
) {
  const apply = () => {
    const cond = typeof condition === 'function' ? condition() : condition;
    const cont = typeof content === 'function' ? content() : content;
    const isDifferent = el.innerHTML !== cont.outerHTML;
    if (cond && isDifferent) {
      el.innerHTML = '';
      el.appendChild(cont);
    }
  };
  states.forEach((state) => state.sub(apply));
  apply();
}

function EventListener(el: HTMLElement, event: string, handler: (e: Event) => void) {
  el.addEventListener(event, handler);
}

function Map(
  el: HTMLElement,
  items: () => any[],
  renderItem: (item: any) => HTMLElement,
  condition: boolean | (() => boolean) = true,
  ...states: StateType<any>[]
) {
  const apply = () => {
    const cond = typeof condition === 'function' ? condition() : condition;
    if (!cond) return;
    el.innerHTML = '';
    items().forEach((item) => {
      const renderedItem = renderItem(item);
      const isDifferent = !el.contains(renderedItem);
      if (isDifferent) el.appendChild(renderedItem);
    });
  };
  states.forEach((state) => state.sub(apply));
  apply();
}

const tmpl = HTML({
  event: EventListener,
  attr: Attr,
  html: InnerHTML,
  map: Map,
});

type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

const todos = State<Todo[]>(
  [
    { id: 1, title: 'Learn TypeScript', completed: true },
    { id: 2, title: 'Build a Todo App', completed: false },
    { id: 3, title: 'Profit!', completed: false },
  ],
  {
    key: 'todos',
    storage: localStorage,
  },
);

function handleClick(id: number) {
  todos.reduce((list) => list.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)));
}

const todoItem = (todo: Todo) =>
  tmpl.li(['attr', 'id', todo.id], ['event', 'click', () => handleClick(todo.id)])(
    todo.completed ? '✓ ' : '✗ ',
    todo.title,
  );

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('root')!;
  root.appendChild(tmpl.ul(['map', todos.$val, todoItem, true, todos])());
});
