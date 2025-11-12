import { Test } from '@/oem';
import { useMediaQueryState } from '@/states/MediaQuery';

// polyfill window.matchMedia for testing environment
if (!window.matchMedia) {
  window.matchMedia = function (query: string) {
    return {
      matches: true,
      media: query,
      onchange: null,
      addListener: function () {},
      removeListener: function () {},
      addEventListener: function () {},
      removeEventListener: function () {},
      dispatchEvent: function () {
        return false;
      },
    };
  };
}

export const CanKeepTrackOfMediaQueryState: Test = async () => {
  Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: 1024 });

  const mq1 = useMediaQueryState({
    type: 'screen',
    minWidth: 500,
    maxWidth: 2000,
  });

  const t1 = mq1.val() === true;

  const mq2 = useMediaQueryState({
    type: 'screen',
    minWidth: 1400,
    maxWidth: 2000,
  });

  const t2 = mq2.val() === false;
  const tests = [t1, t2];

  return { pass: tests.every(Boolean) };
};
