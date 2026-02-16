import { Test } from '@/registry';

export async function runner(tests: [string, ...Test[]][]) {
  const FILTER = new URLSearchParams(window.location.search).get('filter');
  const sandbox = document.querySelector('#test-sandbox') as HTMLElement;
  const results = document.querySelector('#test-results') as HTMLElement;
  results.style.display = 'block';
  results.style.fontFamily = 'monospace';
  results.style.fontSize = '13px';
  results.style.lineHeight = '1.6';
  results.style.whiteSpace = 'pre-wrap';

  // Stats
  let totalTests = 0;
  let passedTests = 0;
  let failedTests = 0;
  const failedDetails: {
    module: string;
    name: string;
    message: string;
    stack: string;
    locations: { file: string; line: string; col: string; raw: string }[];
    duration: number;
  }[] = [];
  const passedDetails: { module: string; name: string; duration: number }[] = [];

  const startTime = performance.now();

  // Header
  const header = document.createElement('div');
  header.style.borderBottom = '1px solid #444';
  header.style.paddingBottom = '8px';
  header.style.marginBottom = '12px';
  header.innerHTML = `<strong>Test Runner</strong>\n`;
  header.innerHTML += FILTER ? `Filter: "${FILTER}"\n` : 'Running all tests...\n';
  results.appendChild(header);

  // Summary placeholder (will update after tests complete)
  const summary = document.createElement('div');
  summary.style.padding = '8px 0';
  summary.style.borderBottom = '1px solid #444';
  summary.style.marginBottom = '12px';
  results.appendChild(summary);

  // Results container
  const resultsContainer = document.createElement('div');
  results.appendChild(resultsContainer);

  // Collect all tests to run
  const testsToRun: { module: string; test: Test }[] = [];
  for (const [module, ...assertions] of tests) {
    for (const test of assertions) {
      if (FILTER && test.name !== FILTER) continue;
      testsToRun.push({ module, test });
    }
  }

  totalTests = testsToRun.length;

  // Run tests sequentially for clearer output
  for (let i = 0; i < testsToRun.length; i++) {
    const { module, test } = testsToRun[i];
    const testStart = performance.now();
    let testResult: { pass: boolean; message?: string };

    let caughtError: Error | null = null;
    try {
      testResult = await test(sandbox);
    } catch (err: any) {
      caughtError = err instanceof Error ? err : new Error(String(err));
      testResult = { pass: false, message: caughtError.message };
    }

    const duration = performance.now() - testStart;

    if (testResult.pass) {
      passedTests++;
      passedDetails.push({ module, name: test.name, duration });
    } else {
      failedTests++;
      // Use caught error's stack, or synthesize one at call site for assertion failures
      const errorForStack = caughtError || new Error(testResult.message || 'Test failed');
      const stack = errorForStack.stack || '';
      const locations = parseStackLocations(stack);
      failedDetails.push({
        module,
        name: test.name,
        message: testResult.message || 'Unknown error',
        stack,
        locations,
        duration,
      });
      // Log error immediately so it's visible in devtools
      console.error(`FAIL: ${module} › ${test.name}`);
      console.error(`  ${testResult.message || 'Unknown error'}`);
      if (locations.length > 0) {
        console.error(`  at ${locations[0].file}:${locations[0].line}:${locations[0].col}`);
      }
      if (caughtError) console.error(caughtError);
    }

    // Update summary in real-time
    const elapsed = ((performance.now() - startTime) / 1000).toFixed(2);
    summary.innerHTML = `<span style="color:#888">Progress:</span> ${i + 1}/${totalTests} | `;
    summary.innerHTML += `<span style="color:#4ade80">✓ ${passedTests}</span> | `;
    summary.innerHTML += `<span style="color:#f87171">✗ ${failedTests}</span> | `;
    summary.innerHTML += `<span style="color:#888">${elapsed}s</span>`;
  }

  // Final summary
  const totalDuration = ((performance.now() - startTime) / 1000).toFixed(2);
  const allPassed = failedTests === 0;
  summary.innerHTML = '';
  summary.style.color = allPassed ? '#4ade80' : '#f87171';
  summary.innerHTML = allPassed
    ? `<strong>✓ All ${totalTests} tests passed</strong> (${totalDuration}s)\n`
    : `<strong>✗ ${failedTests} of ${totalTests} tests failed</strong> (${totalDuration}s)\n`;

  // Display failed tests first
  if (failedDetails.length > 0) {
    const failedSection = document.createElement('div');
    failedSection.style.marginBottom = '16px';
    failedSection.innerHTML = `<div style="color:#f87171;font-weight:bold;margin-bottom:8px">FAILED (${failedDetails.length})</div>`;

    for (const { module, name, message, locations, duration } of failedDetails) {
      const line = document.createElement('div');
      line.style.color = '#f87171';
      line.style.paddingLeft = '12px';
      line.style.marginBottom = '8px';
      line.innerHTML = `✗ <span style="color:#fca5a5">${module}</span> › ${name} <span style="color:#888">(${duration.toFixed(
        1,
      )}ms)</span>\n`;
      line.innerHTML += `  <span style="color:#fca5a5;font-size:12px">→ ${escapeHtml(
        message,
      )}</span>\n`;
      if (locations.length > 0) {
        line.innerHTML += `\n  <span style="color:#fbbf24;font-size:12px;font-weight:bold">Source:</span>\n`;
        for (const loc of locations) {
          line.innerHTML += `  <span style="color:#93c5fd;font-size:12px">  ${escapeHtml(
            loc.file,
          )}<span style="color:#fbbf24">:${loc.line}:${loc.col}</span></span>\n`;
        }
      }
      failedSection.appendChild(line);
    }
    resultsContainer.appendChild(failedSection);
  }

  // Display passed tests
  if (passedDetails.length > 0) {
    const passedSection = document.createElement('div');
    passedSection.innerHTML = `<div style="color:#4ade80;font-weight:bold;margin-bottom:8px">PASSED (${passedDetails.length})</div>`;

    for (const { module, name, duration } of passedDetails) {
      const line = document.createElement('div');
      line.style.color = '#4ade80';
      line.style.paddingLeft = '12px';
      line.innerHTML = `✓ <span style="color:#86efac">${module}</span> › ${name} <span style="color:#888">(${duration.toFixed(
        1,
      )}ms)</span>`;
      passedSection.appendChild(line);
    }
    resultsContainer.appendChild(passedSection);
  }

  // Console output
  console.log(`\n${'='.repeat(50)}`);
  console.log(`Test Results: ${allPassed ? 'ALL PASSED' : 'FAILURES DETECTED'}`);
  console.log(`${'='.repeat(50)}`);
  console.log(
    `Total: ${totalTests} | Passed: ${passedTests} | Failed: ${failedTests} | Duration: ${totalDuration}s`,
  );

  if (failedDetails.length > 0) {
    console.log(`\nFailed Tests:`);
    for (const { module, name, message, locations } of failedDetails) {
      console.log(`  ✗ ${module} › ${name}: ${message}`);
      for (const loc of locations) {
        console.log(`    at ${loc.file}:${loc.line}:${loc.col}`);
      }
    }
  }
  console.log('');

  // Throw so failures are impossible to miss
  if (failedDetails.length > 0) {
    const msg = failedDetails.map((f) => `${f.module} › ${f.name}: ${f.message}`).join('\n');
    throw new Error(`${failedTests} test(s) failed:\n${msg}`);
  }
}

function parseStackLocations(
  stack: string,
): { file: string; line: string; col: string; raw: string }[] {
  const locations: { file: string; line: string; col: string; raw: string }[] = [];
  const seen = new Set<string>();
  // Match stack frames: "at Foo (http://...file.ts:10:5)" or "at http://...file.ts:10:5"
  const frameRegex = /at\s+(?:.*?\s+\(?|)(https?:\/\/[^)\s]+)\)?/g;
  let match;
  while ((match = frameRegex.exec(stack)) !== null) {
    const url = match[1];
    // Parse file:line:col from the URL
    const urlMatch = url.match(/(?:.*\/)((?:[^/:]+\.(?:ts|js|tsx|jsx|mjs))):(\d+):(\d+)/);
    if (urlMatch) {
      const [, file, line, col] = urlMatch;
      const key = `${file}:${line}:${col}`;
      if (seen.has(key)) continue;
      seen.add(key);
      // Skip runner internals
      if (file === 'runner.ts' || file === 'runner.js') continue;
      locations.push({ file, line, col, raw: url });
    }
  }
  // Fallback: try matching plain "filename.ts:line:col" patterns (non-http stacks)
  if (locations.length === 0) {
    const plainRegex = /((?:[\w./-]+\.(?:ts|js|tsx|jsx|mjs))):(\d+):(\d+)/g;
    while ((match = plainRegex.exec(stack)) !== null) {
      const [raw, file, line, col] = match;
      const key = `${file}:${line}:${col}`;
      if (seen.has(key)) continue;
      seen.add(key);
      if (file === 'runner.ts' || file === 'runner.js') continue;
      locations.push({ file, line, col, raw });
    }
  }
  return locations;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
