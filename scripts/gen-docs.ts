#!/usr/bin/env bun

import { Glob } from 'bun';
import { resolve } from 'node:path';
import { extractFrontMatter, stripFrontMatter } from 'scripts/helpers';
import pkg from '../package.json' with { type: 'json' };

const projectRoot = resolve(import.meta.dir, '..');
const agentsDir = resolve(projectRoot, '.github');
const indexFile = resolve(projectRoot, 'docs/index.html');

// delete the agents directory if it exists, then recreate it with the necessary subdirectories
import { existsSync, rmSync } from 'node:fs';
if (existsSync(agentsDir)) {
  rmSync(agentsDir, { recursive: true });
  
}

const exampleFiles = [];
for await (const file of new Glob('examples/*.md').scan('.')) {
  const filePath = resolve(projectRoot, file);
  const content = await Bun.file(filePath).text();
  const frontMatter = extractFrontMatter(content);
  exampleFiles.push([frontMatter, content]);
}

const coreFiles = [];
for await (const fileName of new Glob('src/core/*.md').scan('.')) {
  const filePath = resolve(projectRoot, fileName);
  const content = await Bun.file(filePath).text();
  const frontMatter = extractFrontMatter(content);
  coreFiles.push([frontMatter, content]);
}

const traitFiles = [];
for await (const file of new Glob('src/traits/*.md').scan('.')) {
  const filePath = resolve(projectRoot, file);
  const content = await Bun.file(filePath).text();
  const frontMatter = extractFrontMatter(await Bun.file(filePath).text());
  traitFiles.push([frontMatter, content]);
}

const stateFiles = [];
for await (const file of new Glob('src/states/*.md').scan('.')) {
  const filePath = resolve(projectRoot, file);
  const content = await Bun.file(file).text();
  const frontMatter = extractFrontMatter(await Bun.file(filePath).text());
  stateFiles.push([frontMatter, content]);
}


const DOCS = `# oem <sup>${pkg.version}</sup>

## Abstract
OEM is an agent-first UI framework and toolkit engineered for human-AI collaboration. It provides a declarative syntax for composing reactive UIs in 100% TypeScript.

The following documentation describes the core concepts, libraries, and conventions of OEM. The sectsions in this document are normative unless otherwise specified.

[GITHUB](${pkg.repository.url}) | [NPM](${pkg.repository.npm})

## Table of Contents
- [Install](#install)
- [Core Library](#core-library)
> ${coreFiles
  .map(([frontMatter]: any) => `- [${frontMatter.name}](#${frontMatter.name.toLowerCase().replace(/\s+/g, '-')}) - ${frontMatter.description}`)
  .join('\n> ')}
- [Trait Library](#trait-library)
> ${traitFiles
  .map(([frontMatter]: any) => `- [${frontMatter.name}](#${frontMatter.name.toLowerCase().replace(/\s+/g, '-')}) - ${frontMatter.description}`)
  .join('\n> ')}
- [State Library](#state-library)
> ${stateFiles
  .map(([frontMatter]: any) => `- [${frontMatter.name}](#${frontMatter.name.toLowerCase().replace(/\s+/g, '-')}) - ${frontMatter.description}`)
  .join('\n> ')}
- [Examples](#examples)
> ${exampleFiles
  .map(([frontMatter]: any) => `- [${frontMatter.name}](#${frontMatter.name.toLowerCase().replace(/\s+/g, '-')}) - ${frontMatter.description}`)
  .join('\n> ')}

## Install
To get started with OEM, install the package from npm:

\`\`\`bash
npm install @linttrap/oem
\`\`\`

## Quick Example

\`\`\`typescript
// define a template engine
const [tag, trait] = Template({
  style: useStyleTrait,
  event: useEventTrait,
  text: useTextTrait,
})

// define state
const count = State(0);

// define your dom
const counter = tag.div(
  trait.style('display', 'flex'),
  trait.style('alignItems', 'center'),
  trait.style('gap', '16px'),
  tag.span(
    trait.text(count.$val),
    trait.style('fontSize', '48px'),
    trait.style('fontWeight', '700'),
    trait.style('color', '#555555'),
  ),
  tag.button(
    trait.text('+'),
    trait.event('click', count.$reduce((n) => n + 1)),
    trait.style('fontSize', '24px'),
  ),
);

// that's it! You just defined: behavior, state, and presentation in one cohesive block of code. 
\`\`\`

## Core Library
${coreFiles.map(([, content]: any) => stripFrontMatter(content)).join('\n\n---\n\n')}

## Trait Library
${traitFiles.map(([, content]: any) => stripFrontMatter(content)).join('\n\n---\n\n')}

## State Library
${stateFiles.map(([, content]: any) => stripFrontMatter(content)).join('\n\n---\n\n')}

## Examples
${exampleFiles.map(([, content]: any) => stripFrontMatter(content)).join('\n\n---\n\n')}
`;

// Generate the docs content by concatenating all the files together with appropriate section headers
const docsMarkup = DOCS;
const docsMarkupToHtml = Bun.markdown.html(docsMarkup,{
  autolinks: { url: true, www: true },
  headings: { ids: true }
});

// Read the index.html file, replace the placeholder string with the generated docs content, and write it back to disk
const indexContent = await Bun.file(indexFile).text();
const bodyTag = /<body[^>]*>([\s\S]*?)<\/body>/i;
const newIndexContent = indexContent.replace(bodyTag, `<body>${docsMarkupToHtml}</body>`);
await Bun.write(indexFile, newIndexContent);
