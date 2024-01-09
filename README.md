# oem

## A novel UI library for writing reactive html with vanilla javascript

[oem.js.org →](https://oem.js.org)

## Why?

I wanted a standards-compliant, reliable, unchanging, lightweight reactive dom library that could serve as a layer one utility library to build out a suite of self-contained web components.

## Features:

- 🕊️ No Dependencies
- 💫 Reactive DOM
- 💅 Responsive Styles
- 📼 State Management
- 🧩 Typescript
- 🧱 Isomorphic Syntax
- 🪶 Flyweight Size
- 🤖 AI-Friendly
- 🔒 Secure
- 🧪 100% Test Coverage
- 💩 No Virtual DOM

## Quick Start

```
npm i @linttrap/oem
```

Also available via CDN [unpkg](https://unpkg.com/@linttrap/oem@latest/dist/oem.min.js)

## How It Works

OEM works by introducing the idea of creating your own template engine(s) which exist as a middle layer between your state and your DOM. The result is code that is highly expressive, easy to read, and easy to maintain.

### Step 1: Define State and Your Template Engine

```typescript
const count = State(1);
const count_inc = count.reduce((i) => i + 1);
const count_text = () => `#${count.get()}`;
const count_color = () => (count.get() % 2 === 0 ? 'red' : 'black');

const { div } = HTML({
  'text:count': useText(count),
  'click:event': useEvent('click'),
  'click:style': useStyle({ event:'click' }),
  'mobile:style': useStyle({ mediaMinWidth:0 }),
  'tablet:style': useStyle({ mediaMinWidth:960 }),
});
```

### Step 2: Generate Your Reactive UI

```typescript
div(
  ['text:count', count_text],
  ['click:event', count_inc],
  ['click:style', 'color', count_color],
  ['mobile:style', 'cursor', 'pointer'],
  ['mobile:style', 'display', 'flex'],
  ['mobile:style', 'gap', '10px'],
  ['mobile:style', 'fontSize', '50px'],
  ['tablet:style', 'fontSize', '80px'],
)();
```

Note: If you're using the CDN dist file all functions are available on the `window.oem` object. Example `oem.State`, `oem.HTML`, etc.

## Standard Traits

Traits are functions that are responsible for attaching a single behavior and/or trait to an html element. The following is a list of all the standard traits that come with OEM by default.

| Trait              | Description                       |
| ------------------ | --------------------------------- |
| useAttribute       | Apply attributes                  |
| useClassName       | Apply class names                 |
| useEvent           | Attach event listener             |
| useStyle           | Apply styles                      |
| useText            | Apply inner text                  |

## Custom Traits

Creating a custom trait is easy to do and gives you a powerful abstraction for code reuse throughout your application. Here's an example of a simple "FlexBox" trait.

## Step 1: Create The Trait

This is all it takes to create a custom trait. Create a function with an HTMLElement element as the first argument. You can also optionally follow that with any other parameters you want to make available to you when you use your trait.

```typescript
const useMyFlexBox = (el: HTMLElement, dir: 'row' | 'column') => {
  el.style.display = 'flex';
  el.style.flexDirection = direction;
};
```

## Step 2: Attach The Trait To Your Template

You attach the trait to your template like so. In this case 'flex' is user-defined and will be the name of your trait available to you in your tag function.

```typescript
const { div } = Template({
  flex: useMyFlexBox,
});
```

## Step 3: Using The Trait

When using the div tag function from your template, 'flex' should be auto-magically intellisensed as well as the rest of the parameters of the useMyFlexBox function.

```typescript
div(['flex', 'row'])('Hello World');
```

## OEM

©Copyright 2023 All rights reserved. Made in the USA 🇺🇸 by [Kevin Lint](http://kevinlint.com) as a product of [Lint Trap Media](http://linttrap.media).
