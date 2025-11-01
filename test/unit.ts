import { CanApplyMultipleTraitsToHtml, CanCreateBasicHtmlTagWithText, HasValidHtmlNamespace } from '@/HTML.test';
import { CanKeepTrackOfMediaQueryState } from '@/lib/states/MediaQuery.test';
import { CanApplyAttributeTraitToHtml, CanApplyAttributeTraitToSvg } from '@/lib/traits/Attribute.test';
import { CanApplyClassNameTraitToHtml, CanApplyClassNameTraitToSvg } from '@/lib/traits/ClassName.test';
import {
  CanApplyEventListenerTraitToHtml,
  CanApplyEventListenerTraitToSvg,
  CanConditionallyApplyEventListenerTraitToHtml,
  CanConditionallyApplyEventListenerTraitToSvg,
  CanRemoveEventListenerFromStateObjectWhenElementIsRemoved,
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
import { CanCreateBasicTrait } from '@/Trait.test';
import { runner } from './runner';

window.addEventListener('DOMContentLoaded', async () => {
  await runner([
    [
      'HTML',
      ['can apply multiple traits', CanApplyMultipleTraitsToHtml],
      ['can create basic tag with text', CanCreateBasicHtmlTagWithText],
      ['has valid namespace', HasValidHtmlNamespace],
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
    [
      'Trait',
      ['can create basic trait', CanCreateBasicTrait],
      ['will cleanup trait on element removal', CanCreateBasicTrait],
      [
        'can remove event listener from state object when element is removed',
        CanRemoveEventListenerFromStateObjectWhenElementIsRemoved,
      ],
    ],
    [
      'Lib',
      ['useAttributeTrait can apply attribute trait to html', CanApplyAttributeTraitToHtml],
      ['useAttributeTrait can apply attribute trait to svg', CanApplyAttributeTraitToSvg],
      ['useClassNameTrait can apply class name trait to html', CanApplyClassNameTraitToHtml],
      ['useClassNameTrait can apply class name trait to svg', CanApplyClassNameTraitToSvg],
      ['useEventListenerTrait can apply event listener trait to html', CanApplyEventListenerTraitToHtml],
      [
        'useEventListenerTrait can conditionally apply event listener trait to html',
        CanConditionallyApplyEventListenerTraitToHtml,
      ],
      ['useEventListenerTrait can apply event listener trait to svg', CanApplyEventListenerTraitToSvg],
      [
        'useEventListenerTrait can conditionally apply event listener trait to svg',
        CanConditionallyApplyEventListenerTraitToSvg,
      ],
      ['useInnerHTMLTrait can apply inner html trait to html', CanApplyInnerHTMLTraitToHtml],
      ['useInnerHTMLTrait can apply inner html trait to svg', CanApplyInnerHTMLTraitToSvg],
      ['useMapTrait can map list of elements', CanMapListOfElements],
      ['useStyleTrait can apply style trait to html', CanApplyStyleTraitToHtml],
      ['useStyleTrait can apply style trait to svg', CanApplyStyleTraitToSvg],
      ['useStyleTrait can apply css var with style trait to html', CanApplyCssVarWithStyleTraitToHtml],
      ['useTextContentTrait can apply text content trait to html', CanApplyTextContentTraitToHtml],
      ['useTextContentTrait can apply text content trait to svg', CanApplyTextContentTraitToSvg],
      ['useMediaQueryState can create media query state', CanKeepTrackOfMediaQueryState],
    ],
  ]);
});
