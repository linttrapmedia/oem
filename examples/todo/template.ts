import { HTML } from '@/HTML';
import { useAttributeTrait } from '@/lib/traits/Attribute';
import { useEventTrait } from '@/lib/traits/Event';
import { useFocusTrait } from '@/lib/traits/Focus';
import { useInputValueTrait } from '@/lib/traits/InputValue';
import { useMapTrait } from '@/lib/traits/Map';
import { useStyleTrait } from '@/lib/traits/Style';

export const tmpl = HTML({
  event: useEventTrait,
  style: useStyleTrait,
  map: useMapTrait,
  attr: useAttributeTrait,
  focus: useFocusTrait,
  value: useInputValueTrait,
});
