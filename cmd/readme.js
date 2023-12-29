const fs = require('fs');
const { traitJsdoc2md, stateJsdoc2md } = require('./util/docs');

const readme = `# O E M

[oem.js.org](https://oem.js.org)

## Why OEM?
All a ui library needs to do is provide an easy way to generate html and a sane way to regenerate it when something happens. It also helps if there's an easy way to extend it. Do we really need complicated libraries, languages and frameworks to do that? I don't think so. I think we can do it with regular ol' javascript and a set of easy-to-follow conventions. That's what OEM is.

## It's Just Patterns

At the heart of OEM sits a single ~20 LOC "html" function. The function implements a convention for chaining together behavior using a single isomorphic syntax. This includes: styling, reactivity, state and whatever else you can think of. Each behavior in OEM is implemented as a pure function called a "trait". OEM includes a small standard library of traits to do basic things but don't worry, that's intentional. Traits are the core units of your application and therefore you will want to write your own or use some from the community. [Community traits](https://oem.js.org/?page=traits) are made available on the oem website. Feel free to [contribute](#contributing) your own! 

\`\`\`
npm i @linttrapmedia/oem
\`\`\`

## TOC
- [Generating HTML](#generating-html)
- [Regenerating HTML](#regenerating-html)
- [Traits](#traits)
- [State](#state)
- [Utility](#utility)
- [Contributing](#contributing)

## Generating HTML
Before you can output any html, you need to create a template engine with the \`Html\` function. Like this:

\`\`\`typescript
const html = Html();
\`\`\`

At this point \`html\` is an object with a function per html tag which can be destructured like so:

\`\`\`typescript
const { div, span } = Html();
\`\`\`

However the \`div\` and \`span\` functions don't do anything yet. You need to declare the behavior you want them to have. This is done with an object literal where the keys are the attributes your html will have and the values are the custom behaviors you're declaring. Here's an example of a \`div\` tag defining an \`inner_text\` attribute who's behavior is determined by the \`InnerText\` function (called a "Trait", more on this later).


\`\`\`typescript
// A. Tag you plan to use 
// B. New template engine instance
// C. Attribute name you want to use
// D. New trait instance you want to use
// E. Trait instance arguments (InnerText takes in a single argument of string for it's inner text)

//       A        B          C           D 
const { div } = Html({ inner_text: InnerText() });
\`\`\`

The tag functions then use the attributes for their arguments as a list of arrays. Each array takes in the attribute name as it's first argument with the rest of the arguments being passed to the trait instance function. Here's an example of using the \`div\` tag with the \`inner_text\` attribute:

\`\`\`typescript
//      C            E
['inner_text', 'Hello World']
\`\`\`

Implemented, it looks like this:
\`\`\`typescript
div(['inner_text', 'Hello World']) // => <div>Hello World</div>
span(['inner_text', 'Hello World']) // => <span>Hello World</span>
\`\`\`

It's probably easier to understand what's happening through the following diagram:

![Trait Mapping](docs/trait-mapping-inner-text.png)

Attributes can also be chained. Imagine we had also declared a \`font_size: FontSize()\` trait on the template instance, used together they would look like this:
\`\`\`typescript
div(['inner_text', 'Hello World'], ['font_size', 14]) // => <div style="font-size: 14px;">Hello World</div>
\`\`\`

We've now solved the problem of generating html. However, we still need a way to regenerate the html when something happens. This is where the \`Subscribe\` trait comes in.

## Regenerating HTML
Regenerating html is as simple as using the [Subscribe](src/trait/Subscribe.ts) Trait which auto subscribes traits to a an event bus of some kind. OEM makes use of the [Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) Object to turn Javascript's native data objects into event buses under the namespace "State" making them reactive and easier to work with. Using \`Subscribe\` together with \`State\` is the easiest way to make your html reactive.

Here's an example using the \`State.Number\` function, a wrapper around the native \`Number\` object, preserving it's native methods but adding a few extra helpers like \`add\`, \`subtract\` and \`sub\` in order to make it reactive and easier to work with:

\`\`\`typescript
const count = State.Number(0);
\`\`\`

The \`count\` object now has all the normal functions of the standard built-in javascript \`Number\` plus more. You can subscribe to changes with \`count.sub(() => ...)\` or use any number of the extended mutation helper functions like \`count.add(1)\` and \`count.subtract(1)\`.

### Example
Here's an example counter component which puts everything together. In the real world this code would be much smaller as you'd probably have a master template engine instance being used across multiple components. The total lines of code of the example below coupled with the "framework" code is ~80 LOC!

\`\`\`typescript

import { Append, Html, InnerText, EventListener, State, Subscribe } from '@linttrapmedia/oem';

function CounterExample() {

  // 1. Declare state
  const count = State.Number(0, {
    add: (curr: number, n:number) => curr + n,
    subtract: (curr: number, n:number) => curr - n
  });
  const add = () => count(['add', 1])
  const subtract = () => count(['subtract', 1]));

  // 2. Declare template engine
  const { div, button } = Html({
    append: Append(),
    onclick: EventListener({ event: 'click' }), 
    inner_text: InnerText(),
    inner_text_on_count: Subscribe(count, InnerText)
  });

  // 3. Declare DOM
  return div(
    ['append',
      button(['inner_text','-'], ['onclick', add]),
      div(['inner_text_on_count', count.get]),
      button(['inner_text','+'], ['onclick', subtract])
    ]);

}
\`\`\`

## Traits
Trait's are simple functions with the following signature: \`(el: HTMLElement): HTMLElement\`. Something like this:

\`\`\`typescript
function UseSuffix(el: HTMLElement, suffix?:string){
  el.innerText = prefix + el.innerText + suffix;
  return el;
}
\`\`\`

However, it's good practice to wrap the trait in a config function as one more level of abstraction makes it easier to use and evolve.

\`\`\`typescript
function UseSuffix(options?: { punctuation?: string }){
  return function(el: HTMLElement, suffix?:string){
    el.innerText = el.innerText + suffix + options.punctuation ?? '';
    return el;
  }
}
\`\`\`

### Mapping & Using Traits
Traits are mapped to the template engine instance like so:
\`\`\`typescript
const html = Html({
  suffix: UseSuffix({ punctuation: '!' }) 
});
\`\`\`

All the traits mapped to the template engine are exposed to the template tags as arrays. The first argumentin the array is the assigned attribute name and the rest come from the trait functions parameters (excluding the first argument which is the element itself). Therefore the trait function \`function(el: HTMLElement, prefix?:string)\` mapped to an attribute name of \`suffix\` translates to this: 
\`\`\`typescript
// A = attribute name
// B = trait function sufix argument
//  ⌄ A ⌄    ⌄ B ⌄
[ 'suffix', 'jack' ]
\`\`\`

Usage then looks like this:
\`\`\`typescript
const { div } = html;
div(['suffix', 'jack']) // => <div>... jack!</div>
\`\`\`

Here's a quick diagram illustrating how things are being wired up:

![Trait Mapping](docs/trait-mapping-custom.png)

### Html Library
OEM ships with a core set of test-covered traits out of the box. See source code for examples and implementation details.

${traitJsdoc2md('./src/html/traits')}

## State
"State" objects are event buses wrapped around standard javascript and application objects making them reactive and easier to work with. They are used to store state and subscribe to changes.


## Utility
TBD

## Contributing
Go to the [oem-website](https://github.com/linttrapmedia/oem-website) repo and follow it's instructions on how to add community traits.
`;

fs.writeFileSync('./README.md', readme, 'utf8');
