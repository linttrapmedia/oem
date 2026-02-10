#!/usr/bin/env bun

import { resolve } from 'node:path';

const projectRoot = resolve(import.meta.dir, '..');
const readmePath = resolve(projectRoot, 'README.md');
const skillDir = resolve(projectRoot, 'skills');

// Create an empty SKILL.md (overwrite if exists)
await Bun.write(`${skillDir}/SKILL.md`, '');

// // Define the files in order
// const files: string[] = [
//   'src/docs/header.md',
//   'src/docs/toc.md',
//   'src/docs/quick-start.md',
//   'src/core/state.md',
//   'src/core/template.md',
//   'src/core/types.md',
//   'src/core/util.md',
// ];

// // Get all .md files from src/traits/
// const traitsDir = resolve(projectRoot, 'src/traits');
// try {
//   const dirExists = await exists(traitsDir);
//   if (dirExists) {
//     const entries = await readdir(traitsDir);
//     const traitFiles = entries
//       .filter((file: string) => file.endsWith('.md'))
//       .sort()
//       .map((file: string) => `src/traits/${file}`);
//     files.push(...traitFiles);
//   }
// } catch (error) {
//   // Directory doesn't exist, skip
// }

// // Add footer
// files.push('src/docs/footer.md');

// // Concatenate all files
// const contents: string[] = [];

// for (const file of files) {
//   const fullPath = resolve(projectRoot, file);
//   try {
//     const fileExists = await exists(fullPath);
//     if (fileExists) {
//       const content = await Bun.file(fullPath).text();
//       contents.push(content);
//       console.log(`✓ ${file}`);
//     } else {
//       console.warn(`⚠ Warning: ${file} not found, skipping...`);
//     }
//   } catch (error) {
//     console.warn(`⚠ Warning: ${file} could not be read, skipping...`);
//   }
// }

// // Write the concatenated content
// const finalContent = contents.join('\n\n');
// await Bun.write(readmePath, finalContent);
// console.log(`\n✅ README.md generated successfully at ${readmePath}`);
// await Bun.write(`${skillDir}/SKILL.md`, finalContent);
// console.log(`✅ SKILL.md generated successfully at ${skillDir}/SKILL.md`);

// console.log(`   Total files: ${contents.length}`);
// console.log(`   Total size: ${finalContent.length} characters`);
