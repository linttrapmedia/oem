import { div } from '@docs/config';
import { Code } from './Code';

const Header = (txt: string) => div(['style', 'backgroundColor', 'rgba(0,0,0,0.1)'], ['style', 'padding', '10px'])(txt);
const Cell = (txt: string) =>
  div(['style', 'padding', '10px'], ['style', 'borderBottom', '1px solid rgba(0,0,0,0.1)'])(txt);

export const CustomTrait = () =>
  div(
    ['style', 'alignItems', 'center'],
    ['style', 'boxSizing', 'border-box'],
    ['style', 'display', 'flex'],
    ['style', 'flexDirection', 'column'],
    ['style', 'gap', '50px'],
    ['style', 'justifyContent', 'center'],
  )(
    div(
      ['style', 'alignItems', 'center'],
      ['style', 'boxSizing', 'border-box'],
      ['style', 'display', 'flex'],
      ['style', 'flexDirection', 'column'],
      ['style', 'fontFamily', 'Space Grotesk'],
      ['style', 'gap', '20px'],
      ['style', 'justifyContent', 'center'],
      ['style', 'width', '100%'],
    )(
      div(['style', 'fontSize', '32px'], ['style', 'textAlign', 'center'])('Custom Traits'),
      div(
        ['style', 'opacity', 0.5],
        ['style', 'textAlign', 'center'],
      )(
        `Creating a custom trait is easy to do and gives you a powerful abstraction for code reuse throughout your application. Here's an example of a simple "FlexBox" trait.`,
      ),
      div(['style', 'fontSize', '21px'], ['style', 'textAlign', 'center'])('Step 1: Create The Trait'),
      div(
        ['style', 'opacity', 0.5],
        ['style', 'textAlign', 'center'],
      )(
        `This is all it takes to create a custom trait. Create a function with an HTMLElement element as the first argument. You can also optionally follow that with any other parameters you want to make available to you when you use your trait.`,
      ),
      div(['prism'])(`
const useMyFlexBox = (el: HTMLElement, dir: 'row' | 'column') => {
  el.style.display = 'flex';
  el.style.flexDirection = direction;
}`),
      div(['style', 'fontSize', '21px'], ['style', 'textAlign', 'center'])('Step 2: Attach The Trait To Your Template'),
      div(
        ['style', 'opacity', 0.5],
        ['style', 'textAlign', 'center'],
      )(
        `You attach the trait to your template like so. In this case 'flex' is user-defined and will be the name of your trait available to you in your tag function`,
      ),
      div(['prism'])(`const { div } = HTML({
  'flex': useMyFlexBox,
});`),
      div(['style', 'fontSize', '21px'], ['style', 'textAlign', 'center'])('Step 3: Using The Trait'),
      div(['style', 'opacity', 0.5], ['style', 'textAlign', 'center'])(
        `When using the div tag function from your template, 'flex' should be auto-magically intellisensed as well as the rest of the parameters of the `,
        Code('useMyFlexBox'),
        ` function`,
      ),
      div(['prism'])(`div(['flex', 'row'])("Hello World");`),
    ),
  );
