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
import { CanApplyAttributeTraitToHtml, CanApplyAttributeTraitToSvg } from '../src/traits/Attribute.test';
import { CanApplyClassNameTraitToHtml, CanApplyClassNameTraitToSvg } from '../src/traits/ClassName.test';
import {
  CanApplyEventListenerTraitToHtml,
  CanApplyEventListenerTraitToSvg,
  CanConditionallyApplyEventListenerTraitToHtml,
  CanConditionallyApplyEventListenerTraitToSvg,
} from '../src/traits/Event.test';
import { CanApplyInnerHTMLTraitToHtml, CanApplyInnerHTMLTraitToSvg } from '../src/traits/InnerHTML.test';
import {
  CanApplyCssVarWithStyleTraitToHtml,
  CanApplyStyleTraitToHtml,
  CanApplyStyleTraitToSvg,
} from '../src/traits/Style.test';
import { CanApplyTextContentTraitToHtml, CanApplyTextContentTraitToSvg } from '../src/traits/TextContent.test';
import { runner } from './runner';

window.addEventListener('DOMContentLoaded', () => {
  runner([
    [
      'HTML',
      ['can apply attribute trait', CanApplyAttributeTraitToHtml],
      ['can apply class name trait', CanApplyClassNameTraitToHtml],
      ['can apply event listener trait', CanApplyEventListenerTraitToHtml],
      ['can conditionally apply event listener trait', CanConditionallyApplyEventListenerTraitToHtml],
      ['can apply inner html trait', CanApplyInnerHTMLTraitToHtml],
      ['can apply text content trait', CanApplyTextContentTraitToHtml],
      ['can apply style trait', CanApplyStyleTraitToHtml],
      ['can apply css var with style trait', CanApplyCssVarWithStyleTraitToHtml],
      ['can apply multiple traits', CanApplyMultipleTraitsToHtml],
      ['can create basic tag with text', CanCreateBasicHtmlTagWithText],
      ['has valid namespace', HasValidHtmlNamespace],
    ],
    [
      'SVG',
      ['can apply inner html trait', CanApplyInnerHTMLTraitToSvg],
      ['can apply attribute trait', CanApplyAttributeTraitToSvg],
      ['can apply class name trait', CanApplyClassNameTraitToSvg],
      ['can apply event listener trait', CanApplyEventListenerTraitToSvg],
      ['can conditionally apply event listener trait', CanConditionallyApplyEventListenerTraitToSvg],
      ['can apply text content trait', CanApplyTextContentTraitToSvg],
      ['can apply style trait', CanApplyStyleTraitToSvg],
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
