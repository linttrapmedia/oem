---
name: spacer
description: A spacing utility component for adding vertical, horizontal, or bidirectional space between elements using design tokens.
license: MIT
metadata:
  author: Kevin Lint
  version: '1.0'
---

## Spacer Component

The `spacer` function creates an invisible spacing element for adding precise gaps between components using theme spacing tokens.

## Props

```typescript
type SpacerProps = {
  size?: SpacingToken;             // Spacing size
  axis?: 'horizontal' | 'vertical' | 'both';
};
```

## Example Usage

### Basic Spacer

```typescript
import { spacer } from '@/elements/spacer';

// Simple vertical spacer
const verticalSpace = spacer({
  size: 'md'
});
```

### Axis Direction

```typescript
// Vertical spacing (default) - for stacking
const verticalSpacer = spacer({
  size: 'lg',
  axis: 'vertical'
});

// Horizontal spacing - for side-by-side elements
const horizontalSpacer = spacer({
  size: 'md',
  axis: 'horizontal'
});

// Both directions - square spacing
const squareSpacer = spacer({
  size: 'xl',
  axis: 'both'
});
```

### Sizes

```typescript
// Extra small spacing
const xsSpacer = spacer({
  size: 'xs'
});

// Small spacing
const smSpacer = spacer({
  size: 'sm'
});

// Medium spacing (default)
const mdSpacer = spacer({
  size: 'md'
});

// Large spacing
const lgSpacer = spacer({
  size: 'lg'
});

// Extra large spacing
const xlSpacer = spacer({
  size: 'xl'
});

// 2XL spacing
const xxlSpacer = spacer({
  size: '2xl'
});
```

### Complete Example

```typescript
import { spacer } from '@/elements/spacer';
import { heading } from '@/elements/heading';
import { text } from '@/elements/text';
import { button } from '@/elements/button';
import { divider } from '@/elements/divider';
import { tag } from '@/elements/_base';

// Vertical spacing in a container
const article = tag.div(
  heading({
    content: 'Article Title',
    level: 1
  }),

  spacer({ size: 'lg' }),

  text({
    content: 'Article introduction paragraph...'
  }),

  spacer({ size: 'xl' }),

  heading({
    content: 'Section 1',
    level: 2
  }),

  spacer({ size: 'md' }),

  text({
    content: 'Section content...'
  }),

  spacer({ size: '2xl' }),

  divider(),

  spacer({ size: 'xl' }),

  button({
    label: 'Read More'
  })
);

// Horizontal spacing between inline elements
import { row } from '@/elements/row';

const inlineButtons = row({
  children: [
    button({ label: 'Cancel' }),

    spacer({
      size: 'md',
      axis: 'horizontal'
    }),

    button({
      label: 'Submit',
      variant: 'primary'
    })
  ]
});

// Responsive spacing
const responsiveLayout = tag.div(
  // Large spacing on desktop
  spacer({ size: 'xl' }),

  heading({ content: 'Content Section', level: 2 }),

  spacer({ size: 'lg' }),

  text({ content: 'Content here...' }),

  // Extra large spacing before footer
  spacer({ size: '2xl' })
);

// Square spacing (both axes)
const centeredBox = tag.div(
  spacer({
    size: 'xl',
    axis: 'both'
  }),

  text({
    content: 'Centered content with spacing on all sides'
  }),

  spacer({
    size: 'xl',
    axis: 'both'
  })
);
```

## Use Cases

### When to Use Spacer

- Adding vertical space between non-flex/grid elements
- Creating precise gaps that aren't covered by container spacing
- One-off spacing adjustments
- Breaking up dense content sections
- Creating breathing room in layouts

### When NOT to Use Spacer

- Inside flex/grid containers (use gap instead)
- Between elements in `stack` or `row` (use spacing prop)
- For margins around containers (use margin props on box)
- For padding inside containers (use padding props on box)

## Features

- **Three Axes**: Vertical, horizontal, or both directions
- **Design Tokens**: All sizes use theme spacing tokens
- **Invisible**: No visual appearance, pure spacing
- **Flex-Safe**: Won't shrink in flex containers
- **Simple API**: Minimal props for common spacing needs
- **Consistent**: Matches spacing used throughout the design system
- **Semantic**: Clear intent for spacing purposes
- **Responsive**: Token-based sizing adapts to theme changes
