// extract front matter
/*
 * ---
 * name: UrlState
 * description: State Object to track the current URL in the application.
 * license: MIT
 * metadata:
 *   author: Kevin Lint
 *   version: '1.0'
 * ---
 */
export function extractFrontMatter(content: string): {
  name: string;
  description: string;
  license: string;
  metadata: {
    author: string;
    version: string;
  };
} {
  const frontMatterRegex = /^---\n([\s\S]*?)\n---/;
  // match name
  const nameRegex = /name:\s*(.+)/;
  // match description
  const descriptionRegex = /description:\s*(.+)/;
  // match license
  const licenseRegex = /license:\s*(.+)/;
  // match metadata author
  const authorRegex = /author:\s*(.+)/;
  // match metadata version
  const versionRegex = /version:\s*(.+)/;

  const frontMatterMatch = content.match(frontMatterRegex);
  if (!frontMatterMatch) {
    throw new Error('Front matter not found');
  }

  const frontMatterContent = frontMatterMatch[1];
  const nameMatch = frontMatterContent.match(nameRegex);
  const descriptionMatch = frontMatterContent.match(descriptionRegex);
  const licenseMatch = frontMatterContent.match(licenseRegex);
  const authorMatch = frontMatterContent.match(authorRegex);
  const versionMatch = frontMatterContent.match(versionRegex);

  if (!nameMatch || !descriptionMatch || !licenseMatch || !authorMatch || !versionMatch) {
    throw new Error('Missing required fields in front matter');
  }

  return {
    name: nameMatch[1].trim(),
    description: descriptionMatch[1].trim(),
    license: licenseMatch[1].trim(),
    metadata: { author: authorMatch[1].trim(), version: versionMatch[1].trim() },
  };
}
