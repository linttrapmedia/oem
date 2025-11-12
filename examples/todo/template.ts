import { HTML } from '@/oem';
import { useAttributeTrait } from '@/traits/Attribute';
import { useEventTrait } from '@/traits/Event';
import { useFocusTrait } from '@/traits/Focus';
import { useInnerHTMLTrait } from '@/traits/InnerHTML';
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
