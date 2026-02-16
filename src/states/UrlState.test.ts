import { Test } from '@/registry';
import { useUrlState } from '@/states/UrlState';

export const CanMatchUrlWithVariables: Test = async () => {
  const routes = {
    '/': () => 'home',
    '/about': () => 'about',
    '/user/:id': ({ id }: { id: string }) => `/user/${id}`,
  };
  const urlState = useUrlState(routes);
  const tests: boolean[] = [];

  // Simulate navigation to /user/123
  history.pushState({}, '', '/user/123');

  const t1 = urlState.val().location.pathname === '/user/123';
  tests.push(t1);

  const t2 = urlState.val().params.id === '123';
  tests.push(t2);

  // current matched route should be '/user/:id'
  const t3 = urlState.val().matchedRoute === '/user/:id';
  tests.push(t3);

  return { pass: tests.every(Boolean) };
};
