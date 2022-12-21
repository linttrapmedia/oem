import { DIV, Markdown } from '@oem';
import { HSLA, PAGE_WIDTH, THEME } from '../../config';

export function GoEasy() {
  return DIV.padding(100, 0)
    .column(50, 'center', 'center')
    .style('color', THEME.white.get)
    .style('width', '100%')
    .append(
      DIV.style('maxWidth', '80%')
        .style('fontSize', '64px')
        .style('fontWeight', 'bold')
        .style('textAlign', 'center')
        .innerText('Go Easy'),
      DIV
        .style('color', THEME.white.get)
        .style('maxWidth', '80%')
        .style('textAlign', 'center')
        .style('fontSize', '26px')
        .innerHtml(
          Markdown('Easy on the eyes, easy on the brain and even easier on the *business*.'),
        ),
      DIV.row(20, 'center', 'center')
        .style('flexWrap', 'wrap')
        .style('maxWidth', PAGE_WIDTH + 'px')
        .map(
          ([title, text]) =>
            DIV.backgroundColor(HSLA.white, 0.05)
              .padding(20)
              .column(20, 'center', 'center')
              .style('borderRadius', '10px')
              .style('maxWidth', '30%')
              .style('height', '200px')
              .append(
                DIV.style('textAlign', 'center')
                  .style('fontSize', '24px')
                  .style('color', HSLA.white)
                  .innerText(title),
                DIV
                  .style('color', THEME.white.alpha(0.4))
                  .style('textAlign', 'center')
                  .style('fontSize', '16px')
                  .innerText(text),
              ),
          [
            [
              'Go Native',
              'OEM is native javascript with no dependencies. No need to learn a new language or framework.',
            ],
            [
              'Scale With Ease',
              'OEM is so simple any architectural pattern will work such as the tried and true MVC pattern.',
            ],
            [
              'Save Time',
              'Code that’s easy to understand is easy to maintain and speeds up productivity all around.',
            ],
            [
              'Control Tech Debt',
              'The more control you have over your code the more time you can spend delivering features.',
            ],
            [
              'Be Agile',
              'Loose coupling and well thought out patterns paves the way for clean and clear iterative development ',
            ],
            [
              'Write Clean Code',
              'Good engineering makes everybody happy and helps keep the focus on moving the business forward.',
            ],
          ],
        ),
    );
}
