---
name: heading
description: A composable heading element using the trait-based pattern. Supports all heading levels (h1-h6), text alignment, and color customization with full theming integration.
license: MIT
metadata:
  author: Kevin Lint
  version: '3.0'
---

# Heading Element

The `heading` element provides a composable, trait-based approach to creating semantic heading elements with built-in theming support, multiple levels, and customizable styling.

## API

The heading element exports an object with the following methods:

```typescript
export const heading = {
  create: (level: HeadingLevel, ...children: Child[]) => HTMLHeadingElement;
  h1: (...children: Child[]) => HTMLHeadingElement;
  h2: (...children: Child[]) => HTMLHeadingElement;
  h3: (...children: Child[]) => HTMLHeadingElement;
  h4: (...children: Child[]) => HTMLHeadingElement;
  h5: (...children: Child[]) => HTMLHeadingElement;
  h6: (...children: Child[]) => HTMLHeadingElement;
  color: (color: ColorToken) => Applier;
  align: (align: TextAlign) => Applier;
  content: (content: string) => Applier;
};
```

### Types

```typescript
type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
type TextAlign = 'left' | 'center' | 'right';
type ColorToken = string;
type Applier = (el: HTMLElement | SVGElement) => void;
type Child = Applier | HTMLElement | SVGElement;
```

## Usage

### Basic Heading

```typescript
import { heading } from '@/elements/heading';

// Create a heading using level
heading.create(1, heading.content('Page Title'));

// Create a heading using helper method
heading.h1(heading.content('Page Title'));
```

### Complete Heading

```typescript
// Create a fully configured heading
heading.create(
  2,
  heading.color('primary.700'),
  heading.align('center'),
  heading.content('Section Title'),
);
```

## Heading Levels

The `heading.create()` method takes a level parameter (1-6) to create h1-h6 elements:

```typescript
// Create different heading levels
heading.create(1, heading.content('Heading 1')); // <h1>
heading.create(2, heading.content('Heading 2')); // <h2>
heading.create(3, heading.content('Heading 3')); // <h3>
heading.create(4, heading.content('Heading 4')); // <h4>
heading.create(5, heading.content('Heading 5')); // <h5>
heading.create(6, heading.content('Heading 6')); // <h6>
```

### Helper Methods

Convenience methods for each heading level:

```typescript
// h1 - Main page title
heading.h1(heading.content('Main Title'));

// h2 - Major sections
heading.h2(heading.content('Section Title'));

// h3 - Subsections
heading.h3(heading.content('Subsection Title'));

// h4 - Minor headings
heading.h4(heading.content('Minor Heading'));

// h5 - Sub-headings
heading.h5(heading.content('Sub-heading'));

// h6 - Smallest heading
heading.h6(heading.content('Small Heading'));
```

### Helper Method Features

Each helper method:

- Creates the correct semantic HTML element
- Inherits all styling capabilities
- Supports all appliers (color, align, content)
- Maintains proper heading hierarchy

## Color

The `heading.color()` applier sets the heading text color using theme tokens:

```typescript
// Primary color heading
heading.h1(heading.color('primary.700'), heading.content('Primary Heading'));

// Gray heading
heading.h2(heading.color('gray.600'), heading.content('Gray Heading'));

// Accent color heading
heading.h3(heading.color('accent.500'), heading.content('Accent Heading'));

// Error color heading
heading.h4(heading.color('error.600'), heading.content('Error Heading'));
```

## Alignment

The `heading.align()` applier controls text alignment:

```typescript
// Left-aligned (default)
heading.h1(heading.align('left'), heading.content('Left Aligned'));

// Center-aligned
heading.h1(heading.align('center'), heading.content('Centered'));

// Right-aligned
heading.h1(heading.align('right'), heading.content('Right Aligned'));
```

## Content

The `heading.content()` applier sets the heading text:

```typescript
// Simple text content
heading.h1(heading.content('Welcome to My Site'));

// Dynamic content
const title = 'Dynamic Title';
heading.h2(heading.content(title));
```

## Advanced Examples

### Page Header

```typescript
import { heading } from '@/elements/heading';
import { tag } from '@/elements/_base';

tag.header(
  heading.h1(
    heading.content('My Website'),
    heading.color('primary.800'),
    heading.align('center'),
  ),
  heading.h2(
    heading.content('Welcome to our platform'),
    heading.color('gray.600'),
    heading.align('center'),
  ),
);
```

### Article Structure

```typescript
// Semantic article with proper heading hierarchy
tag.article(
  heading.h1(heading.content('Article Title')),
  tag.p('Introduction paragraph...'),

  heading.h2(heading.content('First Section')),
  tag.p('Section content...'),

  heading.h3(heading.content('Subsection')),
  tag.p('Subsection content...'),

  heading.h2(heading.content('Second Section')),
  tag.p('More content...'),
);
```

### Styled Section Headers

```typescript
// Section with colored, centered heading
tag.section(
  heading.h2(
    heading.content('Features'),
    heading.color('primary.600'),
    heading.align('center'),
  ),
  tag.p('Feature description...'),
);
```

### Dashboard Headers

```typescript
import { heading } from '@/elements/heading';

// Dashboard sections with consistent styling
tag.div(
  heading.h3(
    heading.content('Recent Activity'),
    heading.color('gray.700'),
  ),
  // Activity content...

  heading.h3(
    heading.content('Statistics'),
    heading.color('gray.700'),
  ),
  // Statistics content...
);
```

### Reactive Heading

```typescript
import { heading } from '@/elements/heading';
import { $state } from '@/core/state';

const userName = $state('Guest');

heading.h1(
  heading.content(`Welcome, ${userName.get()}`),
  heading.color('primary.700'),
);

// Update heading when state changes
userName.set('John Doe');
```

## Trait-Based Pattern

The heading element uses the `tag.$()` adopter pattern internally, which means:

1. **Composability**: Each applier (`color`, `align`, `content`) is a function that applies traits to an element
2. **Declarative**: All styling uses the trait system with conditional logic via `$test()`
3. **Theme-aware**: All tokens are reactive and update when the theme changes
4. **No ternaries**: All conditional logic uses trait conditions instead of ternary expressions

### Internal Structure

```typescript
// Example of how heading.create() works internally
create: (level: HeadingLevel, ...children: Child[]) => {
  const element = document.createElement(`h${level}`);
  tag.$(element)(...children);
  return element as HTMLHeadingElement;
};

// Example of how heading.color() works internally
color: (color: ColorToken) => (el: HTMLElement | SVGElement) => {
  tag.$(el)(
    trait.style('color', theme.$token('colors', color)),
  );
};
```

## Features

- ✅ **Trait-based composition**: Use appliers to build up heading styling
- ✅ **Theme integration**: Fully reactive to theme changes
- ✅ **6 heading levels**: Semantic h1 through h6 elements
- ✅ **Helper methods**: Convenient h1() through h6() shortcuts
- ✅ **Color customization**: Use any theme color token
- ✅ **Text alignment**: Left, center, and right alignment
- ✅ **Content management**: Dynamic text content via applier
- ✅ **Semantic HTML**: Proper heading hierarchy support
- ✅ **Conditional traits**: Uses `$test()` for conditional styling
- ✅ **Automatic cleanup**: Subscriptions are cleaned up when elements are removed from DOM
