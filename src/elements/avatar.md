---
name: avatar
description: A composable avatar element using the trait-based pattern. Supports images, initials, multiple sizes, and theme integration.
license: MIT
metadata:
  author: Kevin Lint
  version: '3.0'
---

# Avatar Element

The `avatar` element provides a composable, trait-based approach to creating avatar elements with support for images, initials, custom colors, and multiple sizes with full theming integration.

## API

The avatar element exports an object with the following methods:

```typescript
export const avatar = {
  create: (...children: Child[]) => HTMLDivElement;
  size: (size: AvatarSize) => Applier;
  bg: (bg: ColorToken) => Applier;
  color: (color: ColorToken) => Applier;
  border: (borderColor: ColorToken, borderWidth: string) => Applier;
  initials: (name: string) => Applier;
  image: (src: string, alt: string) => Applier;
  onClick: (handler: () => void) => Applier;
};
```

### Types

```typescript
type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
type ColorToken = keyof DesignTokens['colors'];
type Applier = (el: HTMLElement | SVGElement) => void;
type Child = Applier | HTMLElement | SVGElement;
```

## Usage

### Basic Avatar

```typescript
import { avatar } from '@/elements/avatar';

// Create a simple avatar with initials
avatar.create(
  avatar.size('md'),
  avatar.initials('John Doe'),
);
```

### Complete Avatar

```typescript
// Create a fully configured avatar
avatar.create(
  avatar.size('lg'),
  avatar.bg('primary'),
  avatar.color('textInverse'),
  avatar.initials('Jane Smith'),
  avatar.onClick(() => console.log('Avatar clicked!')),
);
```

## Sizes

The `avatar.size()` applier controls the width, height, and font size:

```typescript
// Extra small avatar
avatar.create(avatar.size('xs'), avatar.initials('JS'));

// Small avatar
avatar.create(avatar.size('sm'), avatar.initials('JS'));

// Medium avatar (default)
avatar.create(avatar.size('md'), avatar.initials('JS'));

// Large avatar
avatar.create(avatar.size('lg'), avatar.initials('JS'));

// Extra large avatar
avatar.create(avatar.size('xl'), avatar.initials('JS'));

// 2X large avatar
avatar.create(avatar.size('2xl'), avatar.initials('JS'));
```

Size configuration:
- `xs`: 24px × 24px, 10px font
- `sm`: 32px × 32px, 12px font
- `md`: 48px × 48px, 16px font
- `lg`: 64px × 64px, 20px font
- `xl`: 96px × 96px, 32px font
- `2xl`: 128px × 128px, 48px font

## Initials

The `avatar.initials()` applier generates initials from a full name:

```typescript
// Single name - first letter
avatar.create(avatar.size('md'), avatar.initials('John'));

// Full name - first and last initials
avatar.create(avatar.size('md'), avatar.initials('John Doe')); // "JD"

// Multiple names - first and last initials
avatar.create(avatar.size('md'), avatar.initials('John Michael Doe')); // "JD"
```

## Images

The `avatar.image()` applier displays a profile image:

```typescript
// Avatar with image
avatar.create(
  avatar.size('lg'),
  avatar.image('/path/to/profile.jpg', 'User profile'),
);

// Avatar with image and fallback styling
avatar.create(
  avatar.size('md'),
  avatar.bg('bgSecondary'),
  avatar.image('/path/to/profile.jpg', 'User profile'),
);
```

## Colors

### Background Color

```typescript
// Primary background
avatar.create(avatar.size('md'), avatar.bg('primary'), avatar.initials('AB'));

// Secondary background
avatar.create(avatar.size('md'), avatar.bg('secondary'), avatar.initials('CD'));

// Custom color
avatar.create(avatar.size('md'), avatar.bg('success'), avatar.initials('EF'));
```

### Text Color

```typescript
// Inverse text (white)
avatar.create(
  avatar.size('md'),
  avatar.bg('primary'),
  avatar.color('textInverse'),
  avatar.initials('GH'),
);

// Custom text color
avatar.create(
  avatar.size('md'),
  avatar.bg('bgSecondary'),
  avatar.color('primary'),
  avatar.initials('IJ'),
);
```

## Border

The `avatar.border()` applier adds a border with custom color and width:

```typescript
// Avatar with border
avatar.create(
  avatar.size('lg'),
  avatar.bg('primary'),
  avatar.border('borderPrimary', '2px'),
  avatar.initials('KL'),
);

// Image avatar with border
avatar.create(
  avatar.size('xl'),
  avatar.border('primary', '3px'),
  avatar.image('/path/to/profile.jpg', 'User'),
);
```

## Event Handlers

### Click Handler

```typescript
avatar.create(
  avatar.size('md'),
  avatar.initials('MN'),
  avatar.onClick(() => {
    console.log('Avatar clicked!');
  }),
);
```

## Advanced Examples

### Avatar with Conditional Image

```typescript
import { avatar } from '@/elements/avatar';
import { $state } from '@/core/state';

const user = $state({ name: 'John Doe', image: null });

const userAvatar = user.get().image
  ? avatar.create(
      avatar.size('lg'),
      avatar.image(user.get().image, user.get().name),
    )
  : avatar.create(
      avatar.size('lg'),
      avatar.bg('primary'),
      avatar.color('textInverse'),
      avatar.initials(user.get().name),
    );
```

### Avatar Group

```typescript
import { tag } from '@/elements/_base';

tag.div(
  avatar.create(avatar.size('md'), avatar.initials('AB')),
  avatar.create(avatar.size('md'), avatar.initials('CD')),
  avatar.create(avatar.size('md'), avatar.initials('EF')),
);
```

### Interactive Avatar

```typescript
const handleAvatarClick = () => {
  console.log('Open user profile');
};

avatar.create(
  avatar.size('lg'),
  avatar.bg('primary'),
  avatar.color('textInverse'),
  avatar.border('borderPrimary', '2px'),
  avatar.initials('User Name'),
  avatar.onClick(handleAvatarClick),
);
```

## Trait-Based Pattern

The avatar element uses the `tag.$()` adopter pattern internally, which means:

1. **Composability**: Each applier (`size`, `bg`, `initials`, etc.) is a function that applies traits to an element
2. **Declarative**: All styling uses the trait system
3. **Theme-aware**: All tokens are reactive and update when the theme changes

### Internal Structure

```typescript
// Example of how avatar.size() works internally
size: (size: AvatarSize) => (el: HTMLElement | SVGElement) => {
  const config = sizeConfig[size];

  tag.$(el)(
    trait.style('width', config.size),
    trait.style('height', config.size),
    trait.style('fontSize', config.fontSize),
  );
};
```

## Features

- ✅ **Trait-based composition**: Use appliers to build up avatar styling
- ✅ **Theme integration**: Fully reactive to theme changes
- ✅ **6 sizes**: From xs (24px) to 2xl (128px)
- ✅ **Automatic initials**: Extracts initials from full names
- ✅ **Image support**: Display profile images with proper sizing
- ✅ **Custom colors**: Background and text color customization
- ✅ **Borders**: Add borders with custom colors and widths
- ✅ **Interactive**: Click handlers via `avatar.onClick()`
- ✅ **Circular shape**: Always renders as a perfect circle
- ✅ **Automatic cleanup**: Event listeners and subscriptions are cleaned up when elements are removed from DOM
