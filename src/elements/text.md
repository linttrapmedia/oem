---
name: text
description: A composable text element using the trait-based pattern. Supports multiple variants, sizes, weights, alignment, and styling options with full theming integration.
license: MIT
metadata:
  author: Kevin Lint
  version: '3.0'
---

# Text Element

The `text` element provides a composable, trait-based approach to creating text elements with built-in theming support, multiple variants, sizes, weights, and styling options.

## API

The text element exports an object with the following methods:

```typescript
export const text = {
  create: (...children: Child[]) => HTMLSpanElement;
  variant: (variant: Variant) => Applier;
  size: (size: Size) => Applier;
  weight: (weight: Weight) => Applier;
  align: (align: Align) => Applier;
  color: (color: ColorToken) => Applier;
  italic: (italic: boolean) => Applier;
  underline: (underline: boolean) => Applier;
  truncate: (truncate: boolean) => Applier;
  content: (content: string) => Applier;
};
```

### Types

```typescript
type Variant = 'body' | 'caption' | 'overline' | 'subtitle';
type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type Weight = 'normal' | 'medium' | 'semibold' | 'bold';
type Align = 'left' | 'center' | 'right' | 'justify';
type ColorToken = keyof DesignTokens['colors'];
type Applier = (el: HTMLElement | SVGElement) => void;
type Child = Applier | HTMLElement | SVGElement;
```

## Usage

### Basic Text

```typescript
import { text } from '@/elements/text';

// Create a simple text element
const txt = text.create(text.content('Hello, world!'));
```

### Complete Text

```typescript
// Create a fully configured text element
const txt = text.create(
  text.variant('body'),
  text.size('md'),
  text.weight('medium'),
  text.color('textPrimary'),
  text.content('Welcome to the application'),
);

document.body.appendChild(txt);
```

## Variants

The `text.variant()` applier applies typography styles based on semantic meaning:

```typescript
// Body text (default - base font size)
const bodyText = text.create(text.variant('body'), text.content('Body text'));

// Caption text (smaller, for supplementary information)
const captionText = text.create(text.variant('caption'), text.content('Caption text'));

// Overline text (smallest, for labels)
const overlineText = text.create(text.variant('overline'), text.content('OVERLINE'));

// Subtitle text (larger, for secondary headings)
const subtitleText = text.create(text.variant('subtitle'), text.content('Subtitle text'));
```

### Variant Features

Each variant includes:

- Font size from theme typography tokens
- Line height optimized for readability
- Automatic theme reactivity (updates when theme changes)

## Sizes

The `text.size()` applier controls font size independently of variant:

```typescript
// Extra small text
const xsText = text.create(text.size('xs'), text.content('Extra small'));

// Small text
const smText = text.create(text.size('sm'), text.content('Small'));

// Medium text (default)
const mdText = text.create(text.size('md'), text.content('Medium'));

// Large text
const lgText = text.create(text.size('lg'), text.content('Large'));

// Extra large text
const xlText = text.create(text.size('xl'), text.content('Extra large'));
```

## Weight

The `text.weight()` applier controls font weight:

```typescript
// Normal weight
const normalText = text.create(text.weight('normal'), text.content('Normal'));

// Medium weight
const mediumText = text.create(text.weight('medium'), text.content('Medium'));

// Semibold weight
const semiboldText = text.create(text.weight('semibold'), text.content('Semibold'));

// Bold weight
const boldText = text.create(text.weight('bold'), text.content('Bold'));
```

## Alignment

The `text.align()` applier controls text alignment:

```typescript
// Left aligned (default)
const leftText = text.create(text.align('left'), text.content('Left aligned'));

// Center aligned
const centerText = text.create(text.align('center'), text.content('Center aligned'));

// Right aligned
const rightText = text.create(text.align('right'), text.content('Right aligned'));

// Justified
const justifiedText = text.create(text.align('justify'), text.content('Justified text'));
```

## Color

The `text.color()` applier sets text color using theme color tokens:

```typescript
// Primary text color (default)
const primaryText = text.create(text.color('textPrimary'), text.content('Primary'));

// Secondary text color
const secondaryText = text.create(text.color('textSecondary'), text.content('Secondary'));

// Error color
const errorText = text.create(text.color('error'), text.content('Error message'));

// Success color
const successText = text.create(text.color('success'), text.content('Success message'));
```

## Text Styling

### Italic

```typescript
// Italic text
const italicText = text.create(text.italic(true), text.content('Italic text'));

// Normal (non-italic) text
const normalText = text.create(text.italic(false), text.content('Normal text'));
```

### Underline

```typescript
// Underlined text
const underlinedText = text.create(text.underline(true), text.content('Underlined'));

// Non-underlined text
const plainText = text.create(text.underline(false), text.content('Plain text'));
```

### Truncate

The `text.truncate()` applier adds ellipsis overflow for long text:

```typescript
// Truncated text (adds ellipsis when text overflows)
const truncatedText = text.create(
  text.truncate(true),
  text.content('This is a very long text that will be truncated with ellipsis'),
);

// Full text (no truncation)
const fullText = text.create(
  text.truncate(false),
  text.content('This text will wrap normally'),
);
```

The `text.truncate()` applier:

- Sets `overflow: hidden`
- Sets `text-overflow: ellipsis`
- Sets `white-space: nowrap`
- Prevents text wrapping and adds "..." for overflow

## Composing with Child Elements

You can add child elements (like icons) directly:

```typescript
import { tag } from '@/elements/_base';

// Text with icon
const iconText = text.create(
  tag.span('🔔'),
  text.content(' Notification'),
);
```

## Advanced Examples

### Styled Paragraph

```typescript
import { text } from '@/elements/text';

const paragraph = text.create(
  text.variant('body'),
  text.size('md'),
  text.weight('normal'),
  text.align('left'),
  text.color('textPrimary'),
  text.content('This is a paragraph of text with proper styling applied.'),
);
```

### Label Text

```typescript
const label = text.create(
  text.variant('overline'),
  text.weight('semibold'),
  text.color('textSecondary'),
  text.content('FORM LABEL'),
);
```

### Error Message

```typescript
const errorMessage = text.create(
  text.variant('caption'),
  text.color('error'),
  text.italic(true),
  text.content('This field is required'),
);
```

### Truncated Title

```typescript
const title = text.create(
  text.variant('subtitle'),
  text.weight('semibold'),
  text.truncate(true),
  text.content('Very Long Title That Will Be Truncated With Ellipsis When It Overflows'),
);
```

### Reactive Text with State

```typescript
import { text } from '@/elements/text';
import { $state } from '@/core/state';

const count = $state(0);

const counter = text.create(
  text.variant('body'),
  text.weight('bold'),
  text.size('lg'),
  text.content(`Count: ${count.get()}`),
);

// Update text when state changes
count.subscribe((value) => {
  counter.textContent = `Count: ${value}`;
});
```

### Conditional Styling

```typescript
const hasError = $state(false);

const message = text.create(
  text.variant('body'),
  text.color(hasError.get() ? 'error' : 'textPrimary'),
  text.italic(hasError.get()),
  text.content(hasError.get() ? 'Error occurred' : 'All good'),
);
```

### Text Combinations

```typescript
import { tag } from '@/elements/_base';

const textGroup = tag.div(
  text.create(text.variant('overline'), text.content('SECTION TITLE')),
  text.create(text.variant('subtitle'), text.weight('bold'), text.content('Main Heading')),
  text.create(text.variant('body'), text.color('textSecondary'), text.content('Description text')),
  text.create(text.variant('caption'), text.italic(true), text.content('Additional info')),
);
```

## Trait-Based Pattern

The text element uses the `tag.$()` adopter pattern internally, which means:

1. **Composability**: Each applier (`variant`, `size`, etc.) is a function that applies traits to an element
2. **Declarative**: All styling uses the trait system with conditional logic via `$test()`
3. **Theme-aware**: All tokens are reactive and update when the theme changes
4. **No ternaries**: All conditional logic uses trait conditions instead of ternary expressions

### Internal Structure

```typescript
// Example of how text.variant() works internally
variant: (variant: Variant) => (el: HTMLElement | SVGElement) => {
  const config = variantConfig[variant];

  tag.$(el)(
    trait.style('fontSize', theme.$token('typography', config.fontSize)),
    trait.style('lineHeight', theme.$token('typography', config.lineHeight)),
  );
};
```

## Features

- ✅ **Trait-based composition**: Use appliers to build up text styling
- ✅ **Theme integration**: Fully reactive to theme changes
- ✅ **4 variants**: Body, caption, overline, subtitle
- ✅ **5 sizes**: XS, SM, MD, LG, XL
- ✅ **4 weights**: Normal, medium, semibold, bold
- ✅ **4 alignments**: Left, center, right, justify
- ✅ **Color tokens**: Use any theme color token
- ✅ **Text styling**: Italic, underline, truncate
- ✅ **Child elements**: Add icons or other elements as children
- ✅ **Conditional traits**: Uses `$test()` for conditional styling
- ✅ **Automatic cleanup**: Subscriptions are cleaned up when elements are removed from DOM

## Migration from v2.0

If you're migrating from the props-based API:

**Old (v2.0):**

```typescript
text({
  content: 'Hello',
  variant: 'body',
  size: 'md',
  weight: 'medium',
  color: 'textPrimary',
  italic: false,
  underline: false,
});
```

**New (v3.0):**

```typescript
text.create(
  text.variant('body'),
  text.size('md'),
  text.weight('medium'),
  text.color('textPrimary'),
  text.italic(false),
  text.underline(false),
  text.content('Hello'),
);
```
