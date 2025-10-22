import { State } from '../state/State';
import { HTML } from '../template/HTML';
import { SVG } from '../template/SVG';
import { Test } from '../types';
import { useEvent } from './Event';

export const CanApplyEventListenerTraitToHtml: Test = () => {
  const { div } = HTML({
    click: useEvent({ event: 'click' }),
  });
  let clicked = false;
  const handleClick: any = () => (clicked = true);
  const e1 = div(['click', handleClick])();
  e1.click();
  const t1 = clicked;

  return { pass: t1 };
};

export const CanConditionallyApplyEventListenerTraitToHtml: Test = () => {
  const toggle = State(true);
  const { div } = HTML({
    click: useEvent({ event: 'click', state: toggle }),
  });
  const handleClick: any = () => toggle.set(!toggle.$val());
  const e1 = div(['click', handleClick, false], ['click', handleClick, true])();
  e1.click();
  const t1 = toggle.$val() === false;
  e1.click();
  const t2 = toggle.$val() === true;
  return { pass: t1 && t2 };
};

export const CanApplyEventListenerTraitToSvg: Test = () => {
  const { circle } = SVG({
    click: useEvent({ event: 'click' }),
  });
  let clicked = false;
  var clickEvent = new MouseEvent('click', {
    view: window,
    bubbles: true,
    cancelable: false,
  });
  const handleClick = () => (clicked = true);
  const e1 = circle(['click', handleClick])();
  e1.dispatchEvent(clickEvent);
  const t1 = clicked;
  return { pass: t1 };
};

export const CanConditionallyApplyEventListenerTraitToSvg: Test = () => {
  const toggle = State(true);
  const { circle } = SVG({
    click: useEvent({ event: 'click', state: toggle }),
  });
  const clickEvent = new MouseEvent('click', {
    view: window,
    bubbles: true,
    cancelable: false,
  });
  const handleClick: any = () => toggle.set(!toggle.$val());

  const e1 = circle(['click', handleClick, false], ['click', handleClick, true])();
  e1.dispatchEvent(clickEvent);
  const t1 = toggle.$val() === false;
  e1.dispatchEvent(clickEvent);
  const t2 = toggle.$val() === true;
  return { pass: t1 && t2 };
};
