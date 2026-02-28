// templates.ts
import {
  Template,
  useAnimationTrait,
  useAriaTrait,
  useAttributeTrait,
  useClassNameTrait,
  useDataAttributeTrait,
  useEventTrait,
  useFocusTrait,
  useInnerHTMLTrait,
  useInputEventTrait,
  useInputValueTrait,
  useStyleOnEventTrait,
  useStyleTrait,
  useTextContentTrait,
} from '../../src/registry';

export const [tag, trait] = Template({
  animate: useAnimationTrait,
  aria: useAriaTrait,
  attr: useAttributeTrait,
  className: useClassNameTrait,
  data: useDataAttributeTrait,
  event: useEventTrait,
  focus: useFocusTrait,
  innerHTML: useInnerHTMLTrait,
  inputEvent: useInputEventTrait,
  inputValue: useInputValueTrait,
  style: useStyleTrait,
  styleOnEvent: useStyleOnEventTrait,
  text: useTextContentTrait,
});
