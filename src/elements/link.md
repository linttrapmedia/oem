---
name: link
description: A composable link element using the trait-based pattern. Supports multiple variants, colors, external links, and interactive states with full theming integration.
license: MIT
metadata:
  author: Kevin Lint
  version: '3.0'
---

# Link Element

The `link` element provides a composable, trait-based approach to creating anchor (link) elements with built-in theming support, multiple variants, and accessibility features.

## API

The link element exports an object with the following methods:

```typescript
export const link = {
  create: (...children: Child[]) => HTMLAnchorElement;
  variant: (variant: Variant) => Applier;
  color: (color: ColorToken) => Applier;
  underline: (underline: boolean) => Applier;
  href: (href: string) => Applier;
  external: (external: boolean) => Applier;
  disabled: (disabled: boolean) => Applier;
  text: (text: string) => Applier;
  onClick: (handler: (e: Event) => void) => Applier;
};
```

### Types

```typescript
type Variant = 'default' | 'subtle' | 'unstyled';
type Applier = (el: HTMLElement | SVGElement) => void;
type Child = Applier | HTMLElement | SVGElement;
```

## Usage

### Basic Link

```typescript
import { link } from '@/elements/link';

// Create a simple link
link.create(link.href('/about'), link.text('About Us'));
```

### Complete Link

```typescript
// Create a fully configured link
link.create(
  link.href('https://example.com'),
  link.variant('default'),
  link.color('brand.500'),
  link.underline(true),
  link.external(true),
  link.text('Visit Example'),
  link.onClick((e) => console.log('Link clicked!')),
);
```

## Href and Text

The `link.href()` and `link.text()` appliers set the link destination and content:

```typescript
// Basic link
link.create(link.href('/home'), link.text('Home'));

// Link with dynamic href
const pageUrl = '/products/123';
link.create(link.href(pageUrl), link.text('View Product'));
```

## Variants

The `link.variant()` applier applies different visual styles:

```typescript
// Default variant (styled with color and hover)
link.create(link.variant('default'), link.href('/page'), link.text('Default Link'));

// Subtle variant (less prominent)
link.create(link.variant('subtle'), link.href('/page'), link.text('Subtle Link'));

// Unstyled variant (minimal styling)
link.create(link.variant('unstyled'), link.href('/page'), link.text('Unstyled Link'));
```

### Variant Features

- **default**: Full color, underline on hover, theme-aware
- **subtle**: Muted color, subtle hover effect
- **unstyled**: Minimal styling, inherits parent styles

## Colors

The `link.color()` applier sets the link color using theme tokens:

```typescript
// Brand color link
link.create(link.href('/brand'), link.color('brand.500'), link.text('Brand Link'));

// Blue link
link.create(link.href('/info'), link.color('blue.500'), link.text('Info Link'));

// Custom color
link.create(link.href('/custom'), link.color('purple.600'), link.text('Custom Link'));

// Gray link
link.create(link.href('/subtle'), link.color('gray.500'), link.text('Subtle Link'));
```

## Underline

The `link.underline()` applier controls text underline:

```typescript
// Link with underline
link.create(link.href('/page'), link.underline(true), link.text('Underlined Link'));

// Link without underline (underline on hover only)
link.create(link.href('/page'), link.underline(false), link.text('No Underline'));

// Conditional underline
const shouldUnderline = true;
link.create(link.href('/page'), link.underline(shouldUnderline), link.text('Conditional'));
```

## External Links

The `link.external()` applier configures links to open in new tabs:

```typescript
// External link
link.create(
  link.href('https://example.com'),
  link.external(true),
  link.text('External Site'),
);

// External link with icon
import { tag } from '@/elements/_base';

link.create(
  link.href('https://example.com'),
  link.external(true),
  link.text('External Site'),
  tag.span(' ↗'),
);
```

### External Link Features

When `link.external()` is set to `true`:

- Sets `target="_blank"` to open in new tab
- Sets `rel="noopener noreferrer"` for security
- Prevents opener access to the parent window

## States

### Disabled State

```typescript
// Disabled link
link.create(link.href('/page'), link.disabled(true), link.text('Disabled Link'));

// Conditionally disabled
const isDisabled = false;
link.create(link.href('/page'), link.disabled(isDisabled), link.text('Conditional'));
```

The `link.disabled()` applier:

- Reduces opacity
- Changes cursor to `not-allowed`
- Prevents navigation (calls `preventDefault()`)
- Provides visual feedback that the link is disabled

## Event Handlers

### Click Handler

```typescript
link.create(
  link.href('/page'),
  link.text('Click me'),
  link.onClick((e) => {
    console.log('Link clicked!');
    // Could prevent navigation, show modal, etc.
  }),
);
```

### Prevent Default Navigation

```typescript
link.create(
  link.href('#'),
  link.text('Action Link'),
  link.onClick((e) => {
    e.preventDefault();
    console.log('Performing action instead of navigation');
  }),
);
```

## Advanced Examples

### Navigation Menu

```typescript
import { link } from '@/elements/link';
import { tag } from '@/elements/_base';

// Navigation bar
tag.nav(
  link.create(link.href('/'), link.variant('default'), link.text('Home')),
  link.create(link.href('/about'), link.variant('default'), link.text('About')),
  link.create(link.href('/products'), link.variant('default'), link.text('Products')),
  link.create(link.href('/contact'), link.variant('default'), link.text('Contact')),
);
```

### Social Links

```typescript
import { link } from '@/elements/link';
import { tag } from '@/elements/_base';

// Social media links
tag.div(
  link.create(
    link.href('https://twitter.com/username'),
    link.external(true),
    link.variant('subtle'),
    link.text('Twitter'),
  ),
  link.create(
    link.href('https://github.com/username'),
    link.external(true),
    link.variant('subtle'),
    link.text('GitHub'),
  ),
  link.create(
    link.href('https://linkedin.com/in/username'),
    link.external(true),
    link.variant('subtle'),
    link.text('LinkedIn'),
  ),
);
```

### Breadcrumb Navigation

```typescript
import { link } from '@/elements/link';
import { tag } from '@/elements/_base';

// Breadcrumbs
tag.nav(
  link.create(link.href('/'), link.variant('subtle'), link.text('Home')),
  tag.span(' / '),
  link.create(link.href('/products'), link.variant('subtle'), link.text('Products')),
  tag.span(' / '),
  link.create(link.href('/products/123'), link.variant('default'), link.text('Product Name')),
);
```

### Link with Icon

```typescript
import { link } from '@/elements/link';
import { tag } from '@/elements/_base';

// Link with leading icon
link.create(
  link.href('/download'),
  link.variant('default'),
  tag.span('📥 '),
  link.text('Download'),
);

// Link with trailing icon
link.create(
  link.href('https://docs.example.com'),
  link.external(true),
  link.variant('default'),
  link.text('Documentation'),
  tag.span(' ↗'),
);
```

### Active Link State

```typescript
import { link } from '@/elements/link';
import { $state } from '@/core/state';

const currentPath = $state('/home');

// Link with active state
link.create(
  link.href('/home'),
  link.variant('default'),
  link.text('Home'),
  (el) => {
    const isActive = currentPath.get() === '/home';
    if (isActive) {
      tag.$(el)(
        trait.style('fontWeight', 'bold'),
        trait.style('borderBottom', '2px solid currentColor'),
      );
    }
  },
);
```

### Link with Confirmation

```typescript
import { link } from '@/elements/link';

// Link that requires confirmation
link.create(
  link.href('/delete'),
  link.variant('default'),
  link.color('error.500'),
  link.text('Delete Account'),
  link.onClick((e) => {
    e.preventDefault();
    if (confirm('Are you sure you want to delete your account?')) {
      window.location.href = '/delete';
    }
  }),
);
```

### SPA Navigation

```typescript
import { link } from '@/elements/link';
import { router } from '@/router'; // hypothetical router

// Single-page app navigation
link.create(
  link.href('/products'),
  link.text('Products'),
  link.onClick((e) => {
    e.preventDefault();
    router.navigate('/products');
  }),
);
```

### Footer Links

```typescript
import { link } from '@/elements/link';
import { tag } from '@/elements/_base';

// Footer with links
tag.footer(
  tag.div(
    link.create(link.href('/privacy'), link.variant('subtle'), link.text('Privacy Policy')),
    link.create(link.href('/terms'), link.variant('subtle'), link.text('Terms of Service')),
    link.create(link.href('/contact'), link.variant('subtle'), link.text('Contact Us')),
  ),
);
```

## Trait-Based Pattern

The link element uses the `tag.$()` adopter pattern internally, which means:

1. **Composability**: Each applier (`variant`, `color`, etc.) is a function that applies traits to an element
2. **Declarative**: All styling uses the trait system with conditional logic via `$test()`
3. **Theme-aware**: All tokens are reactive and update when the theme changes
4. **No ternaries**: All conditional logic uses trait conditions instead of ternary expressions

### Internal Structure

```typescript
// Example of how link.external() works internally
external: (external: boolean) => (el: HTMLElement | SVGElement) => {
  tag.$(el)(
    trait.attr('target', '_blank', $test(external)),
    trait.attr('rel', 'noopener noreferrer', $test(external)),
  );
};

// Example of how link.disabled() works internally
disabled: (disabled: boolean) => (el: HTMLElement | SVGElement) => {
  tag.$(el)(
    trait.style('opacity', '0.6', $test(disabled)),
    trait.style('cursor', 'not-allowed', $test(disabled)),
    trait.style('pointerEvents', 'none', $test(disabled)),
  );
};
```

## Features

- ✅ **Trait-based composition**: Use appliers to build up link configuration
- ✅ **Theme integration**: Fully reactive to theme changes
- ✅ **3 variants**: Default, subtle, unstyled
- ✅ **Color theming**: Support for all theme color tokens
- ✅ **Underline control**: Toggle underline decoration
- ✅ **External links**: Automatic target and rel attributes
- ✅ **Disabled state**: Visual feedback and navigation prevention
- ✅ **Event handling**: Click handlers
- ✅ **Accessibility**: Proper semantic HTML and security attributes
- ✅ **Conditional traits**: Uses `$test()` for conditional styling
- ✅ **Automatic cleanup**: Event listeners and subscriptions are cleaned up when elements are removed from DOM

## Migration from v2.0
