import * as state from '../src/state/State.test';
import * as html from '../src/template/HTML.test';
import * as svg from '../src/template/SVG.test';
import { runner } from './runner';

window.addEventListener('DOMContentLoaded', () => {
  runner([
    [
      'HTML',
      ['can apply inner html trait', html.CanApplyInnerHTMLTraitToHtml],
      ['can apply attribute trait', html.CanApplyAttributeTraitToHtml],
      ['can apply class name trait', html.CanApplyClassNameTraitToHtml],
      ['can apply event listener trait', html.CanApplyEventListenerTraitToHtml],
      ['can conditionally apply event listener trait', html.CanConditionallyApplyEventListenerTraitToHtml],
      ['can apply inner html trait', html.CanApplyInnerHTMLTraitToHtml],
      ['can apply inner text trait', html.CanApplyTextContentTraitToHtml],
      ['can apply style trait', html.CanApplyStyleTraitToHtml],
      ['can apply css var with style trait', html.CanApplyCssVarWithStyleTraitToHtml],
      ['can apply multiple traits', html.CanApplyMultipleTraitsToHtml],
      ['can create basic tag with text', html.CanCreateBasicHtmlTagWithText],
      ['has valid namespace', html.HasValidHtmlNamespace],
      ['can adopt existing element', html.CanAdoptElement],
    ],
    [
      'SVG',
      ['can apply inner html trait', svg.CanApplyInnerHTMLTraitToHtml],
      ['can apply attribute trait', svg.CanApplyAttributeTraitToHtml],
      ['can apply class name trait', svg.CanApplyClassNameTraitToHtml],
      ['can apply event listener trait', svg.CanApplyEventListenerTraitToHtml],
      ['can conditionally apply event listener trait', svg.CanConditionallyApplyEventListenerTraitToHtml],
      ['can apply inner text trait', svg.CanApplyInnerTextTraitToHtml],
      ['can apply style trait', svg.CanApplyStyleTraitToHtml],
      ['can apply multiple traits', svg.CanApplyMultipleTraitsToHtml],
      ['can create basic tag with text', svg.CanCreateBasicHtmlTagWithText],
      ['has valid namespace', svg.HasValidHtmlNamespace],
      ['can adopt existing element', svg.CanAdoptElement],
    ],
    [
      'State',
      ['can create state', state.CanCreateState],
      ['can update state', state.CanUpdateState],
      ['can subscribe to state', state.CanSubscribeToState],
      ['can unsubscribe to state', state.CanUnSubscribeToState],
      ['can reset state', state.CanSubscribeToState],
      ['can set state and publish', state.CanSetStateAndPublish],
    ],
  ]);
});
