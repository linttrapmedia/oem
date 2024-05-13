import { div } from '../config';

export const Justification = () =>
  div(
    ['style', 'alignItems', 'center'],
    ['style', 'boxSizing', 'border-box'],
    ['style', 'display', 'flex'],
    ['style', 'flexDirection', 'column'],
    ['style', 'gap', '20px'],
    ['style', 'justifyContent', 'center'],
    ['style', 'fontFamily', 'Space Grotesk'],
  )(
    div(['style', 'fontSize', '32px'], ['style', 'textAlign', 'center'])('How Is This Better?'),
    div(
      ['style', 'opacity', 0.5],
      ['style', 'textAlign', 'center'],
    )(
      `The code above is: State, Templating, Event Handling, Styling, Typed (both for your template engine's trait functions and styles!) all in one. This is a powerful combination that allows you to build complex applications with a small amount of code. Additionally, you will be reusing your state and template code. So really it's just the code in Step 2 that you should be comparing to other frameworks. Show me another framework that can define state, responsive styling, html and event handling in 10 lines of vanilla js, easy to read code backed by framework that is ~50 LOC with 0 dependencies and you can understand in 15 minutes.`,
    ),
  );
