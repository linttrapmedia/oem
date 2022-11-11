import { ROUTES, tags } from '../../config';
import { Documentation } from './common/Documentation';
import { Section } from './common/Section';
import { Snippet } from './common/Snippet';
import { StateExample } from './common/StateExample';
const { div } = tags;

export function StatePage() {
  return Documentation({
    prev: ['Html', ROUTES.HTML],
    next: ['Styling', ROUTES.STYLING],
    content: div(['flex', 'column', 40])(
      Section({
        title: `State`,
        subtitle: `State is controlled by "Atoms" which are miniature event buses. The most basic type is the  \`State.Atom<T>\` atom.`,
        content: Snippet(`const pieceOfState = State.Atom<string>('hello');`),
      }),
      Section({
        subtitle: 'Props',
        content: div(['flex', 'column', 30, 'start', 'start'])(
          ...[
            ['get', '(): T => _atom', 'get the current value'],
            ['set', '(atom: T) => T', 'set the current value'],
            ['sub', '(cb: (atom: T) => any) => void', 'subscribe to changes'],
          ].map(([k, v, d]) =>
            div(['flex', 'column', 10])(
              div(['style', 'fontWeight', 'bold'])(k),
              div()(d),
              Snippet(v, 'typescript', true),
            ),
          ),
        ),
      }),
      Section({
        title: 'Trait.State',
        subtitle:
          "You can listen to changes to a State object with the `Trait.State` trait. This trait takes in the state object you're subscribing to and a trait you'd like you apply on change. You now have a reactive dom:",
        content: div(['flex', 'column', 20])(
          Snippet(
            `function StateExample() {
  const textAtom = State.Atom<string>(null);

  const { div, input } = Template.Html({
    on_text_input: Trait.OnTextInput,
    on_text_update: Trait.State(textAtom, Trait.InnerText),
  });

  return div()(
    input(['on_text_input', textAtom.set])(),
    div(['on_text_update', textAtom.get])()
  );
}`,
          ),
          StateExample(),
        ),
      }),
      Section({
        title: `Arrays`,
        subtitle: `In addition to the basic \`State.Atom\` atom, there are atoms for Javascript's built-in objects. Here's an example of the \`State.Array\` atom which allows you to __MUTATE__ the array value with most of the native array methods you're already familiar with.`,
        content: div(['flex', 'column', 30])(
          Snippet(`const ary = State.Array<string>(['one']);
ary.push('two', 'three'); // ['one', 'two', 'three']
ary.filter((i) => i !== 'three'); // ['one', 'two']
ary.pop(); // ['two']
...`),
          div(['flex', 'column', 30, 'start', 'start'])(
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
              div(['flex', 'column', 10])(
                div(['style', 'fontWeight', 'bold'])(k),
                div()(d),
                Snippet(v, 'typescript', true),
              ),
            ),
          ),
        ),
      }),
      Section({
        title: `Object`,
        subtitle: `...Coming Soon`,
      }),
      Section({
        title: `Set`,
        subtitle: `...Coming Soon`,
      }),
      Section({
        title: `Map`,
        subtitle: `...Coming Soon`,
      }),
      Section({
        title: `Number`,
        subtitle: `...Coming Soon`,
      }),
    ),
  });
}
