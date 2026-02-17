---
name: avatar
description: A circular avatar component with image or initials display. Supports multiple sizes, custom colors, borders, and click handlers.
license: MIT
metadata:
  author: Kevin Lint
  version: '1.0'
---

## Avatar Component

The `avatar` function creates a flexible avatar element that displays either an image or user initials in a circular container with theming support and multiple size options.

## Props

```typescript
type AvatarProps = {
  src?: string;                    // Image URL
  alt?: string;                    // Alt text for image
  name?: string;                   // User name (for initials)
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  bg?: ColorToken;                 // Background color
  color?: ColorToken;              // Text color for initials
  borderColor?: ColorToken;        // Border color
  borderWidth?: string;            // Border width
  onClick?: () => void;            // Click handler
};
```

## Example Usage

### Basic Avatar with Image

```typescript
import { avatar } from '@/elements/avatar';

// Simple avatar with image
const userAvatar = avatar({
  src: '/path/to/image.jpg',
  alt: 'John Doe',
  size: 'md'
});
```

### Avatar with Initials

```typescript
// Avatar displays initials when no image provided
const initialsAvatar = avatar({
  name: 'John Doe',
  size: 'md'
});
// Displays "JD"

// Single name
const singleNameAvatar = avatar({
  name: 'John',
  size: 'md'
});
// Displays "J"
```

### Sizes

```typescript
// Extra small (24px)
const xsAvatar = avatar({
  name: 'John Doe',
  size: 'xs'
});

// Small (32px)
const smAvatar = avatar({
  name: 'John Doe',
  size: 'sm'
});

// Medium (48px - default)
const mdAvatar = avatar({
  name: 'John Doe',
  size: 'md'
});

// Large (64px)
const lgAvatar = avatar({
  name: 'John Doe',
  size: 'lg'
});

// Extra large (96px)
const xlAvatar = avatar({
  name: 'John Doe',
  size: 'xl'
});

// 2XL (128px)
const xxlAvatar = avatar({
  name: 'John Doe',
  size: '2xl'
});
```

### Custom Colors

```typescript
// Custom background and text color
const coloredAvatar = avatar({
  name: 'Jane Smith',
  bg: 'success',
  color: 'textInverse',
  size: 'md'
});

// Different color combinations
const secondaryAvatar = avatar({
  name: 'Bob Wilson',
  bg: 'secondary',
  color: 'textInverse',
  size: 'lg'
});
```

### With Border

```typescript
// Avatar with border
const borderedAvatar = avatar({
  name: 'Alice Brown',
  borderColor: 'primary',
  borderWidth: '2px',
  size: 'md'
});

// Thick border
const thickBorderAvatar = avatar({
  src: '/path/to/image.jpg',
  borderColor: 'success',
  borderWidth: '4px',
  size: 'lg'
});
```

### Clickable Avatar

```typescript
// Avatar with click handler
const clickableAvatar = avatar({
  name: 'Charlie Davis',
  size: 'md',
  onClick: () => {
    console.log('Avatar clicked!');
    // Navigate to profile, open modal, etc.
  }
});
```

### Complete Example

```typescript
import { avatar } from '@/elements/avatar';
import { stack } from '@/elements/stack';
import { $signal } from '@/core/signal';

// Avatar gallery with reactive state
const selectedUser = $signal<string | null>(null);

const users = [
  { name: 'Alice Johnson', image: '/avatars/alice.jpg' },
  { name: 'Bob Smith', image: null },
  { name: 'Charlie Brown', image: '/avatars/charlie.jpg' },
];

const avatarGallery = stack({
  spacing: 'md',
  children: users.map((user) =>
    avatar({
      src: user.image,
      name: user.name,
      size: 'lg',
      borderColor: () => selectedUser.value === user.name ? 'primary' : undefined,
      borderWidth: '3px',
      onClick: () => selectedUser.set(user.name)
    })
  )
});
```

## Features

- **Dual Mode**: Displays images or auto-generated initials from names
- **Size Options**: Six size variants from extra small (24px) to 2XL (128px)
- **Theming**: Full integration with design tokens for colors
- **Smart Initials**: Automatically extracts first and last name initials
- **Borders**: Optional customizable borders with color and width
- **Clickable**: Optional click handler with pointer cursor
- **Accessibility**: Proper alt text for images
- **Circular Design**: Perfect circle shape with overflow hidden
- **Flexible Shrinking**: Won't shrink in flex containers
