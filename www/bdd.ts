import {
  Template,
  useEventTrait,
  useStyleTrait,
  useTextContentTrait,
  useInnerHTMLTrait,
  useAttributeTrait,
  useClassNameTrait,
  useInputEventTrait,
  useInputValueTrait,
  $test,
} from '../src/registry';
import {
  bddScenarios,
  bddEditingId,
  bddFormData,
  type BDDScenario,
  type BDDStep,
} from './state';

const [tag, trait] = Template({
  event:  useEventTrait,
  style:  useStyleTrait,
  text:   useTextContentTrait,
  html:   useInnerHTMLTrait,
  attr:   useAttributeTrait,
  cls:    useClassNameTrait,
  input:  useInputEventTrait,
  value:  useInputValueTrait,
});

// ─── Helpers ────────────────────────────────────────────────────────────────

function uid(): string {
  return Math.random().toString(36).slice(2, 10);
}

function keyword(type: BDDStep['type']): HTMLElement {
  const span = document.createElement('span');
  span.className = `oem-gherkin__keyword oem-gherkin__keyword--${type.toLowerCase()}`;
  span.textContent = type + ' ';
  return span;
}

function renderGherkin(steps: BDDStep[]): HTMLElement {
  const div = document.createElement('div');
  div.className = 'oem-gherkin';
  for (const step of steps) {
    const row = document.createElement('div');
    row.className = 'oem-gherkin__step';
    row.appendChild(keyword(step.type));
    row.appendChild(document.createTextNode(step.text));
    div.appendChild(row);
  }
  return div;
}

// ─── Form ────────────────────────────────────────────────────────────────────

function renderBDDForm(onSave: (s: BDDScenario) => void, onCancel: () => void): HTMLElement {
  const form = document.createElement('div');
  form.className = 'oem-card';
  form.style.marginBottom = '0';

  // Title field
  const titleGroup = document.createElement('div');
  titleGroup.className = 'oem-form-group';
  titleGroup.innerHTML = '<label class="oem-form-label">Scenario Title</label>';
  const titleInput = document.createElement('input');
  titleInput.className = 'oem-input';
  titleInput.placeholder = 'e.g. User logs in successfully';
  titleInput.value = bddFormData.val().title;
  titleInput.addEventListener('input', () => {
    bddFormData.reduce(f => ({ ...f, title: titleInput.value }));
  });
  titleGroup.appendChild(titleInput);
  form.appendChild(titleGroup);

  // Steps
  const stepsLabel = document.createElement('label');
  stepsLabel.className = 'oem-form-label';
  stepsLabel.textContent = 'Steps';
  form.appendChild(stepsLabel);

  const stepsList = document.createElement('div');
  stepsList.id = 'bdd-steps-list';
  form.appendChild(stepsList);

  function renderStepsList() {
    stepsList.innerHTML = '';
    const steps = bddFormData.val().steps;
    steps.forEach((step, i) => {
      const row = document.createElement('div');
      row.className = 'oem-bdd-step-row';

      const typeSelect = document.createElement('select');
      typeSelect.className = 'oem-select oem-select--sm';
      ['Given', 'When', 'Then', 'And'].forEach(t => {
        const opt = document.createElement('option');
        opt.value = t;
        opt.textContent = t;
        opt.selected = t === step.type;
        typeSelect.appendChild(opt);
      });
      typeSelect.addEventListener('change', () => {
        bddFormData.reduce(f => {
          const updated = [...f.steps];
          updated[i] = { ...updated[i], type: typeSelect.value as BDDStep['type'] };
          return { ...f, steps: updated };
        });
      });

      const textInput = document.createElement('input');
      textInput.className = 'oem-input';
      textInput.placeholder = 'step description...';
      textInput.value = step.text;
      textInput.addEventListener('input', () => {
        bddFormData.reduce(f => {
          const updated = [...f.steps];
          updated[i] = { ...updated[i], text: textInput.value };
          return { ...f, steps: updated };
        });
      });

      const removeBtn = document.createElement('button');
      removeBtn.className = 'oem-btn oem-btn--ghost oem-btn--sm';
      removeBtn.textContent = '✕';
      removeBtn.title = 'Remove step';
      removeBtn.addEventListener('click', () => {
        bddFormData.reduce(f => ({
          ...f,
          steps: f.steps.filter((_, idx) => idx !== i),
        }));
        renderStepsList();
      });

      row.appendChild(typeSelect);
      row.appendChild(textInput);
      row.appendChild(removeBtn);
      stepsList.appendChild(row);
    });
  }

  bddFormData.sub(() => renderStepsList());
  renderStepsList();

  // Add step button
  const addStepBtn = document.createElement('button');
  addStepBtn.className = 'oem-btn oem-btn--ghost oem-btn--sm';
  addStepBtn.style.marginBottom = '20px';
  addStepBtn.innerHTML = '+ Add Step';
  addStepBtn.addEventListener('click', () => {
    bddFormData.reduce(f => ({
      ...f,
      steps: [...f.steps, { type: 'And', text: '' }],
    }));
  });
  form.appendChild(addStepBtn);

  // Actions
  const actions = document.createElement('div');
  actions.style.cssText = 'display:flex;gap:8px';

  const saveBtn = document.createElement('button');
  saveBtn.className = 'oem-btn oem-btn--primary';
  saveBtn.textContent = 'Save Scenario';
  saveBtn.addEventListener('click', () => {
    const data = bddFormData.val();
    if (!data.title.trim()) {
      titleInput.style.borderColor = '#ef4444';
      titleInput.focus();
      return;
    }
    titleInput.style.borderColor = '';
    onSave({
      id: data.id || uid(),
      title: data.title,
      steps: data.steps.filter(s => s.text.trim()),
    });
  });

  const cancelBtn = document.createElement('button');
  cancelBtn.className = 'oem-btn oem-btn--secondary';
  cancelBtn.textContent = 'Cancel';
  cancelBtn.addEventListener('click', onCancel);

  actions.appendChild(saveBtn);
  actions.appendChild(cancelBtn);
  form.appendChild(actions);

  return form;
}

// ─── Main BDD Manager ─────────────────────────────────────────────────────────

export function renderBDDManager(): HTMLElement {
  const container = document.createElement('div');

  // Header row
  const header = document.createElement('div');
  header.style.cssText = 'display:flex;align-items:center;justify-content:space-between;margin-bottom:20px;gap:10px';

  const heading = document.createElement('div');
  heading.style.cssText = 'flex:1';
  heading.innerHTML = '<h2 style="margin:0">Scenarios <span style="font-size:13px;font-weight:400;color:#737373" id="bdd-count"></span></h2>';

  const addBtn = document.createElement('button');
  addBtn.className = 'oem-btn oem-btn--primary';
  addBtn.innerHTML = '+ New Scenario';
  addBtn.addEventListener('click', () => {
    bddEditingId.set('__new__');
    bddFormData.set({ id: '', title: '', steps: [{ type: 'Given', text: '' }] });
    addBtn.disabled = true;
    renderList();
  });

  const exportBtn = document.createElement('button');
  exportBtn.className = 'oem-btn oem-btn--secondary';
  exportBtn.title = 'Copy all scenarios as Gherkin';
  exportBtn.textContent = 'Export Gherkin';
  exportBtn.addEventListener('click', () => {
    const gherkin = bddScenarios.val().map(s => {
      const steps = s.steps.map(st => `  ${st.type} ${st.text}`).join('\n');
      return `Scenario: ${s.title}\n${steps}`;
    }).join('\n\n');
    navigator.clipboard.writeText(gherkin).then(() => {
      exportBtn.textContent = 'Copied!';
      setTimeout(() => { exportBtn.textContent = 'Export Gherkin'; }, 1500);
    });
  });

  header.appendChild(heading);
  header.appendChild(exportBtn);
  header.appendChild(addBtn);
  container.appendChild(header);

  // List area
  const listArea = document.createElement('div');
  container.appendChild(listArea);

  function renderList() {
    listArea.innerHTML = '';

    const countEl = document.getElementById('bdd-count');
    if (countEl) countEl.textContent = `(${bddScenarios.val().length})`;

    const scenarios = bddScenarios.val();
    const editingId = bddEditingId.val();

    // New scenario form at top
    if (editingId === '__new__') {
      const formWrapper = document.createElement('div');
      formWrapper.style.marginBottom = '16px';
      formWrapper.appendChild(renderBDDForm(
        (scenario) => {
          bddScenarios.reduce(list => [...list, scenario]);
          bddEditingId.set(null);
          addBtn.disabled = false;
          renderList();
        },
        () => {
          bddEditingId.set(null);
          addBtn.disabled = false;
          renderList();
        }
      ));
      listArea.appendChild(formWrapper);
    }

    if (scenarios.length === 0 && editingId !== '__new__') {
      const empty = document.createElement('div');
      empty.style.cssText = 'text-align:center;padding:40px;color:#737373;border:2px dashed #e5e5e5;border-radius:8px';
      empty.innerHTML = '<div style="font-size:32px;margin-bottom:8px">📋</div><div>No scenarios yet. Click "New Scenario" to add one.</div>';
      listArea.appendChild(empty);
      return;
    }

    const list = document.createElement('div');
    list.className = 'oem-bdd-list';

    for (const scenario of scenarios) {
      if (editingId === scenario.id) {
        // Inline edit form
        const formWrapper = document.createElement('div');
        bddFormData.set({ ...scenario });
        formWrapper.appendChild(renderBDDForm(
          (updated) => {
            bddScenarios.reduce(list => list.map(s => s.id === updated.id ? updated : s));
            bddEditingId.set(null);
            addBtn.disabled = false;
            renderList();
          },
          () => {
            bddEditingId.set(null);
            addBtn.disabled = false;
            renderList();
          }
        ));
        list.appendChild(formWrapper);
      } else {
        list.appendChild(renderScenarioCard(scenario, () => {
          bddEditingId.set(scenario.id);
          addBtn.disabled = true;
          renderList();
        }, () => {
          if (confirm(`Delete scenario "${scenario.title}"?`)) {
            bddScenarios.reduce(list => list.filter(s => s.id !== scenario.id));
            renderList();
          }
        }));
      }
    }

    listArea.appendChild(list);
  }

  bddScenarios.sub(renderList);
  renderList();

  return container;
}

function renderScenarioCard(
  scenario: BDDScenario,
  onEdit: () => void,
  onDelete: () => void
): HTMLElement {
  const item = document.createElement('div');
  item.className = 'oem-bdd-item';

  const header = document.createElement('div');
  header.className = 'oem-bdd-item__header';

  const title = document.createElement('div');
  title.className = 'oem-bdd-item__title';
  title.textContent = scenario.title;

  const actions = document.createElement('div');
  actions.className = 'oem-bdd-item__actions';

  const copyBtn = document.createElement('button');
  copyBtn.className = 'oem-btn oem-btn--ghost oem-btn--sm';
  copyBtn.title = 'Copy as Gherkin';
  copyBtn.textContent = '📋';
  copyBtn.addEventListener('click', () => {
    const gherkin = `Scenario: ${scenario.title}\n${scenario.steps.map(s => `  ${s.type} ${s.text}`).join('\n')}`;
    navigator.clipboard.writeText(gherkin).then(() => {
      copyBtn.textContent = '✓';
      setTimeout(() => { copyBtn.textContent = '📋'; }, 1200);
    });
  });

  const editBtn = document.createElement('button');
  editBtn.className = 'oem-btn oem-btn--ghost oem-btn--sm';
  editBtn.textContent = 'Edit';
  editBtn.addEventListener('click', onEdit);

  const deleteBtn = document.createElement('button');
  deleteBtn.className = 'oem-btn oem-btn--ghost oem-btn--sm';
  deleteBtn.style.color = '#dc2626';
  deleteBtn.textContent = 'Delete';
  deleteBtn.addEventListener('click', onDelete);

  actions.appendChild(copyBtn);
  actions.appendChild(editBtn);
  actions.appendChild(deleteBtn);
  header.appendChild(title);
  header.appendChild(actions);
  item.appendChild(header);

  const body = document.createElement('div');
  body.className = 'oem-bdd-item__body';
  body.appendChild(renderGherkin(scenario.steps));
  item.appendChild(body);

  return item;
}

// ─── Inline wizard version (subset, no heading) ───────────────────────────────

export function renderBDDManagerInline(
  scenarios: BDDScenario[],
  onChange: (scenarios: BDDScenario[]) => void
): HTMLElement {
  const localScenarios = { val: scenarios };
  const container = document.createElement('div');

  // Add button
  const addBtn = document.createElement('button');
  addBtn.className = 'oem-btn oem-btn--secondary oem-btn--sm';
  addBtn.innerHTML = '+ Add Scenario';
  addBtn.style.marginBottom = '12px';

  const listArea = document.createElement('div');
  let showingForm = false;

  function renderInlineList() {
    listArea.innerHTML = '';

    if (showingForm) {
      bddFormData.set({ id: '', title: '', steps: [{ type: 'Given', text: '' }] });
      listArea.appendChild(renderBDDForm(
        (s) => {
          localScenarios.val = [...localScenarios.val, s];
          onChange(localScenarios.val);
          showingForm = false;
          addBtn.disabled = false;
          renderInlineList();
        },
        () => {
          showingForm = false;
          addBtn.disabled = false;
          renderInlineList();
        }
      ));
      return;
    }

    if (localScenarios.val.length === 0) {
      const empty = document.createElement('div');
      empty.style.cssText = 'color:#737373;font-size:13px;padding:8px 0';
      empty.textContent = 'No scenarios added yet.';
      listArea.appendChild(empty);
      return;
    }

    for (const s of localScenarios.val) {
      const item = renderScenarioCard(s,
        () => {},
        () => {
          localScenarios.val = localScenarios.val.filter(x => x.id !== s.id);
          onChange(localScenarios.val);
          renderInlineList();
        }
      );
      listArea.appendChild(item);
    }
  }

  addBtn.addEventListener('click', () => {
    showingForm = true;
    addBtn.disabled = true;
    renderInlineList();
  });

  container.appendChild(addBtn);
  container.appendChild(listArea);
  renderInlineList();

  return container;
}
