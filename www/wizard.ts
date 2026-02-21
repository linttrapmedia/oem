import { wizardStep, wizardData, PROMPT_TEMPLATES } from './state';
import { renderBDDManagerInline } from './bdd';

// ─── Wizard Page ─────────────────────────────────────────────────────────────

export function renderPromptWizard(): HTMLElement {
  const container = document.createElement('div');

  const heading = document.createElement('div');
  heading.innerHTML = `
    <h1>Prompt Wizard</h1>
    <p class="page-subtitle">Generate a complete OEM prompt template in 5 steps.</p>`;
  container.appendChild(heading);

  const card = document.createElement('div');
  card.className = 'oem-card';
  card.style.padding = '32px';
  container.appendChild(card);

  // Steps bar
  const stepsBar = document.createElement('div');
  stepsBar.className = 'oem-wizard-steps';
  const stepLabels = [
    { num: 1, label: 'Template' },
    { num: 2, label: 'Basic Info' },
    { num: 3, label: 'Requirements' },
    { num: 4, label: 'BDD Scenarios' },
    { num: 5, label: 'Generate' },
  ];
  stepLabels.forEach(({ num, label }) => {
    const s = document.createElement('div');
    s.className = 'oem-wizard-step';
    s.dataset['step'] = String(num);
    s.innerHTML = `<span class="num">${num}</span><span class="label">&nbsp;${label}</span>`;
    if (num < wizardStep.val()) {
      s.classList.add('done');
      s.addEventListener('click', () => { wizardStep.set(num); renderWizard(); });
    }
    if (num === wizardStep.val()) s.classList.add('active');
    stepsBar.appendChild(s);
  });
  card.appendChild(stepsBar);

  // Body
  const body = document.createElement('div');
  card.appendChild(body);

  function renderWizard() {
    // Refresh steps bar classes
    stepsBar.querySelectorAll<HTMLElement>('.oem-wizard-step').forEach(el => {
      const n = Number(el.dataset['step']);
      el.className = 'oem-wizard-step';
      if (n < wizardStep.val()) { el.classList.add('done'); el.style.cursor = 'pointer'; }
      else el.style.cursor = 'default';
      if (n === wizardStep.val()) el.classList.add('active');
    });

    body.innerHTML = '';

    switch (wizardStep.val()) {
      case 1: body.appendChild(renderStep1()); break;
      case 2: body.appendChild(renderStep2()); break;
      case 3: body.appendChild(renderStep3()); break;
      case 4: body.appendChild(renderStep4()); break;
      case 5: body.appendChild(renderStep5()); break;
    }
  }

  wizardStep.sub(renderWizard);
  renderWizard();

  return container;
}

// ─── Step 1: Template Selection ───────────────────────────────────────────────

function renderStep1(): HTMLElement {
  const wrap = document.createElement('div');
  wrap.innerHTML = '<h3 style="margin:0 0 16px">Choose a template type</h3>';

  const grid = document.createElement('div');
  grid.className = 'oem-template-grid';

  PROMPT_TEMPLATES.forEach(tpl => {
    const card = document.createElement('div');
    card.className = 'oem-template-card';
    if (wizardData.val().templateId === tpl.id) card.classList.add('selected');

    card.innerHTML = `
      <div class="oem-template-card__icon">${tpl.icon}</div>
      <div class="oem-template-card__name">${tpl.name}</div>
      <div class="oem-template-card__desc">${tpl.description}</div>`;

    card.addEventListener('click', () => {
      grid.querySelectorAll('.oem-template-card').forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      wizardData.reduce(d => ({
        ...d,
        templateId: tpl.id,
        pattern: tpl.pattern,
        requirements: d.requirements || tpl.defaultRequirements,
        name: d.name || tpl.name,
        description: d.description || tpl.description,
      }));
    });

    grid.appendChild(card);
  });

  wrap.appendChild(grid);
  wrap.appendChild(renderNav(
    null,
    () => {
      if (!wizardData.val().templateId) {
        const msg = document.createElement('div');
        msg.className = 'oem-callout oem-callout--warning';
        msg.innerHTML = '<strong>⚠️ Required</strong>Please select a template type.';
        wrap.insertBefore(msg, grid);
        setTimeout(() => msg.remove(), 2500);
        return;
      }
      wizardStep.set(2);
    },
    'Next: Basic Info →'
  ));

  return wrap;
}

// ─── Step 2: Basic Info ───────────────────────────────────────────────────────

function renderStep2(): HTMLElement {
  const wrap = document.createElement('div');
  wrap.innerHTML = '<h3 style="margin:0 0 16px">Basic information</h3>';

  const data = wizardData.val();

  // Name
  const nameGroup = field('Name', 'text', 'e.g. User Dashboard', data.name, (v) =>
    wizardData.reduce(d => ({ ...d, name: v }))
  );

  // Description
  const descGroup = field('Description', 'text', 'A brief one-line summary', data.description, (v) =>
    wizardData.reduce(d => ({ ...d, description: v }))
  );

  // Pattern
  const patternGroup = fieldSelect('Pattern', [
    'documentation', 'crud-list', 'conversational-ui', 'data-visualization',
    'multi-step-flow', 'form', 'data-display', 'custom',
  ], data.pattern, (v) => wizardData.reduce(d => ({ ...d, pattern: v })));

  wrap.appendChild(nameGroup);
  wrap.appendChild(descGroup);
  wrap.appendChild(patternGroup);

  wrap.appendChild(renderNav(
    () => wizardStep.set(1),
    () => {
      const d = wizardData.val();
      if (!d.name.trim()) {
        const inp = wrap.querySelector<HTMLInputElement>('input');
        if (inp) { inp.style.borderColor = '#ef4444'; inp.focus(); }
        return;
      }
      wizardStep.set(3);
    },
    'Next: Requirements →'
  ));

  return wrap;
}

// ─── Step 3: Requirements ─────────────────────────────────────────────────────

function renderStep3(): HTMLElement {
  const wrap = document.createElement('div');
  wrap.innerHTML = '<h3 style="margin:0 0 4px">Requirements</h3><p style="color:#737373;font-size:13px;margin:0 0 16px">Describe what the app should do. Markdown is supported.</p>';

  const textarea = document.createElement('textarea');
  textarea.className = 'oem-textarea';
  textarea.style.minHeight = '280px';
  textarea.style.fontFamily = "'SF Mono', Monaco, Consolas, monospace";
  textarea.style.fontSize = '12px';
  textarea.value = wizardData.val().requirements;
  textarea.addEventListener('input', () => {
    wizardData.reduce(d => ({ ...d, requirements: textarea.value }));
  });
  wrap.appendChild(textarea);

  const hint = document.createElement('p');
  hint.className = 'oem-form-hint';
  hint.textContent = 'Tip: Break requirements into sections with ### headings for clarity.';
  wrap.appendChild(hint);

  wrap.appendChild(renderNav(
    () => wizardStep.set(2),
    () => wizardStep.set(4),
    'Next: BDD Scenarios →'
  ));

  return wrap;
}

// ─── Step 4: BDD Scenarios ────────────────────────────────────────────────────

function renderStep4(): HTMLElement {
  const wrap = document.createElement('div');
  wrap.innerHTML = '<h3 style="margin:0 0 4px">BDD Scenarios</h3><p style="color:#737373;font-size:13px;margin:0 0 16px">Add Given/When/Then acceptance scenarios for your prompt.</p>';

  wrap.appendChild(renderBDDManagerInline(
    wizardData.val().scenarios,
    (scenarios) => wizardData.reduce(d => ({ ...d, scenarios }))
  ));

  wrap.appendChild(renderNav(
    () => wizardStep.set(3),
    () => wizardStep.set(5),
    'Next: Generate →'
  ));

  return wrap;
}

// ─── Step 5: Generate Output ──────────────────────────────────────────────────

function renderStep5(): HTMLElement {
  const wrap = document.createElement('div');
  wrap.innerHTML = '<h3 style="margin:0 0 16px">Generated Prompt</h3>';

  const data = wizardData.val();
  const tpl = PROMPT_TEMPLATES.find(t => t.id === data.templateId);

  const output = buildPromptMarkdown(data, tpl?.name ?? data.name);

  const pre = document.createElement('div');
  pre.className = 'oem-output';
  pre.textContent = output;
  wrap.appendChild(pre);

  // Actions row
  const actions = document.createElement('div');
  actions.style.cssText = 'display:flex;gap:8px;flex-wrap:wrap';

  const copyBtn = document.createElement('button');
  copyBtn.className = 'oem-btn oem-btn--primary';
  copyBtn.innerHTML = '📋 Copy Prompt';
  copyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(output).then(() => {
      copyBtn.textContent = '✓ Copied!';
      setTimeout(() => { copyBtn.innerHTML = '📋 Copy Prompt'; }, 1500);
    });
  });

  const downloadBtn = document.createElement('button');
  downloadBtn.className = 'oem-btn oem-btn--secondary';
  downloadBtn.innerHTML = '⬇ Download .md';
  downloadBtn.addEventListener('click', () => {
    const blob = new Blob([output], { type: 'text/markdown' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `${(data.name || 'prompt').toLowerCase().replace(/\s+/g, '-')}.md`;
    a.click();
    URL.revokeObjectURL(a.href);
  });

  const resetBtn = document.createElement('button');
  resetBtn.className = 'oem-btn oem-btn--ghost';
  resetBtn.textContent = 'Start Over';
  resetBtn.addEventListener('click', () => {
    wizardData.set({ templateId: '', name: '', description: '', pattern: '', requirements: '', scenarios: [] });
    wizardStep.set(1);
  });

  actions.appendChild(copyBtn);
  actions.appendChild(downloadBtn);
  actions.appendChild(resetBtn);
  wrap.appendChild(actions);

  wrap.appendChild(renderNav(() => wizardStep.set(4), null, ''));

  return wrap;
}

// ─── Prompt Markdown Builder ──────────────────────────────────────────────────

function buildPromptMarkdown(data: ReturnType<typeof wizardData.val>, templateName: string): string {
  const scenariosMd = data.scenarios.length === 0
    ? ''
    : '\n## BDD Scenarios\n\n' + data.scenarios.map(s => {
        const steps = s.steps.map(st => `  ${st.type} ${st.text}`).join('\n');
        return `### Scenario: ${s.title}\n\`\`\`gherkin\n${steps}\n\`\`\``;
      }).join('\n\n');

  const criteriaMd = data.scenarios.length === 0
    ? ''
    : '\n## Acceptance Criteria\n\n' + data.scenarios.map(s =>
        s.steps
          .filter(st => st.type === 'Then' || st.type === 'And')
          .map(st => `- [ ] ${st.text}`)
          .join('\n')
      ).filter(Boolean).join('\n');

  return `---
name: ${data.name || templateName}
description: ${data.description || 'A ' + templateName.toLowerCase() + ' built with OEM'}
license: MIT
metadata:
  author:
  version: '1.0'
  pattern: ${data.pattern || 'custom'}
---

# ${data.name || templateName}

${data.description ? data.description + '\n' : ''}
## Requirements
${data.requirements ? '\n' + data.requirements : '\n<!-- Add your requirements here -->'}
${scenariosMd}
${criteriaMd}
`.trim();
}

// ─── Nav Helpers ─────────────────────────────────────────────────────────────

function renderNav(
  onBack: (() => void) | null,
  onNext: (() => void) | null,
  nextLabel: string
): HTMLElement {
  const nav = document.createElement('div');
  nav.className = 'oem-wizard-nav';

  const backBtn = document.createElement('button');
  backBtn.className = 'oem-btn oem-btn--secondary';
  backBtn.textContent = '← Back';
  if (onBack) {
    backBtn.addEventListener('click', onBack);
  } else {
    backBtn.style.visibility = 'hidden';
  }

  nav.appendChild(backBtn);

  if (onNext && nextLabel) {
    const nextBtn = document.createElement('button');
    nextBtn.className = 'oem-btn oem-btn--primary';
    nextBtn.textContent = nextLabel;
    nextBtn.addEventListener('click', onNext);
    nav.appendChild(nextBtn);
  }

  return nav;
}

function field(
  label: string,
  type: string,
  placeholder: string,
  value: string,
  onChange: (v: string) => void
): HTMLElement {
  const group = document.createElement('div');
  group.className = 'oem-form-group';
  const lbl = document.createElement('label');
  lbl.className = 'oem-form-label';
  lbl.textContent = label;
  const inp = document.createElement('input');
  inp.type = type;
  inp.className = 'oem-input';
  inp.placeholder = placeholder;
  inp.value = value;
  inp.addEventListener('input', () => onChange(inp.value));
  group.appendChild(lbl);
  group.appendChild(inp);
  return group;
}

function fieldSelect(
  label: string,
  options: string[],
  selected: string,
  onChange: (v: string) => void
): HTMLElement {
  const group = document.createElement('div');
  group.className = 'oem-form-group';
  const lbl = document.createElement('label');
  lbl.className = 'oem-form-label';
  lbl.textContent = label;
  const sel = document.createElement('select');
  sel.className = 'oem-select';
  for (const opt of options) {
    const o = document.createElement('option');
    o.value = opt;
    o.textContent = opt;
    o.selected = opt === selected;
    sel.appendChild(o);
  }
  sel.addEventListener('change', () => onChange(sel.value));
  group.appendChild(lbl);
  group.appendChild(sel);
  return group;
}
