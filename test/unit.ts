import {
  CanAccessStateMethodsInCustomMethods,
  CanCreateState,
  CanSetStateAndPublish,
  CanSubscribeToState,
  CanTestStateValue,
  CanUnSubscribeToState,
  CanUpdateState,
  CanUseDeferredCustomMethods,
  CanUseDeferredCustomMethodsWithParameters,
  CanUseCustomMethods,
  CanUseCustomMethodsWithParameters,
} from '@/core/state.test';
import {
  CanApplyMultipleTraitsToHtml,
  CanApplyMultipleTraitsToSvg,
  CanCreateBasicHtmlTagWithText,
  CanCreateBasicSvgTagWithText,
  CanCreateBasicTrait,
  HasValidHtmlNamespace,
  WillCleanupTraitOnElementRemoval,
} from '@/core/template.test';
import { Test } from '@/registry';
import { CanKeepTrackOfMediaQueryState } from '@/states/MediaQueryState.test';
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
  CanApplyCssVarOnEvent,
  CanApplyMultipleStylesOnEvent,
  CanApplyNumericStyleOnEvent,
  CanApplyStyleOnEventWithConditionFalse,
  CanApplyStyleOnEventWithConditionTrue,
  CanApplyStyleOnEventWithFunctionValue,
  CanApplyStyleOnEventWithState,
  CanApplyStyleOnEventWithStateAndCondition,
  CanApplyStyleOnEventWithStaticValue,
} from '@/traits/StyleOnEvent.test';
import {
  CanApplyTextContentTraitToHtml,
  CanApplyTextContentTraitToSvg,
} from '@/traits/TextContent.test';
import { runner } from './runner';

window.addEventListener('DOMContentLoaded', async () => {
  const tests: [string, ...Test[]][] = [
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
      CanUseCustomMethods,
      CanUseCustomMethodsWithParameters,
      CanUseDeferredCustomMethods,
      CanUseDeferredCustomMethodsWithParameters,
      CanAccessStateMethodsInCustomMethods,
    ],

    [
      'Trait',
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
      CanApplyStyleOnEventWithStaticValue,
      CanApplyStyleOnEventWithFunctionValue,
      CanApplyStyleOnEventWithState,
      CanApplyStyleOnEventWithConditionTrue,
      CanApplyStyleOnEventWithConditionFalse,
      CanApplyStyleOnEventWithStateAndCondition,
      CanApplyCssVarOnEvent,
      CanApplyNumericStyleOnEvent,
      CanApplyMultipleStylesOnEvent,
      CanApplyCssVarWithStyleTraitToHtml,
      CanApplyTextContentTraitToHtml,
      CanApplyTextContentTraitToSvg,
      CanKeepTrackOfMediaQueryState,
    ],
  ];

  await runner(tests);
});
