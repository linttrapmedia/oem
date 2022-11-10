import { ROUTES, tags } from '../../config';
import { Documentation } from './common/Documentation';
import { Section } from './common/Section';
import { Snippet } from './common/Snippet';
const { div } = tags;

export function StatePage() {
  return Documentation({
    prev: ['Html', ROUTES.HTML],
    next: ['Styling', ROUTES.STYLING],
    content: div(['flex', 'column', 40])(
      Section({
        title: `State.Atom<T>`,
        subtitle: `The \`State.Atom\` is a miniature event bus.`,
        content: Snippet(`// Create an atom
const msg = State.Atom<string>('hello');

// get an atom
console.log(msg.get()); // outputs => 'hello'

// subscribe to an atom
msg.sub((val) => console.log(val));

// set an atom (which calls all subscribers)
msg.set('HELLO'); // outputs => 'HELLO'`),
      }),
      Section({
        subtitle: `Props`,
        content: div(['flex', 'column', 10, 'start', 'start'])(
          ...[
            ['get', '(): T => _atom'],
            ['set', '(atom: T) => T', 'set the current value'],
            ['sub', '(cb: (atom: T) => any) => void', 'subscribe to changes'],
          ].map(([k, v, d]) =>
            div(['flex', 'row', 20, 'center', 'center'], ['style', 'flexWrap', 'wrap'], ['style', 'fontSize', '14px'])(
              div()(k),
              div()(Snippet(v, 'typescript', true)),
              div()(d),
            ),
          ),
        ),
      }),
      Section({
        title: '`Trait.State`',
        subtitle: 'With the `Trait.State` trait you can implement dom reactivity. Example:',
        content: Snippet(
          `const textAtom = State.Atom<string>(null);

const html = Template.Html({
  on_text_input: Trait.OnTextInput,
  on_text_update: Trait.State(textAtom, Trait.InnerText), 
});

return html('div')(
  html('input', ['on_text_input', textAtom.set])(),
  html('div', ['on_text_update', textAtom.get])(),
);`,
        ),
      }),
      Section({
        title: `State.Array<T>`,
        subtitle: `Using \`State.Array\` allows you to mutate the array value with most of the native array methods you're already familiar with.`,
        content: div(['flex', 'column', 10, 'start', 'start'])(
          ...[
            ['get', '(): T => _atom'],
            ['set', '(atom: T) => T', 'set the current value'],
            ['sub', '(cb: (atom: T) => any) => void', 'subscribe to changes'],
            ['at', '(index: number) => T'],
            ['concat', '(...items: ConcatArray<T>[]) => T[]'],
            ['copyWithin', '(target: number, start: number, end?: number) => T[]'],
            ['entries', '() => IterableIterator<[number, T]>'],
            ['every', '(predicate: (value: T, index: number, array: T[]) => unknown, thisArg?: any) => boolean'],
            ['fill', '(value: T, start?: number, end?: number) => T[]'],
            ['filter', '(predicate: (value: T, index: number, array: T[]) => unknown, thisArg?: any) => T[]'],
            ['filterSet', '(predicate: (value: T, index: number, array: T[]) => unknown, thisArg?: any) => T[]'],
            ['find', '(predicate: (value: T, index: number, obj: T[]) => unknown, thisArg?: any) => T | undefined'],
            ['findIndex', '(predicate: (value: T) => value is T, thisArg?: any) => number'],
            ['flat', '(depth?: number) => T[]'],
            ['flatSet', '(depth?: number) => T[]'],
            ['pop', '() => T | undefined'],
            ['push', '(...items: T[]) => number'],
          ].map(([k, v, d]) =>
            div(['flex', 'row', 20, 'center', 'center'], ['style', 'flexWrap', 'wrap'], ['style', 'fontSize', '14px'])(
              div()(k),
              div()(Snippet(v, 'typescript', true)),
              div()(d),
            ),
          ),
        ),
      }),
      Section({
        title: 'Application',
        subtitle: `Cutting down on boilerplate is a big part of the design philosophy of this library. Here's an example of how you can use \`State.Array\` to add, remove, and update items in a list.`,
        content: Snippet(`const ary = State.Array<string>(['one']);
ary.push('two', 'three'); // ['one', 'two', 'three']
ary.filter((i) => i !== 'three'); // ['one', 'two']
ary.pop(); // ['two']
...`),
      }),
    ),
  });
}
