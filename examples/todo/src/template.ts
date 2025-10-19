import { HTML } from '../../../src';
import { useAttribute } from '../../../src/traits/Attribute';
import { useEvent } from '../../../src/traits/Event';
import { useInnerHTML } from '../../../src/traits/InnerHTML';
import { useStyle } from '../../../src/traits/Style';
import { useTextContent } from '../../../src/traits/TextContent';
import { state } from './state';
import { useTodoDelete, useTodoInput, useTodoSubmit, useTodoToggle } from './traits';

export const html = HTML({
  'style:mobile': useStyle({ state: state.todoList, mediaMinWidth: 0 }),
  'style:mouseout': useStyle({ event: 'mouseout' }),
  'style:mouseover': useStyle({ event: 'mouseover' }),
  'style:tablet': useStyle({ state: state.todoList, mediaMinWidth: 768 }),
  'text:mouseout': useTextContent({ event: 'mouseout' }),
  'text:mouseover': useTextContent({ event: 'mouseover' }),
  'todo__form__input:oninput': useTodoInput,
  'todo__form:onsubmit': useTodoSubmit,
  'todo__item:ondelete': useTodoDelete,
  'todo__item:onmouseout': useEvent({ event: 'mouseout' }),
  'todo__item:onmouseover': useEvent({ event: 'mouseover' }),
  'todo__item:ontoggle': useTodoToggle,
  'todo__item:text': useTextContent({ state: state.todoItemHovered }),
  'todo__list:html': useInnerHTML({ state: state.todoList }),
  attr: useAttribute(),
  text: useTextContent(),
});
