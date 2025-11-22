import { State, Template, Test } from '@/oem';
import { useAttributeTrait } from '@/traits/Attribute';
import { useEventTrait } from '@/traits/Event';

export const CanApplyEventListenerTraitToHtml: Test = async () => {
  const [tmpl, trait] = Template({
    event: useEventTrait,
    attr: useAttributeTrait,
  });
  let clicked = false;
  const handleClick: any = () => (clicked = true);
  const e1 = tmpl.div(trait.event('click', handleClick));
  e1.click();
  const t1 = clicked;

  return { pass: t1 };
};

export const CanConditionallyApplyEventListenerTraitToHtml: Test = async () => {
  const toggle = State(true);
  const [tmpl, trait] = Template({
    event: useEventTrait,
  });
  const handleClick: any = () => toggle.set(!toggle.val());
  const e1 = tmpl.div(
    trait.event('click', handleClick, false),
    trait.event('click', handleClick, true),
  );
  e1.click();
  const t1 = toggle.val() === false;
  e1.click();
  const t2 = toggle.val() === true;
  return { pass: t1 && t2 };
};

export const CanApplyEventListenerTraitToSvg: Test = async () => {
  const [tmpl, trait] = Template({
    event: useEventTrait,
  });
  let clicked = false;
  var clickEvent = new MouseEvent('click', {
    view: window,
    bubbles: true,
    cancelable: false,
  });
  const handleClick = () => (clicked = true);
  const e1 = tmpl.circle(trait.event('click', handleClick));
  e1.dispatchEvent(clickEvent);
  const t1 = clicked;
  return { pass: t1 };
};

export const CanConditionallyApplyEventListenerTraitToSvg: Test = async () => {
  const toggle = State(true);
  const [tmpl, trait] = Template({
    event: useEventTrait,
  });
  const clickEvent = new MouseEvent('click', {
    view: window,
    bubbles: true,
    cancelable: false,
  });
  const handleClick: any = () => toggle.set(!toggle.val());

  const e1 = tmpl.circle(
    trait.event('click', handleClick, false),
    trait.event('click', handleClick, true),
  );
  e1.dispatchEvent(clickEvent);
  const t1 = toggle.val() === false;
  e1.dispatchEvent(clickEvent);
  const t2 = toggle.val() === true;
  return { pass: t1 && t2 };
};

export const CanRemoveEventListenerFromStateObjectWhenElementIsRemoved: Test = async (sandbox) => {
  const tests: boolean[] = [];
  const stateObj = State(false);
  const [tmpl, trait] = Template({
    event: useEventTrait,
  });
  const handleClick: any = () => stateObj.set(!stateObj.val());
  const e1 = tmpl.div(trait.event('click', handleClick, true, stateObj), 'Click me');
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
