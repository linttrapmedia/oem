import { CanMapListOfElements } from '@/factory/traits/Map.test';
import { CanApplyAttributeTraitToHtml, CanApplyAttributeTraitToSvg } from '../src/factory/traits/Attribute.test';
import { CanApplyClassNameTraitToHtml, CanApplyClassNameTraitToSvg } from '../src/factory/traits/ClassName.test';
import {
  CanApplyEventListenerTraitToHtml,
  CanApplyEventListenerTraitToSvg,
  CanConditionallyApplyEventListenerTraitToHtml,
  CanConditionallyApplyEventListenerTraitToSvg,
} from '../src/factory/traits/Event.test';
import { CanApplyInnerHTMLTraitToHtml, CanApplyInnerHTMLTraitToSvg } from '../src/factory/traits/InnerHTML.test';
import {
  CanApplyCssVarWithStyleTraitToHtml,
  CanApplyStyleTraitToHtml,
  CanApplyStyleTraitToSvg,
} from '../src/factory/traits/Style.test';
import { CanApplyTextContentTraitToHtml, CanApplyTextContentTraitToSvg } from '../src/factory/traits/TextContent.test';
import * as state from '../src/state/State.test';
import {
  CanApplyMultipleTraitsToHtml,
  CanCreateBasicHtmlTagWithText,
  HasValidHtmlNamespace,
} from '../src/template/HTML.test';
import {
  CanApplyMultipleTraitsToSvg,
  CanCreateBasicSvgTagWithText,
  HasValidSvgNamespace,
} from '../src/template/SVG.test';
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
      'useAttribute',
      ['can apply attribute trait to html', CanApplyAttributeTraitToHtml],
      ['can apply attribute trait to svg', CanApplyAttributeTraitToSvg],
    ],
    [
      'useClassName',
      ['can apply class name trait to html', CanApplyClassNameTraitToHtml],
      ['can apply class name trait to svg', CanApplyClassNameTraitToSvg],
    ],
    [
      'useEventListener',
      ['can apply event listener trait to html', CanApplyEventListenerTraitToHtml],
      ['can conditionally apply event listener trait to html', CanConditionallyApplyEventListenerTraitToHtml],
      ['can apply event listener trait to svg', CanApplyEventListenerTraitToSvg],
      ['can conditionally apply event listener trait to svg', CanConditionallyApplyEventListenerTraitToSvg],
    ],
    [
      'useInnerHTML',
      ['can apply inner html trait to html', CanApplyInnerHTMLTraitToHtml],
      ['can apply inner html trait to svg', CanApplyInnerHTMLTraitToSvg],
    ],
    ['useMap', ['can map list of elements', CanMapListOfElements]],
    [
      'useStyle',
      ['can apply style trait to html', CanApplyStyleTraitToHtml],
      ['can apply style trait to svg', CanApplyStyleTraitToSvg],
      ['can apply css var with style trait to html', CanApplyCssVarWithStyleTraitToHtml],
    ],
    [
      'useTextContent',
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
  ]);
});
