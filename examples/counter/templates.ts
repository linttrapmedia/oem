// --- Template Setup ---

import {
  Template,
  useAttributeTrait,
  useEventTrait,
  useInnerHTMLTrait,
  useStyleTrait,
  useTextContentTrait,
} from '@/registry';
import { useChildrenTrait, useSubmitOnEnterTrait } from './traits';

export const [tag, trait] = Template({
  attr: useAttributeTrait,
  event: useEventTrait,
  html: useInnerHTMLTrait,
  style: useStyleTrait,
  text: useTextContentTrait,
  children: useChildrenTrait,
  submitOnEnter: useSubmitOnEnterTrait,
});
