import {
  CanApplyMultipleTraitsToHtml,
  CanCreateBasicHtmlTagWithText,
  CanCreateBasicTrait,
  HasValidHtmlNamespace,
  WillCleanupTraitOnElementRemoval,
} from '@/HTML.test';
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
import {
  CanApplyCssVarWithStyleTraitToHtml,
  CanApplyStyleTraitToHtml,
  CanApplyStyleTraitToSvg,
} from '@/lib/traits/Style.test';
import { CanApplyTextContentTraitToHtml, CanApplyTextContentTraitToSvg } from '@/lib/traits/TextContent.test';
import {
  CanCreateState,
  CanSetStateAndPublish,
  CanSubscribeToState,
  CanTestStateValue,
  CanUnSubscribeToState,
  CanUpdateState,
} from '@/State.test';
import { CanApplyMultipleTraitsToSvg, CanCreateBasicSvgTagWithText, HasValidSvgNamespace } from '@/SVG.test';
import { runner } from './runner';

window.addEventListener('DOMContentLoaded', async () => {
  await runner([
    [
      'HTML',
      CanApplyMultipleTraitsToHtml,
      CanCreateBasicHtmlTagWithText,
      HasValidHtmlNamespace,
      CanCreateBasicTrait,
      WillCleanupTraitOnElementRemoval,
      CanRemoveEventListenerFromStateObjectWhenElementIsRemoved,
    ],

    ['SVG', CanApplyMultipleTraitsToSvg, CanCreateBasicSvgTagWithText, HasValidSvgNamespace],
    [
      'State',
      CanCreateState,
      CanUpdateState,
      CanSubscribeToState,
      CanUnSubscribeToState,
      CanRemoveEventListenerFromStateObjectWhenElementIsRemoved,
      CanSetStateAndPublish,
      CanTestStateValue,
    ],

    [
      'Lib',
      CanApplyAttributeTraitToHtml,
      CanApplyAttributeTraitToSvg,
      CanApplyClassNameTraitToHtml,
      CanApplyClassNameTraitToSvg,
      CanApplyEventListenerTraitToHtml,
      CanConditionallyApplyEventListenerTraitToHtml,
      CanApplyEventListenerTraitToSvg,
      CanConditionallyApplyEventListenerTraitToSvg,
      CanRemoveEventListenerFromStateObjectWhenElementIsRemoved,
      CanApplyInnerHTMLTraitToHtml,
      CanApplyInnerHTMLTraitToSvg,
      CanApplyStyleTraitToHtml,
      CanApplyStyleTraitToSvg,
      CanApplyCssVarWithStyleTraitToHtml,
      CanApplyTextContentTraitToHtml,
      CanApplyTextContentTraitToSvg,
      CanKeepTrackOfMediaQueryState,
    ],
  ]);
});
