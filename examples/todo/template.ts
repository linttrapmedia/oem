import { HTML } from '@/HTML';
import { useAttributeTrait } from '@/lib/traits/Attribute';
import { useEventTrait } from '@/lib/traits/Event';
import { useFocusTrait } from '@/lib/traits/Focus';
import { useInnerHTMLTrait } from '@/lib/traits/InnerHTML';
import { useInputValueTrait } from '@/lib/traits/InputValue';
import { useStyleTrait } from '@/lib/traits/Style';

export const tmpl = HTML({
  event: useEventTrait,
  style: useStyleTrait,
  attr: useAttributeTrait,
  focus: useFocusTrait,
  value: useInputValueTrait,
  html: useInnerHTMLTrait,
});
