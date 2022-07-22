type DebounceOpts = {
  onStart?: () => void;
  delay?: number;
};
export const debounce = (func: (...args: any[]) => any, options: DebounceOpts): any => {
  let runOnStart = true;
  let timer: number;
  return function (event: SecurityPolicyViolationEventInit) {
    const callback = () => {
      (runOnStart = true), func(event);
    };
    if (timer) clearTimeout(timer);
    if (runOnStart) {
      options.onStart();
      runOnStart = false;
    }
    timer = setTimeout(callback, options.delay ?? 500, event);
  };
};
