import { HTML, HTML2 } from '@/oem';
import { useAttributeTrait } from '@/traits/Attribute';
import { useEventTrait } from '@/traits/Event';
import { useFocusTrait } from '@/traits/Focus';
import { useInnerHTMLTrait } from '@/traits/InnerHTML';
import { useInputEvent } from '@/traits/InputEvent';
import { useInputValueTrait } from '@/traits/InputValue';
import { useStyleTrait } from '@/traits/Style';

export const tmpl = HTML({
  event: useEventTrait,
  style: useStyleTrait,
  attr: useAttributeTrait,
  focus: useFocusTrait,
  value: useInputValueTrait,
  html: useInnerHTMLTrait,
});

export const [tag, trait] = HTML2({
  event: useEventTrait,
  style: useStyleTrait,
  attr: useAttributeTrait,
  focus: useFocusTrait,
  value: useInputValueTrait,
  input: useInputEvent,
  html: useInnerHTMLTrait,
});
