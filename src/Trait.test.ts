import { HTML } from '@/HTML';
import { Trait } from '@/Trait';
import { Test } from '@/types';

export const CanCreateBasicTrait: Test = async () => {
  const tests: boolean[] = [];
  let el: HTMLElement;

  const tmpl = HTML({
    red: Trait((el: HTMLElement) => {
      el.style.color = 'red';
      return () => {};
    }),
  });

  el = tmpl.div(['red'])('Test Trait');
  tests.push(el.style.color === 'red');

  return { pass: tests.every(Boolean) };
};

export const WillCleanupTraitOnElementRemoval: Test = async () => {
  const tests: boolean[] = [];
  let el: HTMLElement;
  let cleanedUp = false;

  const tmpl = HTML({
    cleanupTrait: Trait((el: HTMLElement) => {
      return () => {
        cleanedUp = true;
      };
    }),
  });

  el = tmpl.div(['cleanupTrait'])('Test Cleanup Trait');
  tests.push(!cleanedUp); // Should not be cleaned up yet

  // Remove the element from the DOM
  if (el.parentNode) {
    el.parentNode.removeChild(el);
  } else {
    // If the element has no parent, append it to body first for testing
    document.body.appendChild(el);
    document.body.removeChild(el);
  }

  tests.push(cleanedUp); // Should be cleaned up after removal

  return { pass: tests.every(Boolean) };
};
