---
name: box
description: A versatile container component with full control over spacing, colors, dimensions, positioning, and layout. The fundamental building block for layouts.
license: MIT
metadata:
  author: Kevin Lint
  version: '1.0'
---

## Box Component

The `box` function creates a highly flexible container element that serves as the foundation for complex layouts with complete control over spacing, sizing, positioning, and styling.

## Props

```typescript
type BoxProps = {
  padding?: SpacingToken;          // All sides padding
  paddingX?: SpacingToken;         // Horizontal padding
  paddingY?: SpacingToken;         // Vertical padding
  margin?: SpacingToken;           // All sides margin
  marginX?: SpacingToken;          // Horizontal margin
  marginY?: SpacingToken;          // Vertical margin
  bg?: ColorToken;                 // Background color
  border?: ColorToken;             // Border color
  borderRadius?: BorderRadiusToken;
  width?: string;                  // CSS width value
  height?: string;                 // CSS height value
  maxWidth?: string;
  maxHeight?: string;
  minWidth?: string;
  minHeight?: string;
  display?: 'block' | 'inline-block' | 'flex' | 'inline-flex' | 'grid' | 'inline-grid' | 'none';
  position?: 'static' | 'relative' | 'absolute' | 'fixed' | 'sticky';
  overflow?: 'visible' | 'hidden' | 'scroll' | 'auto';
  shadow?: ShadowToken;            // Box shadow
  onClick?: () => void;            // Click handler
  children?: HTMLElement[];
};
```

## Example Usage

### Basic Box

```typescript
import { box } from '@/elements/box';

// Simple container with padding
const container = box({
  padding: 'md',
  children: [/* child elements */]
});
```

### Spacing

```typescript
// All sides padding
const paddedBox = box({
  padding: 'lg'
});

// Horizontal and vertical padding
const asymmetricBox = box({
  paddingX: 'xl',
  paddingY: 'sm'
});

// Margins
const marginBox = box({
  margin: 'md',
  marginX: 'lg',  // Overrides horizontal margin
  marginY: 'sm'   // Overrides vertical margin
});
```

### Colors and Styling

```typescript
// Background color
const coloredBox = box({
  bg: 'bgSecondary',
  padding: 'md'
});

// With border
const borderedBox = box({
  bg: 'bgPrimary',
  border: 'borderPrimary',
  borderRadius: 'borderRadiusMd',
  padding: 'lg'
});

// With shadow
const shadowBox = box({
  bg: 'bgPrimary',
  shadow: 'shadowMd',
  borderRadius: 'borderRadiusLg',
  padding: 'xl'
});
```

### Dimensions

```typescript
// Fixed dimensions
const fixedBox = box({
  width: '200px',
  height: '150px',
  bg: 'bgSecondary'
});

// Max/min dimensions
const constrainedBox = box({
  maxWidth: '600px',
  minHeight: '100px',
  width: '100%'
});
```

### Display Types

```typescript
// Flex container
const flexBox = box({
  display: 'flex',
  padding: 'md'
});

// Grid container
const gridBox = box({
  display: 'grid',
  padding: 'md'
});

// Inline block
const inlineBox = box({
  display: 'inline-block',
  padding: 'sm'
});
```

### Positioning

```typescript
// Relative positioning
const relativeBox = box({
  position: 'relative',
  padding: 'md'
});

// Absolute positioning
const absoluteBox = box({
  position: 'absolute',
  width: '100px',
  height: '100px'
});

// Fixed positioning
const fixedBox = box({
  position: 'fixed',
  bottom: '20px',
  right: '20px'
});
```

### Overflow

```typescript
// Hidden overflow
const hiddenBox = box({
  overflow: 'hidden',
  maxHeight: '200px'
});

// Scrollable
const scrollBox = box({
  overflow: 'auto',
  maxHeight: '300px'
});
```

### Clickable Box

```typescript
// Box with click handler
const clickableBox = box({
  padding: 'md',
  bg: 'bgSecondary',
  borderRadius: 'borderRadiusMd',
  onClick: () => {
    console.log('Box clicked!');
  }
});
```

### Complete Example

```typescript
import { box } from '@/elements/box';
import { heading } from '@/elements/heading';
import { text } from '@/elements/text';
import { button } from '@/elements/button';

// Card component using box
const card = box({
  bg: 'bgPrimary',
  border: 'borderPrimary',
  borderRadius: 'borderRadiusLg',
  shadow: 'shadowMd',
  padding: 'xl',
  maxWidth: '400px',
  overflow: 'hidden',
  children: [
    heading({
      content: 'Card Title',
      level: 3
    }),
    box({
      paddingY: 'md',
      children: [
        text({
          content: 'This is card content with nested boxes for layout control.'
        })
      ]
    }),
    box({
      display: 'flex',
      children: [
        button({
          label: 'Action',
          variant: 'primary'
        })
      ]
    })
  ]
});

// Layout with multiple boxes
const layout = box({
  display: 'flex',
  padding: 'lg',
  children: [
    box({
      width: '250px',
      bg: 'bgSecondary',
      padding: 'md',
      children: [/* sidebar content */]
    }),
    box({
      flex: '1',
      padding: 'lg',
      children: [/* main content */]
    })
  ]
});
```

## Features

- **Flexible Spacing**: Control padding and margin with design tokens
- **Directional Control**: Set spacing for X/Y axes independently
- **Color Theming**: Background colors and borders from design tokens
- **Dimension Control**: Full control over width, height, and constraints
- **Display Modes**: Support for all CSS display types
- **Positioning**: Static, relative, absolute, fixed, and sticky positioning
- **Overflow Control**: Manage content overflow behavior
- **Shadows**: Add depth with shadow design tokens
- **Border Radius**: Rounded corners with design tokens
- **Clickable**: Optional click handler with pointer cursor
- **Layout Foundation**: Perfect base for building complex layouts
