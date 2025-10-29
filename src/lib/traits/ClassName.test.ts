import { HTML } from '@/HTML';
import { SVG } from '@/SVG';
import { Test } from '@/types';
import { useClassNameTrait } from './ClassName';

export const CanApplyClassNameTraitToHtml: Test = () => {
  const { div } = HTML({
    classname: useClassNameTrait,
  });

  // static tests
  const e1 = div(['classname', 'c1'], ['classname', 'c1'])();
  const t1 = e1.outerHTML === '<div class="c1"></div>';
  const e2 = div(['classname', 'c1 c2'])();
  const t2 = e2.outerHTML === '<div class="c1 c2"></div>';
  const e3 = div(['classname', 'c1', false])();
  const t3 = e3.outerHTML === '<div></div>';
  const e4 = div(['classname', 'c1', true])();
  const t4 = e4.outerHTML === '<div class="c1"></div>';
  const e5 = div(['classname', 'c1', () => false])();
  const t5 = e5.outerHTML === '<div></div>';
  const e6 = div(['classname', 'c1', () => true])();
  const t6 = e6.outerHTML === '<div class="c1"></div>';

  // multiple attr tests
  const e7 = div(['classname', 'c1 c2', true], ['classname', '', true])();
  const t7 = e7.outerHTML === '<div class=""></div>';

  return { pass: t1 && t2 && t3 && t4 && t5 && t6 && t7 };
};

export const CanApplyClassNameTraitToSvg: Test = () => {
  const { circle } = SVG({ classname: useClassNameTrait });
  const e1 = circle(['classname', 'c1'])();
  const t1 = e1.outerHTML === '<circle class="c1"></circle>';
  const e2 = circle(['classname', 'c1 c2'])();
  const t2 = e2.outerHTML === '<circle class="c1 c2"></circle>';
  const e3 = circle(['classname', 'c1', false])();
  const t3 = e3.outerHTML === '<circle></circle>';
  const e4 = circle(['classname', 'c1', true])();
  const t4 = e4.outerHTML === '<circle class="c1"></circle>';
  const e5 = circle(['classname', 'c1', () => false])();
  const t5 = e5.outerHTML === '<circle></circle>';
  const e6 = circle(['classname', 'c1', () => true])();
  const t6 = e6.outerHTML === '<circle class="c1"></circle>';
  const e7 = circle(['classname', 'c1 c2', true], ['classname', '', true])();
  const t7 = e7.outerHTML === '<circle class=""></circle>';
  const tests = [t1, t2, t3, t4, t5, t6, t7];
  return { pass: tests.every(Boolean) };
};
