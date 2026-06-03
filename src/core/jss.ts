// ─── CSS-in-JS (JSS) ─────────────────────────────────────────────────────────
//
// Full-featured CSS-in-JS: converts a JSON-like style object into real CSS,
// injects it into <head> (deduplicating), and returns scoped class names.
//
// Supports the entire CSS spec surface:
//   - CSS custom properties (--vars) as both keys and values
//   - @media, @supports, @container, @layer queries (infinitely nestable)
//   - @keyframes (auto-scoped animation names)
//   - @font-face (global injection)
//   - Pseudo-classes & pseudo-elements via & nesting (&:hover, &::before, …)
//   - Combinators via nesting (& > .child, & + .sibling, …)
//   - Comma-separated selectors (&:focus, &:active)
//   - Arbitrary nesting depth
//   - Numeric values auto-appended with px where appropriate
//
// Usage:
//   const s = jss({
//     button: {
//       '--btn-bg': 'royalblue',
//       backgroundColor: 'var(--btn-bg)',
//       fontSize: 14,
//       '&:hover': { backgroundColor: 'darkblue' },
//       '&::after': { content: '""', display: 'block' },
//       '@media (max-width: 600px)': { fontSize: 12 },
//     },
//     '@keyframes pulse': {
//       '0%':   { opacity: 1 },
//       '50%':  { opacity: 0.5 },
//       '100%': { opacity: 1 },
//     },
//     '@font-face': {
//       fontFamily: '"MyFont"',
//       src: 'url("/fonts/MyFont.woff2") format("woff2")',
//     },
//     '@global': {
//       '*, *::before, *::after': { boxSizing: 'border-box' },
//       body: { margin: 0 },
//     },
//   });
//   // s.button → "jss-button-a1b2c3"

// ─── Types ───────────────────────────────────────────────────────────────────

type CSSValue = string | number;

type CSSProperties = {
  [key: string]: CSSValue | CSSProperties;
};

type StyleSheet = {
  [key: string]: CSSProperties;
};

type ClassNameMap<T extends StyleSheet> = {
  [K in keyof T as K extends `@${string}` ? never : K]: string;
};

// ─── Internals ───────────────────────────────────────────────────────────────

const injected = new Set<string>();

let styleEl: HTMLStyleElement | null = null;

function getStyleElement(): HTMLStyleElement {
  if (styleEl) return styleEl;
  styleEl = document.createElement('style');
  styleEl.setAttribute('data-jss', '');
  document.head.appendChild(styleEl);
  return styleEl;
}

/** Deterministic hash — same input always produces the same suffix. */
function hash(str: string): string {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = ((h << 5) - h + str.charCodeAt(i)) | 0;
  }
  return (h >>> 0).toString(36);
}

/**
 * Convert a property key to its CSS equivalent.
 *  - Custom properties (--*) are left untouched.
 *  - Vendor-prefixed camelCase (WebkitFoo → -webkit-foo, MozFoo → -moz-foo, msFoo → -ms-foo)
 *  - Regular camelCase (backgroundColor → background-color)
 */
function propToCSS(prop: string): string {
  if (prop.startsWith('--')) return prop;
  // Vendor prefix: leading capital or ms
  return prop
    .replace(/^(Webkit|Moz|O|ms)/, (_, p) => `-${p.toLowerCase()}`)
    .replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`);
}

/**
 * CSS properties that are unitless — numeric values for these should NOT
 * get "px" appended.
 */
const UNITLESS = new Set([
  'animationIterationCount',
  'borderImageOutset',
  'borderImageSlice',
  'borderImageWidth',
  'boxFlex',
  'boxFlexGroup',
  'boxOrdinalGroup',
  'columnCount',
  'columns',
  'flex',
  'flexGrow',
  'flexPositive',
  'flexShrink',
  'flexNegative',
  'flexOrder',
  'gridArea',
  'gridRow',
  'gridRowEnd',
  'gridRowSpan',
  'gridRowStart',
  'gridColumn',
  'gridColumnEnd',
  'gridColumnSpan',
  'gridColumnStart',
  'fontWeight',
  'lineClamp',
  'lineHeight',
  'opacity',
  'order',
  'orphans',
  'tabSize',
  'widows',
  'zIndex',
  'zoom',
  'fillOpacity',
  'floodOpacity',
  'stopOpacity',
  'strokeDasharray',
  'strokeDashoffset',
  'strokeMiterlimit',
  'strokeOpacity',
  'strokeWidth',
]);

/** Resolve a value — numbers become px unless the property is unitless. */
function resolveValue(prop: string, value: CSSValue): string {
  if (typeof value === 'number') {
    return UNITLESS.has(prop) ? String(value) : `${value}px`;
  }
  return value;
}

/** Is the key a conditional at-rule that wraps selectors? */
function isConditionalAtRule(key: string): boolean {
  return /^@(media|supports|container|layer)\b/.test(key);
}

// ─── Serializer ──────────────────────────────────────────────────────────────

/**
 * Recursively serialize a CSSProperties object into CSS rule strings.
 *
 * Handles:
 *  - Plain declarations (color, background, --my-var, …)
 *  - Nested selectors via & (pseudo-classes, pseudo-elements, combinators)
 *  - Descendant selectors (plain nested keys without &)
 *  - Conditional at-rules (@media, @supports, @container, @layer)
 *  - @keyframes blocks (percentage / from / to keys)
 *  - Arbitrary nesting depth
 */
function serialize(selector: string, props: CSSProperties, rules: string[]): void {
  let declarations = '';

  for (const key of Object.keys(props)) {
    const value = props[key];

    if (typeof value === 'object') {
      if (isConditionalAtRule(key)) {
        // Conditional at-rule — wrap child rules
        const nested: string[] = [];
        serialize(selector, value as CSSProperties, nested);
        rules.push(`${key} {\n${nested.join('\n')}\n}`);
      } else if (key.startsWith('@')) {
        // Other at-rules nested inside a class (unlikely but safe)
        const nested: string[] = [];
        serializeBlock(key, value as CSSProperties, nested);
        rules.push(nested.join('\n'));
      } else {
        // Nested selector: & substitution or descendant
        const nestedSelector = key.includes('&')
          ? key.replace(/&/g, selector)
          : `${selector} ${key}`;
        serialize(nestedSelector, value as CSSProperties, rules);
      }
    } else {
      declarations += `  ${propToCSS(key)}: ${resolveValue(key, value)};\n`;
    }
  }

  if (declarations) {
    rules.push(`${selector} {\n${declarations}}`);
  }
}

/**
 * Serialize an at-rule block whose children are NOT normal class selectors
 * but raw inner keys (e.g. @keyframes with 0%/50%/100%/from/to,
 * or @font-face with flat declarations).
 */
function serializeBlock(atRule: string, props: CSSProperties, rules: string[]): void {
  // Check if children are all primitives → single declaration block
  const allPrimitive = Object.values(props).every((v) => typeof v !== 'object');

  if (allPrimitive) {
    let declarations = '';
    for (const key of Object.keys(props)) {
      const value = props[key] as CSSValue;
      declarations += `  ${propToCSS(key)}: ${resolveValue(key, value)};\n`;
    }
    rules.push(`${atRule} {\n${declarations}}`);
    return;
  }

  // Children are objects (keyframe stops, nested rules, etc.)
  let inner = '';
  for (const childKey of Object.keys(props)) {
    const childVal = props[childKey];
    if (typeof childVal === 'object') {
      let declarations = '';
      for (const p of Object.keys(childVal)) {
        const v = (childVal as CSSProperties)[p] as CSSValue;
        declarations += `    ${propToCSS(p)}: ${resolveValue(p, v)};\n`;
      }
      inner += `  ${childKey} {\n${declarations}  }\n`;
    } else {
      // Top-level primitive alongside nested objects (rare but valid)
      inner += `  ${propToCSS(childKey)}: ${resolveValue(childKey, childVal)};\n`;
    }
  }
  rules.push(`${atRule} {\n${inner}}`);
}

// ─── Inject helper ───────────────────────────────────────────────────────────

function inject(css: string): void {
  getStyleElement().appendChild(document.createTextNode(css + '\n'));
}

// ─── Public API ──────────────────────────────────────────────────────────────

/**
 * Create a scoped stylesheet.
 *
 * Top-level keys:
 *  - Regular names      → scoped class selectors  (returned in the map)
 *  - `@keyframes <name>` → scoped @keyframes       (rewritten name in map)
 *  - `@font-face`        → global @font-face block
 *  - `@global`            → global unscoped rules
 *  - `@media …` etc.     → global conditional at-rules
 */
export function jss<T extends StyleSheet>(sheet: T): ClassNameMap<T> {
  const classNames = {} as Record<string, string>;
  const allRules: string[] = [];

  for (const name of Object.keys(sheet)) {
    const props = sheet[name];
    const fingerprint = `${name}:${JSON.stringify(props)}`;
    const id = hash(fingerprint);

    // ── @keyframes ─────────────────────────────────────────────────────
    if (name.startsWith('@keyframes ')) {
      const rawName = name.slice('@keyframes '.length).trim();
      const scopedName = `jss-${rawName}-${id}`;
      classNames[rawName] = scopedName; // so users can reference the name

      if (injected.has(fingerprint)) continue;
      injected.add(fingerprint);

      const kfRules: string[] = [];
      serializeBlock(`@keyframes ${scopedName}`, props, kfRules);
      allRules.push(...kfRules);
      continue;
    }

    // ── @font-face ─────────────────────────────────────────────────────
    if (name === '@font-face') {
      if (injected.has(fingerprint)) continue;
      injected.add(fingerprint);

      const ffRules: string[] = [];
      serializeBlock('@font-face', props, ffRules);
      allRules.push(...ffRules);
      continue;
    }

    // ── @global — inject unscoped rules ────────────────────────────────
    if (name === '@global') {
      if (injected.has(fingerprint)) continue;
      injected.add(fingerprint);

      for (const sel of Object.keys(props)) {
        const val = props[sel];
        if (typeof val === 'object') {
          serialize(sel, val as CSSProperties, allRules);
        }
      }
      continue;
    }

    // ── Top-level conditional at-rules (@media, @supports, …) ─────────
    if (isConditionalAtRule(name)) {
      if (injected.has(fingerprint)) continue;
      injected.add(fingerprint);

      // Children are selectors or further nested at-rules
      const nested: string[] = [];
      for (const sel of Object.keys(props)) {
        const val = props[sel];
        if (typeof val === 'object') {
          serialize(sel, val as CSSProperties, nested);
        }
      }
      allRules.push(`${name} {\n${nested.join('\n')}\n}`);
      continue;
    }

    // ── Regular class selector ─────────────────────────────────────────
    const scopedName = `jss-${name}-${id}`;
    classNames[name] = scopedName;

    if (injected.has(fingerprint)) continue;
    injected.add(fingerprint);

    serialize(`.${scopedName}`, props, allRules);
  }

  if (allRules.length) {
    inject(allRules.join('\n'));
  }

  return classNames as ClassNameMap<T>;
}
