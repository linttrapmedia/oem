#!/usr/bin/env bun

import { Glob } from 'bun';
import { appendFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { extractFrontMatter } from 'scripts/helpers';

const projectRoot = resolve(import.meta.dir, '..');
const readmePath = resolve(projectRoot, 'README.md');
const skillDir = resolve(projectRoot, 'skills');

// Create an empty SKILL.md (overwrite if exists)
await Bun.write(`${skillDir}/SKILL.md`, '');

const headerFile = resolve(projectRoot, 'src/docs/header.md');
await appendFile(`${skillDir}/SKILL.md`, (await Bun.file(headerFile).text()) + '\n');

const tocFile = resolve(projectRoot, 'src/docs/toc.md');
await appendFile(`${skillDir}/SKILL.md`, (await Bun.file(tocFile).text()) + '\n');

const quickStartFile = resolve(projectRoot, 'src/docs/quick-start.md');
await appendFile(`${skillDir}/SKILL.md`, (await Bun.file(quickStartFile).text()) + '\n');

const stateFile = resolve(projectRoot, 'src/core/state.md');
await appendFile(`${skillDir}/SKILL.md`, await Bun.file(stateFile).text());
await appendFile(`${skillDir}/SKILL.md`, '\n### Available States\n');

// copy all src/states/*.md to docs/references/states/*.md
const stateMarkdownFiles = new Glob('src/states/*.md');
for await (const file of stateMarkdownFiles.scan('.')) {
  const content = await Bun.file(file).text();
  const fileName = file.split('/').pop()!;
  const frontMatter = extractFrontMatter(content);
  await Bun.write(`${skillDir}/references/${fileName}`, content);
  await appendFile(
    `${skillDir}/SKILL.md`,
    `- [${frontMatter.name}](./references/${fileName}) - ${frontMatter.description}\n`,
  );
}
await appendFile(`${skillDir}/SKILL.md`, '\n');

const templateFile = resolve(projectRoot, 'src/core/template.md');
await appendFile(`${skillDir}/SKILL.md`, await Bun.file(templateFile).text());

// copy all src/states/*.md to docs/references/states/*.md
const traitMarkdownFiles = new Glob('src/traits/*.md');
for await (const file of traitMarkdownFiles.scan('.')) {
  const content = await Bun.file(file).text();
  const fileName = file.split('/').pop()!;
  const frontMatter = extractFrontMatter(content);
  await Bun.write(`${skillDir}/references/${fileName}`, content);
  await appendFile(
    `${skillDir}/SKILL.md`,
    `- [${frontMatter.name}](./references/${fileName}) - ${frontMatter.description}\n`,
  );
}
