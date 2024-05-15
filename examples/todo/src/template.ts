import { HTML, useAttribute, useInnerHTML, useStyle, useTextContent } from '../../../src';
import { todoState } from './state';
import { useTodoInput, useTodoSubmit, useTodoToggle } from './traits';

export const html = HTML({
  'style:mobile': useStyle({ state: todoState, mediaMinWidth: 0 }),
  'style:tablet': useStyle({ state: todoState, mediaMinWidth: 768 }),
  'todo:form:onsubmit': useTodoSubmit,
  'todo:innerHTML': useInnerHTML({ state: todoState }),
  'todo:input:oninput': useTodoInput,
  'todo:item:onclick': useTodoToggle,
  attr: useAttribute(),
  text: useTextContent(),
});
