Bun.serve({
  async fetch(req) {
    const path = new URL(req.url).pathname;
    const file = Bun.file('.' + path);
    return new Response(file);
  },
});

console.log('Server running at http://localhost:3000');
