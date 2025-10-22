import { State } from '@/state/State';
import { HTML } from '@/template/HTML';
import { SVG } from '@/template/SVG';
import { Test } from '@/types';
import { useClassName } from './ClassName';

export const CanApplyClassNameTraitToHtml: Test = () => {
  const state = State({ className: 'item--modifier-1' });
  const { div } = HTML({
    'class:static': useClassName(),
    'class:dynamic': useClassName({ state }),
  });

  // static tests
  const e1 = div(['class:static', 'c1'], ['class:static', 'c1'])();
  const t1 = e1.outerHTML === '<div class="c1"></div>';
  const e2 = div(['class:static', 'c1 c2'])();
  const t2 = e2.outerHTML === '<div class="c1 c2"></div>';
  const e3 = div(['class:static', 'c1', false])();
  const t3 = e3.outerHTML === '<div></div>';
  const e4 = div(['class:static', 'c1', true])();
  const t4 = e4.outerHTML === '<div class="c1"></div>';
  const e5 = div(['class:static', 'c1', () => false])();
  const t5 = e5.outerHTML === '<div></div>';
  const e6 = div(['class:static', 'c1', () => true])();
  const t6 = e6.outerHTML === '<div class="c1"></div>';

  // multiple attr tests
  const e7 = div(['class:static', 'c1 c2', true], ['class:static', '', true])();
  const t7 = e7.outerHTML === '<div class=""></div>';

  return { pass: t1 && t2 && t3 && t4 && t5 && t6 && t7 };
};

export const CanApplyClassNameTraitToSvg: Test = () => {
  const { circle } = SVG({ 'class:static': useClassName() });
  const e1 = circle(['class:static', 'c1'])();
  const t1 = e1.outerHTML === '<circle class="c1"></circle>';
  const e2 = circle(['class:static', 'c1 c2'])();
  const t2 = e2.outerHTML === '<circle class="c1 c2"></circle>';
  const e3 = circle(['class:static', 'c1', false])();
  const t3 = e3.outerHTML === '<circle></circle>';
  const e4 = circle(['class:static', 'c1', true])();
  const t4 = e4.outerHTML === '<circle class="c1"></circle>';
  const e5 = circle(['class:static', 'c1', () => false])();
  const t5 = e5.outerHTML === '<circle></circle>';
  const e6 = circle(['class:static', 'c1', () => true])();
  const t6 = e6.outerHTML === '<circle class="c1"></circle>';
  const e7 = circle(['class:static', 'c1 c2', true], ['class:static', '', true])();
  const t7 = e7.outerHTML === '<circle class=""></circle>';
  return { pass: t1 && t2 && t3 && t4 && t5 && t6 && t7 };
};
