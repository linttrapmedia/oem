// templates.ts
import {
  Template,
  useAttributeTrait,
  useClassNameTrait,
  useEventTrait,
  useFocusTrait,
  useInnerHTMLTrait,
  useInputEventTrait,
  useInputValueTrait,
  useStyleOnEventTrait,
  useStyleTrait,
  useTextContentTrait,
} from '../src/registry';

export const [tag, trait] = Template({
  style: useStyleTrait,
  styleOnEvent: useStyleOnEventTrait,
  event: useEventTrait,
  text: useTextContentTrait,
  attr: useAttributeTrait,
  className: useClassNameTrait,
  innerHTML: useInnerHTMLTrait,
  inputValue: useInputValueTrait,
  inputEvent: useInputEventTrait,
  focus: useFocusTrait,
});
