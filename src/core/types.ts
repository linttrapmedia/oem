// Common types used throughout OEM

export type Condition = (() => boolean) | boolean | 1 | 0;

export type Test = (sandbox?: HTMLElement) => Promise<{ pass: boolean; message?: string }>;

export type Tail<T extends any[]> = T extends [any, ...infer R] ? R : never;
