import { Test } from '@/registry';

export async function runner(tests: [string, ...Test[]][]) {
  const FILTER = new URLSearchParams(window.location.search).get('filter');
  const sandbox = document.querySelector('#test-sandbox') as HTMLElement;
  const results = document.querySelector('#test-results') as HTMLElement;
  results.style.display = 'grid';
  results.style.columnGap = '10px';
  results.style.rowGap = '2px';
  results.style.gridTemplateColumns = 'auto auto 1fr';

  for (const [module, ...assertions] of tests) {
    assertions
      .filter((t) => {
        if (FILTER) return (t.name as any) === FILTER;
        return true;
      })
      .forEach(async (test) => {
        let testResult;
        try {
          testResult = await test(sandbox);
        } catch (err: any) {
          testResult = { pass: false, message: err.message };
        }

        const moduleEl = document.createElement('div');
        moduleEl.innerText = `${module}`;
        moduleEl.style.color = testResult.pass ? 'green' : 'red';
        moduleEl.style.textAlign = 'right';

        const descEl = document.createElement('div');
        descEl.innerText = `${test.name}`;
        descEl.style.color = testResult.pass ? 'green' : 'red';

        const messageEl = document.createElement('div');
        messageEl.innerText = testResult.message || '';
        messageEl.style.color = testResult.pass ? 'green' : 'red';

        // if test failed prepend to results
        if (!testResult.pass) {
          results.prepend(moduleEl, descEl, messageEl);
        } else {
          results.append(moduleEl, descEl, messageEl);
        }
      });
  }
}
