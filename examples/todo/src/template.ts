import { HTML } from '../../../src';
import { useEvent } from '../../../src/traits/Event';
import { useInnerHTMLTrait } from '../../../src/traits/InnerHTML';
import { useStyleTrait } from '../../../src/traits/Style';
import { useTextContentTrait } from '../../../src/traits/TextContent';
import { state } from './state';
import { useTodoDelete, useTodoInput, useTodoSubmit, useTodoToggle } from './traits';

export const html = HTML({
  'style:mobile': useStyleTrait({ state: state.todoList, mediaMinWidth: 0 }),
  'style:mouseout': useStyleTrait({ event: 'mouseout' }),
  'style:mouseover': useStyleTrait({ event: 'mouseover' }),
  'style:tablet': useStyleTrait({ state: state.todoList, mediaMinWidth: 768 }),
  'text:mouseout': useTextContentTrait({ event: 'mouseout' }),
  'text:mouseover': useTextContentTrait({ event: 'mouseover' }),
  'todo__form__input:oninput': useTodoInput,
  'todo__form:onsubmit': useTodoSubmit,
  'todo__item:ondelete': useTodoDelete,
  'todo__item:onmouseout': useEvent({ event: 'mouseout' }),
  'todo__item:onmouseover': useEvent({ event: 'mouseover' }),
  'todo__item:ontoggle': useTodoToggle,
  'todo__item:text': useTextContentTrait({ state: state.todoItemHovered }),
  'todo__list:html': useInnerHTMLTrait({ state: state.todoList }),
  attr: useAttribute(),
  text: useTextContentTrait(),
});
