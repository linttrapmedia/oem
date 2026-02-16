#!/usr/bin/env bun

import { Glob } from 'bun';
import { resolve } from 'node:path';
import { extractFrontMatter } from 'scripts/helpers';

const projectRoot = resolve(import.meta.dir, '..');
const skillDir = resolve(projectRoot, 'skills');

// copy template.md to skills/references
const templateSource = resolve(projectRoot, 'src/core/template.md');
const templateDest = resolve(skillDir, './references/template.md');
await Bun.write(templateDest, await Bun.file(templateSource).text());

// copy state.md to skills/references
const stateSource = resolve(projectRoot, 'src/core/state.md');
const stateDest = resolve(skillDir, './references/state.md');
await Bun.write(stateDest, await Bun.file(stateSource).text());

// copy types.md to skills/references
const typesSource = resolve(projectRoot, 'src/core/types.md');
const typesDest = resolve(skillDir, './references/types.md');
await Bun.write(typesDest, await Bun.file(typesSource).text());

const traitFiles = [];
for await (const file of new Glob('src/traits/*.md').scan('.')) {
  const filePath = resolve(projectRoot, file);
  const content = await Bun.file(file).text();
  const fileName = file.split('/').pop()!;
  const frontMatter = extractFrontMatter(await Bun.file(filePath).text());
  // copy to references
  const referencePath = `${skillDir}/references/${fileName}`;
  await Bun.write(referencePath, content);
  traitFiles.push([`./references/${fileName}`, frontMatter]);
}

const stateFiles = [];
for await (const file of new Glob('src/states/*.md').scan('.')) {
  const filePath = resolve(projectRoot, file);
  const content = await Bun.file(file).text();
  const fileName = file.split('/').pop()!;
  const frontMatter = extractFrontMatter(await Bun.file(filePath).text());
  // copy to references
  const referencePath = `${skillDir}/references/${fileName}`;
  await Bun.write(referencePath, content);
  stateFiles.push([`./references/${fileName}`, frontMatter]);
}

const elementFiles = [];
for await (const file of new Glob('src/elements/*.md').scan('.')) {
  const filePath = resolve(projectRoot, file);
  const content = await Bun.file(file).text();
  const fileName = file.split('/').pop()!;
  const frontMatter = extractFrontMatter(await Bun.file(filePath).text());
  // copy to references
  const referencePath = `${skillDir}/references/${fileName}`;
  await Bun.write(referencePath, content);
  elementFiles.push([`./references/${fileName}`, frontMatter]);
}

const componentFiles = [];
for await (const file of new Glob('src/components/*.md').scan('.')) {
  const filePath = resolve(projectRoot, file);
  const content = await Bun.file(file).text();
  const fileName = file.split('/').pop()!;
  const frontMatter = extractFrontMatter(await Bun.file(filePath).text());
  // copy to references
  const referencePath = `${skillDir}/references/${fileName}`;
  await Bun.write(referencePath, content);
  componentFiles.push([`./references/${fileName}`, frontMatter]);
}

const featureFiles = [];
for await (const file of new Glob('src/features/*.md').scan('.')) {
  const filePath = resolve(projectRoot, file);
  const content = await Bun.file(file).text();
  const fileName = file.split('/').pop()!;
  const frontMatter = extractFrontMatter(await Bun.file(filePath).text());
  // copy to references
  const referencePath = `${skillDir}/references/${fileName}`;
  await Bun.write(referencePath, content);
  featureFiles.push([`./references/${fileName}`, frontMatter]);
}

// Create an empty SKILL.md (overwrite if exists)
await Bun.write(
  `${skillDir}/SKILL.md`,
  `---
name: OEM
description: The agent-first UI framework and toolkit
license: MIT
metadata:
  author: Kevin Lint
  version: '1.0'
---

# OEM

OEM is an agent-first UI framework engineered for seamless human-AI collaboration. It introduces a distinctive compositional syntax that declaratively unifies markup, styling, and behavior.

## Fundamental Components of OEM

OEM is comprised of three core components that work together to create a powerful and flexible UI framework:

- [Templates](./references/template.md) - These are the user defined templating engines that are used to render dom elements
- [Traits](./references/template.md) - This is OEM's "plugin architecture". It's how a user defines the capabilities of a templating engine. OEM comes with a library of predefined traits but users can (and should) define their own traits to maintain as much of a declarative syntax as possible.
- [State](./references/state.md) - OEM's state management system. It's a simple event bus with helper functions to create and manage state. It's usage within the OEM ecosystem is dependent on calling code, including traits and their implementations.
- [Types](./references/types.md) - Type definitions for OEM. This includes types for traits, templates, and state.

## Trait Library

OEM comes with a growing library of traits that provide a wide range of functionality out of the box. These traits are designed to be composable and extensible, allowing you to easily create complex behaviors by combining them in different ways.

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

## Element Library

Elements are reusable style definitions can be used by components to maintain consistent styling across the app. They can be thought of as a more powerful version of CSS classes that can also include semantic tokens.

${elementFiles
  .map(
    ([filePath, frontMatter]: any) =>
      `- [${frontMatter.name}](${filePath}) - ${frontMatter.description}`,
  )
  .join('\n')}

## Component Library

OEM also provides a set of pre-built components that can be used to quickly build common UI patterns with state. These components are designed to be flexible and customizable, allowing you to easily adapt them to your specific needs.

${componentFiles
  .map(
    ([filePath, frontMatter]: any) =>
      `- [${frontMatter.name}](${filePath}) - ${frontMatter.description}`,
  )
  .join('\n')}

## Feature Library

Features are compositions of components, traits, and states that provide pre-built application features such as contact forms, todo lists, and more. These features are designed to be easily integrated into your applications, providing a quick and easy way to add common functionality.

${featureFiles
  .map(
    ([filePath, frontMatter]: any) =>
      `- [${frontMatter.name}](${filePath}) - ${frontMatter.description}`,
  )
  .join('\n')}

## Pattern Library

### Architectural Patterns

OEM is designed to be flexible and adaptable to a wide range of architectural patterns. However, there are a few patterns that are particularly well-suited to the OEM ecosystem:

#### SPA

SPAs have a prescribed structure in order to keep a clean separation of concerns

File structure should be based on High Cohesion and Low Coupling and optimized for LLM interpretation and management. Based on complexity, the following items could exist either as single files or folders with files.

- **actions**:
A library of all the actions that can be dispatched in the app. Each action is a function that returns an object with a type and a payload.

- **machines**:
State machines that define the behavior of the app. Each machine has a state, a set of transitions, and a set of actions that can be dispatched. Implement them as simple switch statements, switching on the current state and the dispatched action.

- **main**:
The entry point of the app. It initializes the state machine and sets up the event listeners for the UI. It also renders the UI based on the current state of the machine.

- **templates**:
A library of templates (using Template and it's destructured [tag, trait]) that can be used to render the UI.

- **traits**:
Any custom traits that are needed for the app that aren't already provided by the core library or that could dramatically simplify the implementation. For example, a trait for handling form input or a trait for managing a list of items.

- **types**:
Type definitions for the app. This can include types for the state, actions, and any other relevant data structures.

- **ui**:
Functions for rendering the UI based on the current state of the machine. This can include functions for rendering different components of the UI, such as a list of todo items or a form for adding new items.

- **theme**:
A set of semantic tokens for styling the app. This can include colors, fonts, spacing, and any other design elements that are used throughout the app.
`,
);
