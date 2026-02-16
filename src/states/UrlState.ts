import { State } from '@/registry';

// Extract all :param names from a route path
type ExtractRouteParams<T extends string> = T extends `${infer _Start}:${infer Param}/${infer Rest}`
  ? Param | ExtractRouteParams<Rest>
  : T extends `${infer _Start}:${infer Param}`
  ? Param
  : never;

// Create function signature based on whether route has params
type RouteHandler<Path extends string> = ExtractRouteParams<Path> extends never
  ? () => string
  : (params: { [K in ExtractRouteParams<Path>]: string }) => string;

type Routes = Record<string, (params?: any) => string>;

type UrlState<R extends Routes> = {
  matchedRoute: string;
  params: Record<string, string>;
  query: Record<string, string>;
  hash: string;
  location: Location;
  routes: R;
};

// Convert route pattern like '/user/:id' to regex
const routeToRegex = (route: string): RegExp => {
  const pattern = route
    .replace(/:[^\s/]+/g, '([\\w-]+)') // Replace :param with capture group
    .replace(/\//g, '\\/'); // Escape slashes
  return new RegExp(`^${pattern}$`);
};

// Extract params from URL based on matched route
const extractParams = (route: string, pathname: string): Record<string, string> => {
  const params: Record<string, string> = {};
  const routeParts = route.split('/').filter(Boolean);
  const pathParts = pathname.split('/').filter(Boolean);

  routeParts.forEach((part, index) => {
    if (part.startsWith(':')) {
      const paramName = part.slice(1);
      params[paramName] = pathParts[index] || '';
    }
  });

  return params;
};

// Find which route matches current pathname
const findMatchingRoute = (routes: Routes, pathname: string): string => {
  return Object.keys(routes).find((route) => routeToRegex(route).test(pathname)) || '';
};

// Example usage:
// const routes = {
//   '/': () => 'home',
//   '/about': () => 'about',
//   '/user/:id': ({ id }: { id: string }) => `/user/${id}`,
// };

export const useUrlState = <T extends Record<string, any>>(
  routes: { [K in keyof T]: K extends string ? RouteHandler<K> : never },
) => {
  const parseLocationData = (): UrlState<typeof routes> => {
    const { pathname, search, hash, location } = {
      pathname: document.location.pathname,
      search: document.location.search,
      hash: document.location.hash,
      location: document.location,
    };

    const matchedRoute = findMatchingRoute(routes, pathname);
    const params = matchedRoute ? extractParams(matchedRoute, pathname) : {};
    const query = Object.fromEntries(new URLSearchParams(search));

    return {
      matchedRoute,
      params,
      query,
      hash: hash.replace('#', ''),
      location,
      routes,
    };
  };

  const state = State<UrlState<typeof routes>>(parseLocationData());
  const updateState = () => state.set(parseLocationData());

  window.addEventListener('popstate', updateState);
  window.addEventListener('hashchange', updateState);

  return state;
};
