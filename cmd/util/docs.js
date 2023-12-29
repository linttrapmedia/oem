import fs from 'fs';

function traitJsdoc2md(folder) {
  const docFiles = fs.readdirSync(folder);
  let output = '';
  docFiles.forEach((file) => {
    const fileContent = fs.readFileSync(`${folder}/${file}`, 'utf8');
    const jsdoc = fileContent.match(/\/\*\*\s*\n([^\*]|\*[^\/])*\*\//g);
    if (!jsdoc) return;
    if (jsdoc.length < 3) return;

    jsdoc.forEach((doc) => {
      const docString = doc.split('\n');
      docString.shift();
      docString.pop();
      let hasRenderedFirstExample = false;

      docString
        .map((line) => line.replace(/\s*\*\s?/g, ''))
        .filter((line) => line !== '/**' && line !== '*/' && line !== '' && line.search('@param el HTMLElement') === -1)
        .map((line) => line.split(' '))
        .forEach(([tag, obj, ...params]) => {
          switch (tag.trim()) {
            case '@namespace':
              output += `- **[${file}](${folder}/${file})**`;
              break;
            case '@summary':
              output += ` - ${obj} ${params.join(' ')}\n\n`;
              // output += '```typescript';
              break;
            // case '@name':
            //   // output += `\n// ${obj} ${params.join(' ')}`;
            //   break;
            // case '@description':
            //   output += `\n// ${obj} ${params.join(' ')}\n`;
            //   output += '// ----------------------------------------\n';
            //   break;
            // case '@memberof':
            //   break;
            // case '@example':
            //   if (!hasRenderedFirstExample) {
            //     hasRenderedFirstExample = true;
            //     output += '\n';
            //   }
            //   break;
            // case '@returns':
            //   // output += `// returns: ${obj} ${params.join(' ')}\n`;
            //   break;
            // case '@param':
            //   output += `// @param ${obj}: ${params.join(' ')}\n`;
            //   break;
            // default:
            //   output += `${[tag, obj, ...params].join(' ')}\n`;
            //   break;
          }
        });
    });
    // output += '```\n';
  });
  return output;
}

function stateJsdoc2md(folder) {
  const docFiles = fs.readdirSync(folder);
  let output = '';
  docFiles.forEach((file) => {
    const fileContent = fs.readFileSync(`${folder}/${file}`, 'utf8');
    const jsdoc = fileContent.match(/\/\*\*\s*\n([^\*]|\*[^\/])*\*\//g);
    if (!jsdoc) return;

    jsdoc.forEach((doc) => {
      const docString = doc.split('\n');
      docString.shift();
      docString.pop();

      docString
        .map((line) => line.replace(/\s*\*\s?/g, ''))
        .filter((line) => line !== '/**' && line !== '*/' && line !== '' && line.search('@param el HTMLElement') === -1)
        .map((line) => line.split(' '))
        .forEach(([tag, obj, ...params]) => {
          switch (tag.trim()) {
            case '@namespace':
              output += `- **[${file}](${folder}/${file})**`;
              break;
            case '@summary':
              output += ` - ${obj} ${params.join(' ')}\n\n`;
              break;
          }
        });
    });
    // output += '```\n';
  });
  console.log(output);
  return output;
}

export default {
  stateJsdoc2md,
  traitJsdoc2md,
};
