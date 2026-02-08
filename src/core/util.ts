import type { Condition } from './types';
import type { StateType } from './state';

export const $test = (val: (() => any) | any, expected: any = true): Condition => {
  const closure = () => {
    const result = typeof val === 'function' ? (val as () => any)() : val;
    return result === expected;
  };
  closure.type = '$test';
  return closure;
};

export const extractStates = (...rest: any): StateType<any>[] => {
  return rest.filter((i: any) => i && Object.hasOwn(i, 'sub')) as StateType<any>[];
};

export const extractConditions = (...rest: any[]): Condition[] => {
  return rest.filter((i: any) => i && i.type === '$test') as Condition[];
};
