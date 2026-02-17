/**
 * @file All elements use this template instance for their tags and traits. This eliminates the need for each element to import the Template function and trait hooks, and also ensures that all elements have a consistent set of traits available.
 */

import {
  Template,
  useAttributeTrait,
  useEventTrait,
  useStyleOnEventTrait,
  useStyleTrait,
  useTextContentTrait,
} from '@/registry';

export const [tag, trait] = Template({
  style_on_event: useStyleOnEventTrait,
  style: useStyleTrait,
  event: useEventTrait,
  attr: useAttributeTrait,
  text: useTextContentTrait,
});
