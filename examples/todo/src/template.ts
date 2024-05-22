import { HTML, useAttribute, useInnerHTML, useStyle, useTextContent } from '../../../src';
import { todoState } from './state';
import { useTodoDelete, useTodoInput, useTodoSubmit, useTodoToggle } from './traits';

export const html = HTML({
  'style:mobile': useStyle({ state: todoState, mediaMinWidth: 0 }),
  'style:mouseout': useStyle({ event: 'mouseout' }),
  'style:mouseover': useStyle({ event: 'mouseover' }),
  'style:tablet': useStyle({ state: todoState, mediaMinWidth: 768 }),
  'todo:form:onsubmit': useTodoSubmit,
  'todo:innerHTML': useInnerHTML({ state: todoState }),
  'todo:input:oninput': useTodoInput,
  'todo:item:toggle': useTodoToggle,
  'todo:item:delete': useTodoDelete,
  attr: useAttribute(),
  text: useTextContent(),
});
