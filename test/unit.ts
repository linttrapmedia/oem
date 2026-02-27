import {
  CanAccessStateMethodsInCustomMethods,
  CanCreateState,
  CanSetStateAndPublish,
  CanSubscribeToState,
  CanTestStateValue,
  CanUnSubscribeToState,
  CanUpdateState,
  CanUseCustomMethods,
  CanUseCustomMethodsWithParameters,
  CanUseDeferredCustomMethods,
  CanUseDeferredCustomMethodsWithParameters,
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
import {
  CanAddNewTheme,
  CanCheckCurrentTheme,
  CanCreateThemeState,
  CanGetAllTokens,
  CanGetCurrentTheme,
  CanGetThemeNames,
  CanRemoveTheme,
  CanSelectToken,
  CanSelectTokenAfterThemeSwitch,
  CanSubscribeToThemeChanges,
  CanSwitchTheme,
} from '@/states/ThemeState.test';
import { CanMatchUrlWithVariables } from '@/states/UrlState.test';
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
      '@/core/state',
      CanCreateState,
      CanUpdateState,
      CanSubscribeToState,
      CanUnSubscribeToState,
      CanSetStateAndPublish,
      CanTestStateValue,
      CanUseCustomMethods,
      CanUseCustomMethodsWithParameters,
      CanUseDeferredCustomMethods,
      CanUseDeferredCustomMethodsWithParameters,
      CanAccessStateMethodsInCustomMethods,
    ],
    [
      '@/core/template',
      CanCreateBasicHtmlTagWithText,
      CanCreateBasicSvgTagWithText,
      HasValidHtmlNamespace,
      CanCreateBasicTrait,
      CanApplyMultipleTraitsToHtml,
      CanApplyMultipleTraitsToSvg,
      WillCleanupTraitOnElementRemoval,
    ],
    ['@/traits/Attribute', CanApplyAttributeTraitToHtml, CanApplyAttributeTraitToSvg],
    ['@/traits/ClassName', CanApplyClassNameTraitToHtml, CanApplyClassNameTraitToSvg],
    [
      '@/traits/Event',
      CanApplyEventListenerTraitToHtml,
      CanApplyEventListenerTraitToSvg,
      CanConditionallyApplyEventListenerTraitToHtml,
      CanConditionallyApplyEventListenerTraitToSvg,
      CanRemoveEventListenerFromStateObjectWhenElementIsRemoved,
    ],
    ['@/traits/InnerHTML', CanApplyInnerHTMLTraitToHtml, CanApplyInnerHTMLTraitToSvg],
    [
      '@/traits/Style',
      CanApplyStyleTraitToHtml,
      CanApplyStyleTraitToSvg,
      CanApplyCssVarWithStyleTraitToHtml,
    ],
    [
      '@/traits/StyleOnEvent',
      CanApplyStyleOnEventWithStaticValue,
      CanApplyStyleOnEventWithFunctionValue,
      CanApplyStyleOnEventWithState,
      CanApplyStyleOnEventWithConditionTrue,
      CanApplyStyleOnEventWithConditionFalse,
      CanApplyStyleOnEventWithStateAndCondition,
      CanApplyCssVarOnEvent,
      CanApplyNumericStyleOnEvent,
      CanApplyMultipleStylesOnEvent,
    ],
    ['@/traits/TextContent', CanApplyTextContentTraitToHtml, CanApplyTextContentTraitToSvg],
    ['@/states/MediaQueryState', CanKeepTrackOfMediaQueryState],
    [
      '@/states/ThemeState',
      CanCreateThemeState,
      CanCheckCurrentTheme,
      CanSwitchTheme,
      CanSelectToken,
      CanSelectTokenAfterThemeSwitch,
      CanGetCurrentTheme,
      CanGetAllTokens,
      CanGetThemeNames,
      CanAddNewTheme,
      CanRemoveTheme,
      CanSubscribeToThemeChanges,
    ],
    ['@/states/UrlState', CanMatchUrlWithVariables],
  ];

  await runner(tests);
});
