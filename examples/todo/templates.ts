import { Template } from '@/core/template';
import { useAttributeTrait } from '@/traits/Attribute';
import { useClassNameTrait } from '@/traits/ClassName';
import { useEventTrait } from '@/traits/Event';
import { useInnerHTMLTrait } from '@/traits/InnerHTML';
import { useInputEventTrait } from '@/traits/InputEvent';
import { useInputValueTrait } from '@/traits/InputValue';
import { useStyleTrait } from '@/traits/Style';
import { useStyleOnEventTrait } from '@/traits/StyleOnEvent';
import { useTextContentTrait } from '@/traits/TextContent';

export const [tag, trait] = Template({
  attr: useAttributeTrait,
  className: useClassNameTrait,
  event: useEventTrait,
  html: useInnerHTMLTrait,
  inputEvent: useInputEventTrait,
  inputValue: useInputValueTrait,
  style: useStyleTrait,
  styleOnEvent: useStyleOnEventTrait,
  text: useTextContentTrait,
});
