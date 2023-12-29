const filter = process.argv.slice(2).join('');

export function runner(tests: [string, ...[string, Test][]][]) {
  const sandbox: HTMLElement = document.querySelector('#test-sandbox');
  const results: HTMLElement = document.querySelector('#test-results');
  results.style.display = 'grid';
  results.style.columnGap = '10px';
  results.style.rowGap = '2px';
  results.style.gridTemplateColumns = 'auto auto auto 1fr';

  tests.forEach(([module, ...assertions]) => {
    assertions
      .filter((t) => {
        const filterString = module + t[0].split(' ').join('');
        const filterSearch = filterString.search(filter);
        return filterSearch > -1;
      })
      .forEach(([desc, test]) => {
        let testResult;
        try {
          testResult = test(sandbox);
        } catch (err) {
          testResult = { pass: false, message: err.message };
        }
        const statusEl = document.createElement('div');
        statusEl.style.fontFamily = 'monospace';
        statusEl.style.fontSize = '14px';
        statusEl.style.color = testResult.pass ? 'green' : 'red';
        statusEl.innerText = testResult.pass ? '✔' : '✘';
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

        results.append(statusEl, moduleEl, descEl, messageEl);
      });
  });
}
