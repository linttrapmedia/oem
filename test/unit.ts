import { CanApplyMultipleTraitsToHtml, CanCreateBasicHtmlTagWithText, HasValidHtmlNamespace } from '@/HTML.test';
import { CanKeepTrackOfMediaQueryState } from '@/lib/states/MediaQuery.test';
import { CanApplyAttributeTraitToHtml, CanApplyAttributeTraitToSvg } from '@/lib/traits/Attribute.test';
import { CanApplyClassNameTraitToHtml, CanApplyClassNameTraitToSvg } from '@/lib/traits/ClassName.test';
import {
  CanApplyEventListenerTraitToHtml,
  CanApplyEventListenerTraitToSvg,
  CanConditionallyApplyEventListenerTraitToHtml,
  CanConditionallyApplyEventListenerTraitToSvg,
} from '@/lib/traits/Event.test';
import { CanApplyInnerHTMLTraitToHtml, CanApplyInnerHTMLTraitToSvg } from '@/lib/traits/InnerHTML.test';
import { CanMapListOfElements } from '@/lib/traits/Map.test';
import {
  CanApplyCssVarWithStyleTraitToHtml,
  CanApplyStyleTraitToHtml,
  CanApplyStyleTraitToSvg,
} from '@/lib/traits/Style.test';
import { CanApplyTextContentTraitToHtml, CanApplyTextContentTraitToSvg } from '@/lib/traits/TextContent.test';
import * as state from '@/State.test';
import { CanApplyMultipleTraitsToSvg, CanCreateBasicSvgTagWithText, HasValidSvgNamespace } from '@/SVG.test';
import { runner } from './runner';

window.addEventListener('DOMContentLoaded', () => {
  runner([
    [
      'HTML',
      ['can apply multiple traits', CanApplyMultipleTraitsToHtml],
      ['can create basic tag with text', CanCreateBasicHtmlTagWithText],
      ['has valid namespace', HasValidHtmlNamespace],
    ],
    [
      'Trait - useAttributeTrait',
      ['can apply attribute trait to html', CanApplyAttributeTraitToHtml],
      ['can apply attribute trait to svg', CanApplyAttributeTraitToSvg],
    ],
    [
      'Trait - useClassName',
      ['can apply class name trait to html', CanApplyClassNameTraitToHtml],
      ['can apply class name trait to svg', CanApplyClassNameTraitToSvg],
    ],
    [
      'Trait - useEventListenerTrait',
      ['can apply event listener trait to html', CanApplyEventListenerTraitToHtml],
      ['can conditionally apply event listener trait to html', CanConditionallyApplyEventListenerTraitToHtml],
      ['can apply event listener trait to svg', CanApplyEventListenerTraitToSvg],
      ['can conditionally apply event listener trait to svg', CanConditionallyApplyEventListenerTraitToSvg],
    ],
    [
      'Trait - useInnerHTMLTrait',
      ['can apply inner html trait to html', CanApplyInnerHTMLTraitToHtml],
      ['can apply inner html trait to svg', CanApplyInnerHTMLTraitToSvg],
    ],
    ['Trait - useMapTrait', ['can map list of elements', CanMapListOfElements]],
    [
      'Trait - useStyleTrait',
      ['can apply style trait to html', CanApplyStyleTraitToHtml],
      ['can apply style trait to svg', CanApplyStyleTraitToSvg],
      ['can apply css var with style trait to html', CanApplyCssVarWithStyleTraitToHtml],
    ],
    [
      'Trait - useTextContentTrait',
      ['can apply text content trait to html', CanApplyTextContentTraitToHtml],
      ['can apply text content trait to svg', CanApplyTextContentTraitToSvg],
    ],
    [
      'SVG',
      ['can apply multiple traits', CanApplyMultipleTraitsToSvg],
      ['can create basic tag with text', CanCreateBasicSvgTagWithText],
      ['has valid namespace', HasValidSvgNamespace],
    ],
    [
      'State',
      ['can create state', state.CanCreateState],
      ['can update state', state.CanUpdateState],
      ['can subscribe to state', state.CanSubscribeToState],
      ['can unsubscribe to state', state.CanUnSubscribeToState],
      ['can reset state', state.CanSubscribeToState],
      ['can set state and publish', state.CanSetStateAndPublish],
      ['can test state value', state.CanTestStateValue],
    ],
    ['State - useMediaQueryState', ['can create media query state', CanKeepTrackOfMediaQueryState]],
  ]);
});
