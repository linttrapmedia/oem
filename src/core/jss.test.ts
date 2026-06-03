import { jss } from './jss';
import type { Test } from './types';

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** Return all CSS text injected into the <style data-jss> tag. */
function getInjectedCSS(): string {
  const el = document.querySelector('style[data-jss]');
  return el ? el.textContent ?? '' : '';
}

/** Wipe the JSS style element so each test starts clean. */
function resetJSS(): void {
  document.querySelectorAll('style[data-jss]').forEach((el) => el.remove());
  // Clear the module-level caches by re-injecting a fresh sheet.
  // (The `injected` Set and `styleEl` reference are internal — calling jss()
  //  with *new* fingerprints is enough; the dedup tests verify old ones.)
}

// ─── Tests ───────────────────────────────────────────────────────────────────

export const CanCreateScopedClassName: Test = async () => {
  resetJSS();
  const s = jss({ button: { color: 'red' } });
  const t1 = typeof s.button === 'string';
  const t2 = s.button.startsWith('jss-button-');
  return { pass: t1 && t2 };
};

export const CanInjectCSSIntoHead: Test = async () => {
  resetJSS();
  jss({ card: { padding: '16px' } });
  const css = getInjectedCSS();
  const t1 = css.includes('padding: 16px');
  return { pass: t1 };
};

export const CanConvertCamelCaseToKebab: Test = async () => {
  resetJSS();
  jss({ box: { backgroundColor: 'blue', fontSize: '14px' } });
  const css = getInjectedCSS();
  const t1 = css.includes('background-color: blue');
  const t2 = css.includes('font-size: 14px');
  return { pass: t1 && t2 };
};

export const CanAppendPxToNumericValues: Test = async () => {
  resetJSS();
  jss({ box: { width: 100, height: 50 } });
  const css = getInjectedCSS();
  const t1 = css.includes('width: 100px');
  const t2 = css.includes('height: 50px');
  return { pass: t1 && t2 };
};

export const WillNotAppendPxToUnitlessProperties: Test = async () => {
  resetJSS();
  jss({ box: { opacity: 0.5, zIndex: 10, fontWeight: 700, lineHeight: 1.5 } });
  const css = getInjectedCSS();
  const t1 = css.includes('opacity: 0.5') && !css.includes('opacity: 0.5px');
  const t2 = css.includes('z-index: 10') && !css.includes('z-index: 10px');
  const t3 = css.includes('font-weight: 700') && !css.includes('font-weight: 700px');
  const t4 = css.includes('line-height: 1.5') && !css.includes('line-height: 1.5px');
  return { pass: t1 && t2 && t3 && t4 };
};

export const CanHandleCSSCustomProperties: Test = async () => {
  resetJSS();
  jss({ root: { '--btn-bg': 'royalblue', backgroundColor: 'var(--btn-bg)' } });
  const css = getInjectedCSS();
  const t1 = css.includes('--btn-bg: royalblue');
  const t2 = css.includes('background-color: var(--btn-bg)');
  return { pass: t1 && t2 };
};

export const CanHandleNestedPseudoClass: Test = async () => {
  resetJSS();
  const s = jss({ link: { color: 'blue', '&:hover': { color: 'red' } } });
  const css = getInjectedCSS();
  const t1 = css.includes(`.${s.link}:hover`);
  const t2 = css.includes('color: red');
  return { pass: t1 && t2 };
};

export const CanHandleNestedPseudoElement: Test = async () => {
  resetJSS();
  const s = jss({ item: { '&::before': { content: '""', display: 'block' } } });
  const css = getInjectedCSS();
  const t1 = css.includes(`.${s.item}::before`);
  const t2 = css.includes('content: ""');
  return { pass: t1 && t2 };
};

export const CanHandleNestedCombinator: Test = async () => {
  resetJSS();
  const s = jss({ parent: { '& > span': { color: 'green' } } });
  const css = getInjectedCSS();
  const t1 = css.includes(`.${s.parent} > span`);
  return { pass: t1 };
};

export const CanHandleDescendantSelector: Test = async () => {
  resetJSS();
  const s = jss({ wrapper: { span: { fontWeight: 700 } } });
  const css = getInjectedCSS();
  const t1 = css.includes(`.${s.wrapper} span`);
  const t2 = css.includes('font-weight: 700');
  return { pass: t1 && t2 };
};

export const CanHandleNestedMediaQuery: Test = async () => {
  resetJSS();
  jss({ box: { padding: 16, '@media (max-width: 600px)': { padding: 8 } } });
  const css = getInjectedCSS();
  const t1 = css.includes('@media (max-width: 600px)');
  const t2 = css.includes('padding: 8px');
  return { pass: t1 && t2 };
};

export const CanHandleKeyframes: Test = async () => {
  resetJSS();
  const s = jss({
    '@keyframes fade': {
      '0%': { opacity: 1 },
      '100%': { opacity: 0 },
    },
  });
  const css = getInjectedCSS();
  // The scoped name should be accessible
  const t1 = typeof (s as any).fade === 'string';
  const t2 = css.includes('@keyframes');
  const t3 = css.includes('opacity: 1');
  const t4 = css.includes('opacity: 0');
  return { pass: t1 && t2 && t3 && t4 };
};

export const CanHandleFontFace: Test = async () => {
  resetJSS();
  jss({
    '@font-face': {
      fontFamily: '"TestFont"',
      src: 'url("/fonts/test.woff2") format("woff2")',
    },
  });
  const css = getInjectedCSS();
  const t1 = css.includes('@font-face');
  const t2 = css.includes('font-family: "TestFont"');
  const t3 = css.includes('src: url("/fonts/test.woff2") format("woff2")');
  return { pass: t1 && t2 && t3 };
};

export const CanHandleGlobalStyles: Test = async () => {
  resetJSS();
  jss({
    '@global': {
      body: { margin: 0, padding: 0 },
      '*, *::before': { boxSizing: 'border-box' },
    },
  });
  const css = getInjectedCSS();
  const t1 = css.includes('body {');
  const t2 = css.includes('margin: 0px');
  const t3 = css.includes('*, *::before {');
  const t4 = css.includes('box-sizing: border-box');
  return { pass: t1 && t2 && t3 && t4 };
};

export const CanHandleVendorPrefixes: Test = async () => {
  resetJSS();
  jss({ box: { WebkitTransform: 'rotate(45deg)', msFlexAlign: 'center' } });
  const css = getInjectedCSS();
  const t1 = css.includes('-webkit-transform: rotate(45deg)');
  const t2 = css.includes('-ms-flex-align: center');
  return { pass: t1 && t2 };
};

export const CanHandleMultipleClasses: Test = async () => {
  resetJSS();
  const s = jss({
    primary: { color: 'blue' },
    secondary: { color: 'gray' },
  });
  const t1 = s.primary.startsWith('jss-primary-');
  const t2 = s.secondary.startsWith('jss-secondary-');
  const t3 = s.primary !== s.secondary;
  return { pass: t1 && t2 && t3 };
};

export const WillDeduplicateIdenticalSheets: Test = async () => {
  resetJSS();
  const sheet = { dupe: { color: 'red' } };
  jss(sheet);
  const cssAfterFirst = getInjectedCSS();
  jss(sheet);
  const cssAfterSecond = getInjectedCSS();
  // The CSS should not grow — the second call is a no-op
  const t1 = cssAfterFirst === cssAfterSecond;
  return { pass: t1 };
};

export const CanHandleNestedSupportsQuery: Test = async () => {
  resetJSS();
  jss({
    box: {
      display: 'flex',
      '@supports (display: grid)': { display: 'grid' },
    },
  });
  const css = getInjectedCSS();
  const t1 = css.includes('@supports (display: grid)');
  const t2 = css.includes('display: grid');
  return { pass: t1 && t2 };
};

export const CanHandleCommaSelectors: Test = async () => {
  resetJSS();
  const s = jss({ btn: { '&:focus, &:active': { outline: 'none' } } });
  const css = getInjectedCSS();
  const t1 = css.includes(`.${s.btn}:focus, .${s.btn}:active`);
  const t2 = css.includes('outline: none');
  return { pass: t1 && t2 };
};

export const CanHandleDeeplyNestedRules: Test = async () => {
  resetJSS();
  const s = jss({
    card: {
      padding: 16,
      '&:hover': {
        backgroundColor: 'gray',
        '& > .title': {
          color: 'white',
        },
      },
    },
  });
  const css = getInjectedCSS();
  const t1 = css.includes(`.${s.card}:hover > .title`);
  const t2 = css.includes('color: white');
  return { pass: t1 && t2 };
};
