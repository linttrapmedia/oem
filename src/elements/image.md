---
name: image
description: A reactive image component with lazy loading, object-fit control, and event handlers. Supports border radius and responsive sizing.
license: MIT
metadata:
  author: Kevin Lint
  version: '1.0'
---

## Image Component

The `image` function creates an optimized image element with lazy loading support, object-fit control, border radius, and comprehensive event handling.

## Props

```typescript
type ImageProps = {
  src: string;                     // Image URL (required)
  alt: string;                     // Alt text (required)
  width?: string;                  // Image width
  height?: string;                 // Image height
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  borderRadius?: BorderRadiusToken;
  loading?: 'eager' | 'lazy';      // Load strategy
  onLoad?: () => void;             // Load event handler
  onError?: () => void;            // Error event handler
  onClick?: () => void;            // Click handler
};
```

## Example Usage

### Basic Image

```typescript
import { image } from '@/elements/image';

// Simple image
const photo = image({
  src: '/path/to/image.jpg',
  alt: 'Description of image'
});
```

### With Dimensions

```typescript
// Fixed dimensions
const fixedImage = image({
  src: '/photo.jpg',
  alt: 'Photo',
  width: '300px',
  height: '200px'
});

// Responsive width
const responsiveImage = image({
  src: '/photo.jpg',
  alt: 'Photo',
  width: '100%'
});
```

### Object Fit

```typescript
// Cover (default) - fills area, may crop
const coverImage = image({
  src: '/photo.jpg',
  alt: 'Photo',
  width: '400px',
  height: '300px',
  objectFit: 'cover'
});

// Contain - fits within area, may have empty space
const containImage = image({
  src: '/photo.jpg',
  alt: 'Photo',
  width: '400px',
  height: '300px',
  objectFit: 'contain'
});

// Fill - stretches to fill area
const fillImage = image({
  src: '/photo.jpg',
  alt: 'Photo',
  width: '400px',
  height: '300px',
  objectFit: 'fill'
});

// Scale down - like contain, but won't upscale
const scaleDownImage = image({
  src: '/icon.png',
  alt: 'Icon',
  objectFit: 'scale-down'
});

// None - no resizing
const noneImage = image({
  src: '/photo.jpg',
  alt: 'Photo',
  objectFit: 'none'
});
```

### Border Radius

```typescript
// Small rounded corners
const roundedImage = image({
  src: '/photo.jpg',
  alt: 'Photo',
  borderRadius: 'borderRadiusSm'
});

// Medium rounded corners
const mediumRoundedImage = image({
  src: '/photo.jpg',
  alt: 'Photo',
  borderRadius: 'borderRadiusMd'
});

// Large rounded corners
const largeRoundedImage = image({
  src: '/photo.jpg',
  alt: 'Photo',
  borderRadius: 'borderRadiusLg'
});

// Fully circular (for avatars)
const circularImage = image({
  src: '/avatar.jpg',
  alt: 'Avatar',
  width: '100px',
  height: '100px',
  borderRadius: 'borderRadiusFull',
  objectFit: 'cover'
});
```

### Loading Strategy

```typescript
// Lazy loading (default) - loads when visible
const lazyImage = image({
  src: '/photo.jpg',
  alt: 'Photo',
  loading: 'lazy'
});

// Eager loading - loads immediately
const eagerImage = image({
  src: '/hero.jpg',
  alt: 'Hero image',
  loading: 'eager'
});
```

### Event Handlers

```typescript
import { $signal } from '@/core/signal';

// With load handler
const loadingState = $signal(true);

const imageWithLoad = image({
  src: '/large-photo.jpg',
  alt: 'Photo',
  onLoad: () => {
    loadingState.set(false);
    console.log('Image loaded!');
  }
});

// With error handler
const imageWithError = image({
  src: '/might-fail.jpg',
  alt: 'Photo',
  onError: () => {
    console.error('Failed to load image');
    // Show fallback or error message
  }
});

// Clickable image
const clickableImage = image({
  src: '/photo.jpg',
  alt: 'Click to view',
  onClick: () => {
    console.log('Image clicked!');
    // Open lightbox, navigate, etc.
  }
});
```

### Complete Example

```typescript
import { image } from '@/elements/image';
import { box } from '@/elements/box';
import { grid } from '@/elements/grid';
import { spinner } from '@/elements/spinner';
import { $signal } from '@/core/signal';

// Image gallery with loading states
const images = [
  { src: '/gallery/1.jpg', alt: 'Image 1' },
  { src: '/gallery/2.jpg', alt: 'Image 2' },
  { src: '/gallery/3.jpg', alt: 'Image 3' },
  { src: '/gallery/4.jpg', alt: 'Image 4' }
];

const loadingStates = $signal(images.map(() => true));
const selectedImage = $signal<number | null>(null);

const gallery = grid({
  columns: 'repeat(auto-fit, minmax(250px, 1fr))',
  gap: 'md',
  children: images.map((img, index) =>
    box({
      position: 'relative',
      borderRadius: 'borderRadiusMd',
      overflow: 'hidden',
      height: '200px',
      children: [
        // Loading spinner
        loadingStates.value[index]
          ? box({
              position: 'absolute',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              height: '100%',
              children: [spinner({ size: 'md' })]
            })
          : null,

        // Image
        image({
          src: img.src,
          alt: img.alt,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          loading: 'lazy',
          onLoad: () => {
            loadingStates.update(states => {
              const newStates = [...states];
              newStates[index] = false;
              return newStates;
            });
          },
          onClick: () => selectedImage.set(index)
        })
      ].filter(Boolean)
    })
  )
});

// Responsive hero image
const hero = box({
  position: 'relative',
  height: '400px',
  overflow: 'hidden',
  children: [
    image({
      src: '/hero-banner.jpg',
      alt: 'Hero banner',
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      loading: 'eager'
    })
  ]
});
```

## Features

- **Lazy Loading**: Default lazy loading for performance optimization
- **Object Fit**: Full control over image scaling and cropping
- **Border Radius**: Rounded corners with design tokens
- **Event Handlers**: Load, error, and click event support
- **Responsive**: Max width 100% by default, auto height
- **Accessibility**: Required alt text for screen readers
- **Clickable**: Optional click handler with pointer cursor
- **Block Display**: Proper display mode for layouts
- **Performance**: Lazy loading reduces initial page load
- **Error Handling**: onError callback for failed loads
