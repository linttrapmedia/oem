import fs from 'fs';
import jsdom from 'jsdom';
import colors from './util/colors';
const { JSDOM } = jsdom;
let failures = '';
export {};

const unitTestCode = await Bun.build({
  entrypoints: ['test/unit.ts'],
  target: 'browser',
  define: {
    'process.env.NODE_ENV': '"production"',
    'process.argv': JSON.stringify(process.argv) ?? `[]`,
  },
});

const sourceCode = await Promise.all(unitTestCode.outputs.map(async (file) => await file.text()));

fs.writeFileSync(
  './test/results/unit.html',
  `<html>
    <head>
      <title>OEM Element Unit Tests</title>
      <script>${sourceCode}</script>
    </head>
    <body>
      <div id="test-results"></div>
      <div id="test-sandbox"></div>
    </body>
  </html>`,
  'utf8',
);

// run tests in jsdom
JSDOM.fromFile('./test/results/unit.html', {
  pretendToBeVisual: true,
  runScripts: 'dangerously',
  resources: 'usable',
}).then((dom) => {
  const passes = dom.window.document.querySelectorAll('.pass') as NodeListOf<HTMLElement>;
  const fails = dom.window.document.querySelectorAll('.fail') as NodeListOf<HTMLElement>;

  passes.forEach((pass) => {
    console.log(
      colors.FgGreen,
      pass.innerText,
      colors.FgWhite,
      (pass.nextSibling as any).innerText,
      ((pass.nextSibling as any).nextSibling as any).innerText,
    );
  });

  fails.forEach((fail) => {
    console.log(
      colors.FgRed,
      fail.innerText,
      colors.FgRed,
      (fail.nextSibling as any).innerText,
      ((fail.nextSibling as any).nextSibling as any).innerText,
      ((fail.nextSibling as any).nextSibling as any).nextSibling
        ? '- ' + ((fail.nextSibling as any).nextSibling as any).nextSibling.innerText
        : '',
      colors.FgWhite,
    );
    failures += [
      fail.innerText,
      (fail.nextSibling as any).innerText,
      ((fail.nextSibling as any).nextSibling as any).innerText,
      (((fail.nextSibling as any).nextSibling as any).nextSibling as any).innerText,
    ].join(' ');
  });
  console.log('');
  console.log(
    'Passes:',
    passes.length,
    'Fails:',
    fails.length,
    'Time:',
    dom.window.performance.now().toFixed(3) + 'ms',
  );
  console.log('');

  // log
  fs.writeFileSync('./test/results/unit.txt', fails.length > 0 ? failures : '', 'utf8');
});
