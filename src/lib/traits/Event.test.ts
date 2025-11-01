import { HTML } from '@/HTML';
import { useAttributeTrait } from '@/lib/traits/Attribute';
import { useEventTrait } from '@/lib/traits/Event';
import { State } from '@/State';
import { SVG } from '@/SVG';
import { Test } from '@/types';

export const CanApplyEventListenerTraitToHtml: Test = async () => {
  const { div } = HTML({
    event: useEventTrait,
    attr: useAttributeTrait,
  });
  let clicked = false;
  const handleClick: any = () => (clicked = true);
  const e1 = div(['event', 'click', handleClick])();
  e1.click();
  const t1 = clicked;

  return { pass: t1 };
};

export const CanConditionallyApplyEventListenerTraitToHtml: Test = async () => {
  const toggle = State(true);
  const { div } = HTML({
    event: useEventTrait,
  });
  const handleClick: any = () => toggle.set(!toggle.val());
  const e1 = div(['event', 'click', handleClick, false], ['event', 'click', handleClick, true])();
  e1.click();
  const t1 = toggle.val() === false;
  e1.click();
  const t2 = toggle.val() === true;
  return { pass: t1 && t2 };
};

export const CanApplyEventListenerTraitToSvg: Test = async () => {
  const { circle } = SVG({
    event: useEventTrait,
  });
  let clicked = false;
  var clickEvent = new MouseEvent('click', {
    view: window,
    bubbles: true,
    cancelable: false,
  });
  const handleClick = () => (clicked = true);
  const e1 = circle(['event', 'click', handleClick])();
  e1.dispatchEvent(clickEvent);
  const t1 = clicked;
  return { pass: t1 };
};

export const CanConditionallyApplyEventListenerTraitToSvg: Test = async () => {
  const toggle = State(true);
  const { circle } = SVG({
    event: useEventTrait,
  });
  const clickEvent = new MouseEvent('click', {
    view: window,
    bubbles: true,
    cancelable: false,
  });
  const handleClick: any = () => toggle.set(!toggle.val());

  const e1 = circle(['event', 'click', handleClick, false], ['event', 'click', handleClick, true])();
  e1.dispatchEvent(clickEvent);
  const t1 = toggle.val() === false;
  e1.dispatchEvent(clickEvent);
  const t2 = toggle.val() === true;
  return { pass: t1 && t2 };
};

export const CanRemoveEventListenerFromStateObjectWhenElementIsRemoved: Test = async (sandbox) => {
  const tests: boolean[] = [];
  const stateObj = State(false);
  const { div } = HTML({
    event: useEventTrait,
  });
  const handleClick: any = () => stateObj.set(!stateObj.val());
  const e1 = div(['event', 'click', handleClick, true, stateObj])('Click me');
  sandbox?.append(e1);
  e1.click();
  tests.push(stateObj.val() === true);

  // Now remove the element, which should remove the event listener from the state object
  e1.remove();

  // wait a tick to allow MutationObserver to process
  await Promise.resolve();

  // now check if the _subs set is empty
  tests.push(stateObj._subs.size === 0);

  return { pass: tests.every(Boolean) };
};
