#!/usr/bin/env bun

import { Glob } from 'bun';
import { mkdirSync, rmSync } from 'node:fs';
import { resolve } from 'node:path';
import { extractFrontMatter } from 'scripts/helpers';

const projectRoot = resolve(import.meta.dir, '..');
const specDir = resolve(projectRoot, 'specs');
const skillsDir = resolve(specDir, 'skills');
const agentsDir = resolve(specDir, 'agents');

// Recreate the skills output directory
rmSync(skillsDir, { recursive: true, force: true });
mkdirSync(skillsDir, { recursive: true });
mkdirSync(agentsDir, { recursive: true });

// ─── Helpers ──────────────────────────────────────────────────────────────

/** Collect .md source files matching a glob, extracting frontmatter from each. */
async function collectMdFiles(pattern: string) {
  const results = [];
  for await (const file of new Glob(pattern).scan('.')) {
    const filePath = resolve(projectRoot, file);
    const content = await Bun.file(filePath).text();
    const frontMatter = extractFrontMatter(content);
    results.push({ file, filePath, content, frontMatter });
  }
  return results;
}

/** Remove YAML frontmatter block from content. */
function stripFrontMatter(content: string): string {
  return content.replace(/^---[\s\S]*?---\n*/, '').trim();
}

/** Wrap a code string in a fenced code block. */
const fence = (lang: string, code: string) => '```' + lang + '\n' + code + '\n' + '```';

/** Build a skill file header (YAML frontmatter). */
function skillHeader(name: string, description: string): string {
  return `---\nname: ${name}\ndescription: ${description}\n---`;
}

// ─── Collect source files ─────────────────────────────────────────────────

const [traitFiles, stateFiles, tokenFiles, promptFiles] = await Promise.all([
  collectMdFiles('src/traits/*.md'),
  collectMdFiles('src/states/*.md'),
  collectMdFiles('src/themes/tokens/*.md'),
  collectMdFiles('src/prompts/*.md'),
]);

// Core files have no frontmatter — read as raw text
const readCore = (name: string) =>
  Bun.file(resolve(projectRoot, `src/core/${name}`))
    .text()
    .catch(() => '');

const [templateMd, stateMd, typesMd, utilMd] = await Promise.all([
  readCore('template.md'),
  readCore('state.md'),
  readCore('types.md'),
  readCore('util.md'),
]);

// ─── Skill: templates ─────────────────────────────────────────────────────
// Combines: Template API + Util (conditions, extractors) + Types

await Bun.write(
  `${skillsDir}/oem-templates/Skill.md`,
  [
    skillHeader(
      'OEM templates',
      "OEM's Template function, tag/trait proxies, TypeScript types, and core utilities",
    ),
    '',
    templateMd,
    utilMd ? '---\n\n' + utilMd : '',
    '---\n\n',
    typesMd,
  ].join('\n\n'),
);

// ─── Skill: traits ────────────────────────────────────────────────────────
// One section per trait, ordered by source glob

const traitSections = traitFiles
  .map(
    ({ frontMatter, content }) =>
      `## ${frontMatter.name}\n\n_${frontMatter.description}_\n\n${stripFrontMatter(content)}`,
  )
  .join('\n\n---\n\n');

await Bun.write(
  `${skillsDir}/oem-traits/Skill.md`,
  [
    skillHeader(
      'OEM traits',
      "OEM's built-in trait library — reusable behaviors applied to elements via the trait proxy",
    ),
    '',
    '# Trait Library',
    '',
    'Traits are reusable functions that give abilities and behaviors to HTML elements. They are',
    'registered in the `Template()` config and accessed via the `trait` proxy. Each trait receives',
    'the element as its first argument, followed by configuration parameters.',
    '',
    traitSections,
  ].join('\n'),
);

// ─── Skill: states ────────────────────────────────────────────────────────
// Core State primitive first, then extended states (UrlState, MediaQueryState, ThemeState)

const stateSections = stateFiles
  .map(
    ({ frontMatter, content }) =>
      `## ${frontMatter.name}\n\n_${frontMatter.description}_\n\n${stripFrontMatter(content)}`,
  )
  .join('\n\n---\n\n');

await Bun.write(
  `${skillsDir}/oem-states/Skill.md`,
  [
    skillHeader(
      'OEM states',
      "OEM's reactive state system — core State primitive plus UrlState, MediaQueryState, and ThemeState",
    ),
    '',
    stateMd,
    '---',
    '',
    '# Extended State Library',
    '',
    'The following are pre-built extensions of the core State primitive for common reactive patterns.',
    '',
    stateSections,
  ].join('\n'),
);

// ─── Skill: theming ───────────────────────────────────────────────────────
// Design Token System overview (index.md) first, then each token layer

const tokenIndex = tokenFiles.find(({ frontMatter }) => frontMatter.name === 'Design Token System');
const tokenLayers = tokenFiles.filter(
  ({ frontMatter }) => frontMatter.name !== 'Design Token System',
);

const tokenSections = tokenLayers
  .map(
    ({ frontMatter, content }) =>
      `## ${frontMatter.name}\n\n_${frontMatter.description}_\n\n${stripFrontMatter(content)}`,
  )
  .join('\n\n---\n\n');

await Bun.write(
  `${skillsDir}/oem-theming/Skill.md`,
  [
    skillHeader(
      'OEM theming',
      "OEM's 6-layer design token system for building flexible, themeable UIs without predefined components",
    ),
    '',
    tokenIndex ? stripFrontMatter(tokenIndex.content) : '# Design Token System',
    '',
    '---',
    '',
    '# Token Layer Reference',
    '',
    tokenSections,
  ].join('\n'),
);

// ─── Skill: patterns ──────────────────────────────────────────────────────
// Static content: idiomatic conventions, SPA architecture, git commits

const conditionExample = fence(
  'typescript',
  [
    "import { $test } from '@linttrap/oem';",
    '',
    '// ✅ Separate trait calls with conditions',
    "trait.style('opacity', '0.6', $test(disabled)),",
    "trait.style('opacity', '1', $test(!disabled)),",
    '',
    '// ❌ Do not use ternary expressions',
    "trait.style('opacity', disabled ? '0.6' : '1'),",
  ].join('\n'),
);

const stateExample = fence(
  'typescript',
  [
    '// ✅ Module-level state — shared across the app',
    'const count = State(0);',
    'function renderCounter() {',
    '  return tag.p(trait.text(count.$val));',
    '}',
    '',
    '// ❌ State inside render — recreated on every call',
    'function renderCounter() {',
    '  const count = State(0); // new instance each render',
    '  return tag.p(trait.text(count.$val));',
    '}',
  ].join('\n'),
);

const spaStructureExample = fence(
  '',
  [
    'my-app/',
    '├── actions/       # Action creators → { type, payload }',
    '├── machines/      # State machines (switch on state + action)',
    '├── main.ts        # Entry point — init, wire events, mount',
    '├── templates/     # [tag, trait] = Template(...) definitions',
    '├── traits/        # Custom app-specific traits',
    '├── types/         # TypeScript types (state, actions, data)',
    '├── ui/            # Render functions keyed on machine state',
    '└── theme/         # Semantic design tokens',
  ].join('\n'),
);

const actionsExample = fence(
  'typescript',
  [
    "export const addTodo = (text: string) => ({ type: 'ADD_TODO' as const, payload: { text } });",
    "export const toggleTodo = (id: string) => ({ type: 'TOGGLE_TODO' as const, payload: { id } });",
  ].join('\n'),
);

const machineExample = fence(
  'typescript',
  [
    'export function machine(state: AppState, action: Action): AppState {',
    '  switch (state.view) {',
    "    case 'list':",
    '      switch (action.type) {',
    "        case 'ADD_TODO':",
    '          return { ...state, todos: [...state.todos, createTodo(action.payload.text)] };',
    "        case 'TOGGLE_TODO':",
    '          return { ...state, todos: state.todos.map((t) =>',
    '            t.id === action.payload.id ? { ...t, done: !t.done } : t',
    '          )};',
    '        default: return state;',
    '      }',
    '    default: return state;',
    '  }',
    '}',
  ].join('\n'),
);

const mainExample = fence(
  'typescript',
  [
    "import { appState, dispatch } from './state';",
    "import { renderApp } from './ui';",
    '',
    'appState.sub((state) => {',
    '  document.body.replaceChildren(renderApp(state, dispatch));',
    '});',
  ].join('\n'),
);

await Bun.write(
  `${skillsDir}/oem-patterns/Skill.md`,
  [
    skillHeader(
      'OEM patterns',
      'Idiomatic OEM conventions, SPA architectural patterns, and LLM-optimized file structure',
    ),
    '',
    '# Pattern Library',
    '',
    '## Idiomatic OEM',
    '',
    '### Conditions over Ternaries',
    '',
    'OEM prescribes explicit `$test()` conditions rather than ternary expressions. Ternaries',
    'produce static values that cannot react to state changes.',
    '',
    conditionExample,
    '',
    '### State Lives Outside Renders',
    '',
    'State objects are module-level singletons — never recreated inside render functions.',
    '',
    stateExample,
    '',
    '### Traits over Imperative DOM',
    '',
    'Prefer trait-based declarations over `element.style`, `element.addEventListener`, etc.',
    'Traits integrate with the automatic cleanup system and state subscription lifecycle.',
    '',
    '## Git Commits',
    '',
    'Follow conventional commits: `type(scope): description`',
    '',
    '- `feat`: New feature',
    '- `fix`: Bug fix',
    '- `refactor`: Code restructuring without behavior change',
    '- `docs`: Documentation only',
    '- `chore`: Build, tooling, config',
    '- `style`: Formatting, whitespace',
    '- `test`: Adding or updating tests',
    '',
    '## SPA Architecture',
    '',
    'File structure follows High Cohesion and Low Coupling, optimized for LLM interpretation.',
    'Each item may be a single file or a folder depending on complexity.',
    '',
    spaStructureExample,
    '',
    '### actions/',
    '',
    'Pure functions returning plain action objects. No side effects.',
    '',
    actionsExample,
    '',
    '### machines/',
    '',
    'Simple switch-statement machines. Switch on current state, then on action type.',
    '',
    machineExample,
    '',
    '### main.ts',
    '',
    'Initializes app state, wires the machine, mounts the UI.',
    '',
    mainExample,
    '',
    '### templates/',
    '',
    'Define all `[tag, trait]` template instances here. Import traits from `@linttrap/oem`',
    'and register only what each template needs.',
    '',
    '### ui/',
    '',
    'Render functions that take state (and optionally `dispatch`) and return DOM nodes.',
    'Each function corresponds to a view or sub-view in the machine.',
    '',
    '### theme/',
    '',
    'Semantic design tokens for the app. Follow the 6-layer naming convention.',
    'Token values reference the `sem_` or `elm_` layer; avoid raw primitives here.',
  ].join('\n'),
);

// ─── Skill: examples ──────────────────────────────────────────────────────
// Reference application prompts from src/prompts/*.md

const exampleSections = promptFiles
  .map(
    ({ frontMatter, content }) =>
      `## ${frontMatter.name}\n\n_${frontMatter.description}_\n\n${stripFrontMatter(content)}`,
  )
  .join('\n\n---\n\n');

await Bun.write(
  `${skillsDir}/oem-examples/Skill.md`,
  [
    skillHeader(
      'OEM examples',
      'Reference application prompts and BDD scenarios for common OEM application patterns',
    ),
    '',
    '# Example Applications',
    '',
    'Reference prompts for building common application types with OEM.',
    'Each includes requirements, BDD scenarios, and acceptance criteria.',
    '',
    exampleSections,
  ].join('\n'),
);

// ─── Agent: oem.md ────────────────────────────────────────────────────────

const skills = [
  {
    name: 'templates',
    description: 'Template API, tag/trait proxies, TypeScript types, core utilities',
  },
  {
    name: 'traits',
    description: 'Built-in trait library (Style, Event, ClassName, TextContent, Attribute, etc.)',
  },
  {
    name: 'states',
    description: 'Reactive state management (State, UrlState, MediaQueryState, ThemeState)',
  },
  { name: 'theming', description: '6-layer design token architecture and naming conventions' },
  {
    name: 'patterns',
    description: 'Idiomatic conventions, SPA architecture, git commits, file structure',
  },
  { name: 'examples', description: 'Reference application prompts and BDD scenarios' },
];

const skillFrontmatter = skills.map((s) => `  - OEM ${s.name}`).join('\n');
const skillsReference = skills.map((s) => `- **${s.name}**: ${s.description}`).join('\n');

const quickStartExample = fence(
  'typescript',
  [
    "import { Template, State } from '@linttrap/oem';",
    "import { useStyleTrait, useTextContentTrait, useEventTrait } from '@linttrap/oem';",
    '',
    'const [tag, trait] = Template({',
    '  style: useStyleTrait,',
    '  text: useTextContentTrait,',
    '  event: useEventTrait,',
    '});',
    '',
    'const count = State(0);',
    '',
    'const counter = tag.div(',
    '  tag.button(',
    "    trait.text('Increment'),",
    "    trait.event('click', () => count.reduce((n) => n + 1)),",
    '  ),',
    '  tag.p(',
    '    trait.text(count.$val),',
    '  ),',
    ');',
    '',
    'document.body.append(counter);',
  ].join('\n'),
);

await Bun.write(
  `${agentsDir}/oem.md`,
  [
    `---`,
    `name: oem`,
    `description: The agent-first UI framework and toolkit for building front-end applications with a compositional syntax that declaratively unifies markup, styling, and behavior`,
    `skills:`,
    skillFrontmatter,
    `---`,
    ``,
    `# OEM`,
    ``,
    `You are a front-end expert and an expert at writing idiomatic OEM — a compositional, agent-first`,
    `UI framework that declaratively unifies markup, styling, and behavior. OEM is designed ground-up`,
    `for LLM-driven development.`,
    ``,
    `## What is OEM?`,
    ``,
    `Rather than providing pre-built components, OEM gives you primitives and lets you compose`,
    `everything from scratch using a small set of powerful building blocks:`,
    ``,
    `1. **Template** — A factory for your templating engine: returns a \`[tag, trait]\` tuple for`,
    `   declarative element creation and reactive trait application`,
    `2. **State** — A lightweight reactive container and event bus for managing application state`,
    `3. **Traits** — Reusable behavioral plugins (style, event, text, class, attribute, etc.)`,
    `   applied declaratively to elements via the trait proxy`,
    `4. **Design Tokens** — A 6-layer token system (Primitives → Expression → Semantic → Element →`,
    `   Component → Feature) for building fully-themeable UIs`,
    ``,
    `## Core Principles`,
    ``,
    `- **Agent-first**: All syntax and conventions are optimized for LLM interpretation and generation`,
    `- **No predefined components**: UIs are composed from primitives + design tokens, interpreted contextually`,
    `- **No ternaries**: Conditions are expressed via helper test functions (both the \`$test()\` function and the \`.$test()\` function of a state object) in traits — never inline ternaries`,
    `- **State outside renders**: All state is module-level; never recreated inside render functions`,
    `- **Flat, readable composition**: OEM code reads linearly, top-to-bottom, trait by trait`,
    ``,
    `## Quick Start`,
    ``,
    quickStartExample,
    ``,
    `## Skills`,
    ``,
    skillsReference,
  ].join('\n'),
);

console.log('✓ Agent: specs/agents/oem.md');
skills.forEach((s) => console.log(`✓ Skill:  specs/skills/${s.name}/Skill.md`));
