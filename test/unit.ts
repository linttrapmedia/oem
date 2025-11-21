import {
  CanApplyMultipleTraitsToHtml,
  CanApplyMultipleTraitsToSvg,
  CanCreateBasicHtmlTagWithText,
  CanCreateBasicSvgTagWithText,
  CanCreateBasicTrait,
  CanCreateState,
  CanSetStateAndPublish,
  CanSubscribeToState,
  CanTestStateValue,
  CanUnSubscribeToState,
  CanUpdateState,
  HasValidHtmlNamespace,
  WillCleanupTraitOnElementRemoval,
} from '@/oem.test';
import { CanKeepTrackOfMediaQueryState } from '@/states/MediaQuery.test';
import { CanApplyAttributeTraitToHtml, CanApplyAttributeTraitToSvg } from '@/traits/Attribute.test';
import { CanApplyClassNameTraitToHtml, CanApplyClassNameTraitToSvg } from '@/traits/ClassName.test';
import {
  CanApplyEventListenerTraitToHtml,
  CanApplyEventListenerTraitToSvg,
  CanConditionallyApplyEventListenerTraitToHtml,
  CanConditionallyApplyEventListenerTraitToSvg,
  CanRemoveEventListenerFromStateObjectWhenElementIsRemoved,
} from '@/traits/Event.test';
import { CanApplyInnerHTMLTraitToHtml, CanApplyInnerHTMLTraitToSvg } from '@/traits/InnerHTML.test';
import {
  CanApplyCssVarWithStyleTraitToHtml,
  CanApplyStyleTraitToHtml,
  CanApplyStyleTraitToSvg,
} from '@/traits/Style.test';
import {
  CanApplyTextContentTraitToHtml,
  CanApplyTextContentTraitToSvg,
} from '@/traits/TextContent.test';
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

    ['SVG', CanApplyMultipleTraitsToSvg, CanCreateBasicSvgTagWithText],
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
