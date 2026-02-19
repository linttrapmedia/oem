---
name: image
description: A composable image element using the trait-based pattern. Supports image loading, sizing, object fit modes, and event handling with full theming integration.
license: MIT
metadata:
  author: Kevin Lint
  version: '3.0'
---

# Image Element

The `image` element provides a composable, trait-based approach to creating image elements with built-in theming support, responsive sizing, and loading event handlers.

## API

The image element exports an object with the following methods:

```typescript
export const image = {
  create: (...children: Child[]) => HTMLImageElement;
  src: (src: string) => Applier;
  alt: (alt: string) => Applier;
  width: (width: string) => Applier;
  height: (height: string) => Applier;
  objectFit: (fit: ObjectFit) => Applier;
  borderRadius: (radius: BorderRadiusToken) => Applier;
  loading: (loading: Loading) => Applier;
  onLoad: (handler: (e: Event) => void) => Applier;
  onError: (handler: (e: Event) => void) => Applier;
  onClick: (handler: (e: Event) => void) => Applier;
};
```

### Types

```typescript
type ObjectFit = 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
type Loading = 'eager' | 'lazy';
type Applier = (el: HTMLElement | SVGElement) => void;
type Child = Applier | HTMLElement | SVGElement;
```

## Usage

### Basic Image

```typescript
import { image } from '@/elements/image';

// Create a simple image
image.create(image.src('/path/to/image.jpg'), image.alt('Description'));
```

### Complete Image

```typescript
// Create a fully configured image
image.create(
  image.src('/path/to/image.jpg'),
  image.alt('Product photo'),
  image.width('300px'),
  image.height('200px'),
  image.objectFit('cover'),
  image.borderRadius('md'),
  image.loading('lazy'),
  image.onLoad((e) => console.log('Image loaded!')),
  image.onError((e) => console.log('Image failed to load')),
);
```

## Source and Alt Text

The `image.src()` and `image.alt()` appliers set the source URL and alternative text:

```typescript
// Basic image with alt text
image.create(image.src('/avatar.png'), image.alt('User avatar'));

// Dynamic source
const imageUrl = '/photos/photo-1.jpg';
image.create(image.src(imageUrl), image.alt('Gallery photo'));
```

## Sizing

The `image.width()` and `image.height()` appliers control image dimensions:

```typescript
// Fixed size
image.create(
  image.src('/photo.jpg'),
  image.alt('Photo'),
  image.width('400px'),
  image.height('300px'),
);

// Responsive width
image.create(image.src('/banner.jpg'), image.alt('Banner'), image.width('100%'));

// Percentage sizing
image.create(
  image.src('/thumbnail.jpg'),
  image.alt('Thumbnail'),
  image.width('50%'),
  image.height('auto'),
);
```

## Object Fit

The `image.objectFit()` applier controls how the image is resized within its container:

```typescript
// Cover: fills container, may crop image
image.create(
  image.src('/photo.jpg'),
  image.alt('Photo'),
  image.width('200px'),
  image.height('200px'),
  image.objectFit('cover'),
);

// Contain: fits entire image, may show letterboxing
image.create(
  image.src('/photo.jpg'),
  image.alt('Photo'),
  image.width('200px'),
  image.height('200px'),
  image.objectFit('contain'),
);

// Fill: stretches to fill container
image.create(
  image.src('/photo.jpg'),
  image.alt('Photo'),
  image.width('200px'),
  image.height('200px'),
  image.objectFit('fill'),
);

// None: uses original size
image.create(
  image.src('/photo.jpg'),
  image.alt('Photo'),
  image.width('200px'),
  image.height('200px'),
  image.objectFit('none'),
);

// Scale-down: uses smaller of none or contain
image.create(
  image.src('/photo.jpg'),
  image.alt('Photo'),
  image.width('200px'),
  image.height('200px'),
  image.objectFit('scale-down'),
);
```

### Object Fit Options

- **cover**: Scales image to fill container while maintaining aspect ratio (may crop)
- **contain**: Scales image to fit within container while maintaining aspect ratio (may letterbox)
- **fill**: Stretches image to fill container (may distort aspect ratio)
- **none**: Uses image's original size
- **scale-down**: Uses the smaller of `none` or `contain`

## Border Radius

The `image.borderRadius()` applier applies rounded corners using theme tokens:

```typescript
// Small radius
image.create(
  image.src('/avatar.jpg'),
  image.alt('Avatar'),
  image.borderRadius('sm'),
);

// Medium radius
image.create(
  image.src('/avatar.jpg'),
  image.alt('Avatar'),
  image.borderRadius('md'),
);

// Large radius
image.create(
  image.src('/avatar.jpg'),
  image.alt('Avatar'),
  image.borderRadius('lg'),
);

// Full circle (for avatars)
image.create(
  image.src('/avatar.jpg'),
  image.alt('Avatar'),
  image.width('100px'),
  image.height('100px'),
  image.borderRadius('full'),
);
```

## Loading Strategy

The `image.loading()` applier controls browser loading behavior:

```typescript
// Eager loading (default, loads immediately)
image.create(image.src('/hero.jpg'), image.alt('Hero image'), image.loading('eager'));

// Lazy loading (defers loading until near viewport)
image.create(
  image.src('/gallery-photo.jpg'),
  image.alt('Gallery photo'),
  image.loading('lazy'),
);
```

### Loading Options

- **eager**: Load image immediately (good for above-the-fold content)
- **lazy**: Defer loading until near viewport (good for below-the-fold content, improves performance)

## Event Handlers

### Load Handler

```typescript
image.create(
  image.src('/photo.jpg'),
  image.alt('Photo'),
  image.onLoad((e) => {
    console.log('Image loaded successfully!');
  }),
);
```

### Error Handler

```typescript
image.create(
  image.src('/photo.jpg'),
  image.alt('Photo'),
  image.onError((e) => {
    console.log('Failed to load image');
    // Could set fallback image here
  }),
);
```

### Click Handler

```typescript
image.create(
  image.src('/photo.jpg'),
  image.alt('Photo'),
  image.onClick((e) => {
    console.log('Image clicked!');
    // Could open lightbox here
  }),
);
```

## Advanced Examples

### Responsive Avatar

```typescript
import { image } from '@/elements/image';

// Create circular avatar with loading states
image.create(
  image.src('/users/avatar.jpg'),
  image.alt('User avatar'),
  image.width('80px'),
  image.height('80px'),
  image.objectFit('cover'),
  image.borderRadius('full'),
  image.loading('lazy'),
  image.onLoad((e) => console.log('Avatar loaded')),
  image.onError((e) => {
    // Set fallback avatar
    (e.target as HTMLImageElement).src = '/default-avatar.png';
  }),
);
```

### Gallery Image with Lightbox

```typescript
import { image } from '@/elements/image';
import { $state } from '@/core/state';

const lightboxOpen = $state(false);

image.create(
  image.src('/gallery/photo-1.jpg'),
  image.alt('Gallery photo'),
  image.width('300px'),
  image.height('200px'),
  image.objectFit('cover'),
  image.borderRadius('md'),
  image.loading('lazy'),
  image.onClick(() => {
    lightboxOpen.set(true);
    // Open lightbox modal
  }),
);
```

### Image with Loading State

```typescript
import { image } from '@/elements/image';
import { $state } from '@/core/state';

const imageLoaded = $state(false);
const imageError = $state(false);

image.create(
  image.src('/large-image.jpg'),
  image.alt('Large image'),
  image.width('100%'),
  image.height('auto'),
  image.objectFit('contain'),
  image.onLoad(() => {
    imageLoaded.set(true);
    console.log('Image loaded');
  }),
  image.onError(() => {
    imageError.set(true);
    console.log('Image failed to load');
  }),
);
```

### Responsive Product Image

```typescript
import { image } from '@/elements/image';
import { tag } from '@/elements/_base';

// Product card with responsive image
tag.div(
  image.create(
    image.src('/products/product-1.jpg'),
    image.alt('Product name'),
    image.width('100%'),
    image.height('250px'),
    image.objectFit('cover'),
    image.borderRadius('lg'),
    image.loading('lazy'),
  ),
);
```

## Trait-Based Pattern

The image element uses the `tag.$()` adopter pattern internally, which means:

1. **Composability**: Each applier (`src`, `objectFit`, etc.) is a function that applies traits to an element
2. **Declarative**: All styling uses the trait system with conditional logic via `$test()`
3. **Theme-aware**: All tokens are reactive and update when the theme changes
4. **No ternaries**: All conditional logic uses trait conditions instead of ternary expressions

### Internal Structure

```typescript
// Example of how image.borderRadius() works internally
borderRadius: (radius: BorderRadiusToken) => (el: HTMLElement | SVGElement) => {
  tag.$(el)(trait.style('borderRadius', theme.$token('borderRadius', radius)));
};
```

## Features

- ✅ **Trait-based composition**: Use appliers to build up image configuration
- ✅ **Theme integration**: Fully reactive to theme changes
- ✅ **Object fit modes**: Cover, contain, fill, none, scale-down
- ✅ **Responsive sizing**: Width and height control
- ✅ **Border radius**: Themed rounded corners
- ✅ **Loading strategies**: Eager and lazy loading
- ✅ **Event handling**: Load, error, and click handlers
- ✅ **Accessibility**: Alt text support
- ✅ **Conditional traits**: Uses `$test()` for conditional styling
- ✅ **Automatic cleanup**: Event listeners and subscriptions are cleaned up when elements are removed from DOM

## Migration from v2.0
