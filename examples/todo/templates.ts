// ─── Templates ───────────────────────────────────────────────────────────────

import {
  Template,
  useAttributeTrait,
  useClassNameTrait,
  useEventTrait,
  useInnerHTMLTrait,
  useInputEventTrait,
  useInputValueTrait,
  useStyleOnEventTrait,
  useStyleTrait,
  useTextContentTrait,
} from '../../src/registry';

export const [tag, trait] = Template({
  attr: useAttributeTrait,
  cls: useClassNameTrait,
  event: useEventTrait,
  html: useInnerHTMLTrait,
  inputEvent: useInputEventTrait,
  inputVal: useInputValueTrait,
  style: useStyleTrait,
  styleOn: useStyleOnEventTrait,
  text: useTextContentTrait,
});
