import * as html from '../src/html/HTML.test';
import * as svg from '../src/html/SVG.test';
import * as state from '../src/state/State.test';
import { runner } from './runner';

window.addEventListener('DOMContentLoaded', () => {
  runner([
    [
      'HTML',
      ['can apply attribute trait', html.CanApplyAttributeTraitToHtml],
      ['can remove attribute trait', html.CanRemoveAttributeTraitToHtml],
      ['can apply class name trait', html.CanApplyClassNameTraitToHtml],
      ['can apply event listener trait', html.CanApplyEventListenerTraitToHtml],
      ['can apply inner html trait', html.CanApplyInnerHTMLTraitToHtml],
      ['can apply inner text trait', html.CanApplyInnerTextTraitToHtml],
      ['can apply print style trait', html.CanApplyPrintStyleTraitToHtml],
      ['can apply style trait', html.CanApplyStyleTraitToHtml],
      ['can apply multiple traits', html.CanApplyMultipleTraitsToHtml],
      ['can create basic tag with text', html.CanCreateBasicHtmlTagWithText],
      ['has valid namespace', html.HasValidHtmlNamespace],
      ['can adopt existing element', html.CanAdoptElement],
    ],
    [
      'SVG',
      ['can apply attribute trait', svg.CanApplyAttributeTraitToHtml],
      ['can apply class name trait', svg.CanApplyClassNameTraitToHtml],
      ['can apply event listener trait', svg.CanApplyEventListenerTraitToHtml],
      ['can apply inner text trait', svg.CanApplyInnerTextTraitToHtml],
      ['can apply print style trait', svg.CanApplyPrintStyleTraitToHtml],
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
    ],
  ]);
});
