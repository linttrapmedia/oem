import { Test } from '../src/types';

export async function runner(tests: [string, ...[string, Test][]][]) {
  const FILTER = '';
  const sandbox = document.querySelector('#test-sandbox') as HTMLElement;
  const results = document.querySelector('#test-results') as HTMLElement;
  results.style.display = 'grid';
  results.style.columnGap = '10px';
  results.style.rowGap = '2px';
  results.style.gridTemplateColumns = 'auto auto auto 1fr';

  for (const [module, ...assertions] of tests) {
    assertions
      .filter((t) => {
        if (FILTER) return (t[1].name as any) === FILTER;
        return true;
      })
      .forEach(async ([desc, test]) => {
        let testResult;
        try {
          testResult = await test(sandbox);
        } catch (err: any) {
          testResult = { pass: false, message: err.message };
        }
        const statusEl = document.createElement('div');
        statusEl.style.fontFamily = 'monospace';
        statusEl.style.fontSize = '14px';
        statusEl.style.color = testResult.pass ? 'green' : 'red';
        statusEl.innerText = testResult.pass ? '+' : 'x';
        statusEl.className = testResult.pass ? 'pass' : 'fail';

        const moduleEl = document.createElement('div');
        moduleEl.innerText = module;
        moduleEl.style.color = testResult.pass ? 'green' : 'red';

        const descEl = document.createElement('div');
        descEl.innerText = desc;
        descEl.style.color = testResult.pass ? 'green' : 'red';

        const messageEl = document.createElement('div');
        messageEl.innerText = testResult.message || '';
        messageEl.style.color = testResult.pass ? 'green' : 'red';

        // if test failed prepend to results
        if (!testResult.pass) {
          results.prepend(statusEl, moduleEl, descEl, messageEl);
        } else {
          results.append(statusEl, moduleEl, descEl, messageEl);
        }
      });
  }
}
