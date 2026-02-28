import { State, StateType } from '@/registry';

type TimerCustomMethods = {
  start: (state: StateType<number, TimerCustomMethods>) => void;
  stop: (state: StateType<number, TimerCustomMethods>) => void;
  reset: (state: StateType<number, TimerCustomMethods>) => void;
};

export const useTimerState = (
  intervalMs: number,
  options?: { autoStart?: boolean },
) => {
  let intervalId: ReturnType<typeof setInterval> | null = null;

  const state = State<number, TimerCustomMethods>(0, {
    start: (s) => {
      if (intervalId !== null) return;
      intervalId = setInterval(() => s.reduce((prev) => prev + 1), intervalMs);
    },
    stop: () => {
      if (intervalId !== null) {
        clearInterval(intervalId);
        intervalId = null;
      }
    },
    reset: (s) => {
      if (intervalId !== null) {
        clearInterval(intervalId);
        intervalId = null;
      }
      s.set(0);
    },
  });

  if (options?.autoStart !== false) {
    state.start();
  }

  return state;
};
