#!/usr/bin/env bun

import { Glob } from 'bun';
import { resolve } from 'node:path';
import { extractFrontMatter, stripFrontMatter } from 'scripts/helpers';

const projectRoot = resolve(import.meta.dir, '..');
const agentsDir = resolve(projectRoot, '.github');
const wwwDir = resolve(projectRoot, 'www');

// delete the agents directory if it exists, then recreate it with the necessary subdirectories
import { existsSync, rmSync } from 'node:fs';
if (existsSync(agentsDir)) {
  rmSync(agentsDir, { recursive: true });
}

// copy core files to specs/references/core
const coreFiles = [];
for await (const fileName of new Glob('src/core/*.md').scan('.')) {
  const filePath = resolve(projectRoot, fileName);
  const content = await Bun.file(filePath).text();
  const frontMatter = extractFrontMatter(content);
  // copy to references/core
  const referencePath = `${agentsDir}/references/core/${fileName.split('/').pop()!}`;
  await Bun.write(referencePath, content);
  coreFiles.push([`../references/core/${fileName.split('/').pop()!}`, frontMatter, content]);
}

const traitFiles = [];
for await (const file of new Glob('src/traits/*.md').scan('.')) {
  const filePath = resolve(projectRoot, file);
  const content = await Bun.file(file).text();
  const fileName = file.split('/').pop()!;
  const frontMatter = extractFrontMatter(await Bun.file(filePath).text());
  // copy to references/traits
  const referencePath = `${agentsDir}/references/traits/${fileName}`;
  await Bun.write(referencePath, content);
  traitFiles.push([`../references/traits/${fileName}`, frontMatter, content]);
}

const stateFiles = [];
for await (const file of new Glob('src/states/*.md').scan('.')) {
  const filePath = resolve(projectRoot, file);
  const content = await Bun.file(file).text();
  const fileName = file.split('/').pop()!;
  const frontMatter = extractFrontMatter(await Bun.file(filePath).text());
  // copy to references/states
  const referencePath = `${agentsDir}/references/states/${fileName}`;
  await Bun.write(referencePath, content);
  stateFiles.push([`../references/states/${fileName}`, frontMatter, content]);
}

const themeFiles = [];
for await (const file of new Glob('src/themes/tokens/*.md').scan('.')) {
  const filePath = resolve(projectRoot, file);
  const content = await Bun.file(file).text();
  const fileName = file.split('/').pop()!;
  const frontMatter = extractFrontMatter(await Bun.file(filePath).text());
  // copy to references/tokens
  const referencePath = `${agentsDir}/references/tokens/${fileName}`;
  await Bun.write(referencePath, content);
  themeFiles.push([`../references/tokens/${fileName}`, frontMatter, content]);
}

const guideFiles = [];
for await (const file of new Glob('src/guides/*.md').scan('.')) {
  const filePath = resolve(projectRoot, file);
  const content = await Bun.file(file).text();
  const fileName = file.split('/').pop()!;
  const frontMatter = extractFrontMatter(await Bun.file(filePath).text());
  // copy to references/guides
  const referencePath = `${agentsDir}/references/guides/${fileName}`;
  await Bun.write(referencePath, content);
  guideFiles.push([`../references/guides/${fileName}`, frontMatter, content]);
}

const skillFiles = [];
for await (const file of new Glob('src/skills/*.md').scan('.')) {
  const filePath = resolve(projectRoot, file);
  const content = await Bun.file(file).text();
  const fileName = file.split('/').pop()!;
  const frontMatter = extractFrontMatter(await Bun.file(filePath).text());
  // copy to skills/
  const skillPath = `${agentsDir}/skills/${fileName}`;
  await Bun.write(skillPath, content);
  skillFiles.push([`../skills/${fileName}`, frontMatter, content]);
}

// Generate .github/agents/oem.md — the agent definition
await Bun.write(
  `${agentsDir}/agents/oem.md`,
  `---
name: oem
description: Expert front-end agent for generating applications using OEM, the agent-first UI framework.
---

# OEM Agent

You are a front-end expert and an expert at writing idiomatic OEM. You generate OEM applications that use a compositional syntax unifying markup, styling, and behavior — no CSS files, no JSX, no virtual DOM.

## Workflow

When asked to build or modify an OEM application, follow these steps in order:

1. **Understand the request.** Read any existing BDD files in \`bdd/\` to understand requirements. If none exist, create them first using the [BDD skill](../skills/bdd.md).
2. **Read existing code.** Before writing anything, read the existing files to understand current state, types, tokens, and patterns already in use. Never duplicate what exists.
3. **Scaffold the structure.** Follow the [Folder & File Structure skill](../skills/architecture.md). Every app uses the same canonical file set.
4. **Define types** in \`types.ts\` per the [Types guide](../references/guides/types.md).
5. **Define constants** in \`constants.ts\` per the [Constants guide](../references/guides/constants.md).
6. **Define state** in \`states.ts\` per the [States guide](../references/guides/states.md). Include responsive breakpoints if the UI needs them.
7. **Define actions** in \`actions.ts\` per the [Actions guide](../references/guides/actions.md).
8. **Define machines** in \`machines.ts\` per the [Machines guide](../references/guides/machines.md).
9. **Define theme tokens** in \`theme.ts\` using the [Theming skill](../skills/theming.md) and [Theme guide](../references/guides/theme.md). Never hardcode visual values — always use tokens.
10. **Define templates** in \`templates.ts\` per the [Templates guide](../references/guides/templates.md).
11. **Define icons** in \`icons.ts\` if needed, using the [Icons skill](../skills/icons.md).
12. **Build the UI** in \`ui.ts\` per the [UI guide](../references/guides/ui.md). Use the [Responsive Design skill](../skills/responsive-design.md) for responsive layouts.
13. **Wire up the entry point** in \`main.ts\` per the [Main guide](../references/guides/main.md).

Always write code following the [Idiomatic OEM skill](../skills/idioms.md) and make design choices per the [Design Decision skill](../skills/design-decisions.md).

## Rules

- **Never create CSS files, \`<style>\` tags, or external stylesheets.** All styling is done via \`trait.style()\` and design tokens.
- **Never hardcode colors, spacing, or font sizes.** Always create or reuse tokens from \`theme.ts\`.
- **Never use ternaries in trait arguments.** Use conditions (\`state.$test()\`) with separate trait calls.
- **Read before writing.** Always read a file before modifying it to avoid duplication.
- **One concern per file.** Types in \`types.ts\`, state in \`states.ts\`, UI in \`ui.ts\` — never mix categories.

---

## Core Library & Fundamentals

The core library provides the fundamental building blocks of the OEM ecosystem. It includes the Template function for creating a user-defined templating engine, the State function for creating a micro event-bus and state object, and the useThemeState function for managing design tokens in a centralized way. The core library also includes type definitions for OEM, which can be found in the references.

${coreFiles
  .map(
    ([filePath, frontMatter]: any) =>
      `- [${frontMatter.name}](${filePath}) - ${frontMatter.description}`,
  )
  .join('\n')}


## Trait Library

The following traits come with OEM. Traits are reusable pieces of logic that give the abilities and behaviors to your custom template engine. They can be thought of as plugins that can be applied to the output of the Template function to create a powerful and flexible system for generating UI.

${traitFiles
  .map(
    ([filePath, frontMatter]: any) =>
      `- [${frontMatter.name}](${filePath}) - ${frontMatter.description}`,
  )
  .join('\n')}


## State Library

OEM's state management system is simple yet powerful, providing a flexible way to manage state in your applications. The following states are available in the OEM ecosystem:

${stateFiles
  .map(
    ([filePath, frontMatter]: any) =>
      `- [${frontMatter.name}](${filePath}) - ${frontMatter.description}`,
  )
  .join('\n')}

## Skills

Skills are procedural instructions — step-by-step workflows the agent follows when performing specific tasks. When a task matches a skill, follow its instructions in order.

${skillFiles
  .map(
    ([filePath, frontMatter]: any) =>
      `- [${frontMatter.name}](${filePath}) - ${frontMatter.description}`,
  )
  .join('\n')}

## Guides

The following guides describe file-level conventions — what belongs in each file, how it should be structured, and the rules for each category:

${guideFiles
  .map(
    ([filePath, frontMatter]: any) =>
      `- [${frontMatter.name}](${filePath}) - ${frontMatter.description}`,
  )
  .join('\n')}
`,
);

// Generate specs/commands/oem.md — slash command that routes to the oem subagent
const oemCommandContent = `---
description: Use the oem agent to generate front-end UI applications and components
allowed-tools: Task
argument-hint: <your UI request>
---

Use the \`oem\` subagent to handle this request:

$ARGUMENTS
`;

await Bun.write(`${agentsDir}/commands/oem.md`, oemCommandContent);

// Generate www/llms.txt — a single file with all documentation for LLM consumption
await Bun.write(
  `${wwwDir}/llms.txt`,
  `# OEM

> OEM is an agent-first UI framework and toolkit engineered for human-AI collaboration. It provides a design-token-driven system for generating declarative, reactive UI via a compositional syntax that unifies markup, styling, and behavior.

## Core Library

${coreFiles.map(([, , content]: any) => stripFrontMatter(content)).join('\n\n---\n\n')}

## Trait Library

${traitFiles.map(([, , content]: any) => stripFrontMatter(content)).join('\n\n---\n\n')}

## State Library

${stateFiles.map(([, , content]: any) => stripFrontMatter(content)).join('\n\n---\n\n')}

## Theme Library

${themeFiles.map(([, , content]: any) => stripFrontMatter(content)).join('\n\n---\n\n')}

## Skills

${skillFiles.map(([, , content]: any) => stripFrontMatter(content)).join('\n\n---\n\n')}

## Guides

${guideFiles.map(([, , content]: any) => stripFrontMatter(content)).join('\n\n---\n\n')}
`,
);
