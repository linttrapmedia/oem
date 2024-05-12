export default process.argv
  .slice(2)
  .map((arg) => arg.split('='))
  .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {}) as Record<string, string>;
