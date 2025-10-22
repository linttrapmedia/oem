import { State } from '@/state/State';
import { HTML } from '@/template/HTML';
import { SVG } from '@/template/SVG';
import { Test } from '@/types';
import { useAttribute } from './Attribute';

export const CanApplyAttributeTraitToHtml: Test = () => {
  const disabled = State(false);
  const { div } = HTML({
    staticAttr: useAttribute(),
    dynamicAttr: useAttribute({ state: disabled }),
  });

  // static tests
  const e1 = div(['staticAttr', 'id', 'test'])();
  const t1 = e1.outerHTML === '<div id="test"></div>';
  const e2 = div(['staticAttr', 'disabled', 'true'])();
  const t2 = e2.outerHTML === '<div disabled="true"></div>';

  // dynamic tests
  disabled.set(true);
  const e5 = div(['dynamicAttr', 'disabled', disabled.$val])();
  const t5 = e5.outerHTML === '<div disabled="true"></div>';

  disabled.set(false);
  const e6 = div(['dynamicAttr', 'disabled', disabled.$val])();
  const t6 = e6.outerHTML === '<div disabled="false"></div>';

  // condition tests
  disabled.set(true);
  const e7 = div(['dynamicAttr', 'disabled', 'true', disabled.$val])();
  const t7 = e7.outerHTML === '<div disabled="true"></div>';

  disabled.set(false);
  const e8 = div(['dynamicAttr', 'disabled', 'true', disabled.$val])();
  const t8 = e8.outerHTML === '<div></div>';

  return { pass: t1 && t2 && t5 && t6 && t7 && t8 };
};

export const CanApplyAttributeTraitToSvg: Test = () => {
  const { circle } = SVG({
    attr: useAttribute(),
  });
  const e1 = circle(['attr', 'id', 'test'])();
  const t1 = e1.outerHTML === '<circle id="test"></circle>';
  return { pass: t1 };
};
