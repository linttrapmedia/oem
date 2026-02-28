#!/usr/bin/env bun

import { Glob } from 'bun';
import { resolve } from 'node:path';
import { extractFrontMatter, stripFrontMatter } from 'scripts/helpers';

const projectRoot = resolve(import.meta.dir, '..');
const agentsDir = resolve(projectRoot, '.agents');
const wwwDir = resolve(projectRoot, 'www');

// delete the specs directory if it exists, then recreate it with the necessary subdirectories
if (await Bun.file(agentsDir).exists()) {
  await Bun.file(agentsDir).unlink();
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

// Create an empty Skill.md (overwrite if exists)
await Bun.write(
  `${agentsDir}/agents/oem.md`,
  `---
name: oem
description: Manual for generating front-end applications using OEM, the agent-first UI framework and toolkit.
---

# This Guide

You are a front-end expert and an expert at writing idiomatic OEM. This document is a guide and canonical reference on how OEM applications are structured and how to use the framework effectively and write OEM's distinctive compositional syntax that declaratively unifies markup, styling, and behavior.

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

## Guides

The following guides cover theming, design decisions, code idioms, and architectural patterns:

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

## Guides

${guideFiles.map(([, , content]: any) => stripFrontMatter(content)).join('\n\n---\n\n')}
`,
);
