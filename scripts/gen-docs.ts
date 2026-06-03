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

const DOCS = `# oem <sup>${pkg.version}</sup>

## Abstract
OEM is an agent-first UI framework and toolkit engineered for human-AI collaboration. It provides a declarative syntax for composing reactive UIs that unifies markup, styling, and behavior.

The following documentation describes the core concepts, libraries, and conventions of OEM. The sectsions in this document are normative unless otherwise specified.

[GITHUB](${pkg.repository.url}) | [NPM](${pkg.repository.npm})

## Table of Contents
- [Core Library](#core-library)
> ${coreFiles
  .map(([filePath, frontMatter]: any) => `- [${frontMatter.name}](#${frontMatter.name.toLowerCase().replace(/\s+/g, '-')}) - ${frontMatter.description}`)
  .join('\n> ')}
- [Trait Library](#trait-library)
> ${traitFiles
  .map(([filePath, frontMatter]: any) => `- [${frontMatter.name}](#${frontMatter.name.toLowerCase().replace(/\s+/g, '-')}) - ${frontMatter.description}`)
  .join('\n> ')}
- [State Library](#state-library)
> ${stateFiles
  .map(([filePath, frontMatter]: any) => `- [${frontMatter.name}](#${frontMatter.name.toLowerCase().replace(/\s+/g, '-')}) - ${frontMatter.description}`)
  .join('\n> ')}

## Install
To get started with OEM, install the package from npm:

\`\`\`bash
npm install @linttrap/oem
\`\`\`

## Core Library
${coreFiles.map(([, , content]: any) => stripFrontMatter(content)).join('\n\n---\n\n')}

## Trait Library
${traitFiles.map(([, , content]: any) => stripFrontMatter(content)).join('\n\n---\n\n')}

## State Library
${stateFiles.map(([, , content]: any) => stripFrontMatter(content)).join('\n\n---\n\n')}
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
