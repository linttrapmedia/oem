import Docs from './index.html';

Bun.serve({
  routes: {
    '/': Docs,
  },
  fetch() {
    return new Response('Unmatched route');
  },
});
