import { div } from '../config';
import { Code } from './Code';

const Header = (txt: string) => div(['style', 'backgroundColor', 'rgba(0,0,0,0.1)'], ['style', 'padding', '10px'])(txt);
const Cell = (...content: any[]) =>
  div(
    ['style', 'padding', '10px'],
    ['style', 'borderBottom', '1px solid rgba(0,0,0,0.1)'],
    ['style', 'fontSize', '13px'],
    ['style:tablet', 'fontSize', '16px'],
  )(...content);

export const FAQ = () =>
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
      div(['style', 'fontSize', '32px'], ['style', 'textAlign', 'center'])('FAQ & More'),
      div(
        ['style', 'opacity', 0.5],
        ['style', 'textAlign', 'center'],
      )(`OEM can do a lot more than you might think. Here are some common issues and commonly asked questions.`),
      div(
        ['style', 'borderRadius', '5px'],
        ['style', 'boxSizing', 'border-box'],
        ['style', 'display', 'grid'],
        ['style', 'gridTemplateColumns', '1fr 1fr'],
        ['style', 'width', '100%'],
      )(
        Header('Question'),
        Header('Answer'),
        Cell('Is it secure?'),
        Cell('There is no insert html functionality'),
        Cell("What's a good use case?"),
        Cell('Creating web apps or web components or writing DOM manipulation code in a much more sane way'),
        Cell('Why is it said to be "AI friendly"?'),
        Cell(
          `The LOB syntax is formulaic and declarative which makes it easy for AI to parse and understand. Therefore your IDE AI tools have no problem providing you with helpful suggestions and auto-completions. Also, theoretically speaking, the trait pattern gives you the ability to create a DSL that would/could train your own model against.`,
        ),
        Cell('Does it support SVG?'),
        Cell('Yep, just use ', Code('SVG'), ' instead of ', Code('HTML'), ' as your template function'),
      ),
    ),
  );
