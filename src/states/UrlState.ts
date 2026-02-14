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

// The Routes type - a record of path strings to handler functions
type Routes = Record<string, (params?: any) => string>;

type UrlStateProps<R extends Routes> = {
  currentRoute: string;
  location: Location;
  searchParams: {
    [k: string]: string;
  };
  variables: {
    [k: string]: string | null;
  };
  hash: string;
  routes: R;
};

// Example Routes object:
// const routes = {
//   '/': () => 'home',
//   '/about': () => 'about',
//   '/user/:id': ({ id }: { id: string }) => `/user/${id}`,
// };

export const useUrlState = <T extends Record<string, any>>(
  routes: { [K in keyof T]: K extends string ? RouteHandler<K> : never },
) => {
  const parseUrlandLocationData = () => {
    const currentRoute =
      Object.entries(routes).find(([key]) => {
        // find the first route that matches a route key
        const regex = new RegExp(
          '^' +
            key
              .replace(/:[^\s/]+/g, '([\\w-]+)') // Replace :variable with a regex group
              .replace(/\//g, '\\/') + // Escape slashes
            '$',
        );
        // return the key if the pathname matches the regex
        return regex.test(document.location.pathname);
      })?.[0] || '';

    // get variables from the URL based on the currentRoute
    const variables: { [k: string]: string | null } = {};
    if (currentRoute) {
      const routeParts = currentRoute.split('/').filter(Boolean);
      const pathParts = document.location.pathname.split('/').filter(Boolean);

      routeParts.forEach((part, index) => {
        if (part.startsWith(':')) {
          const varName = part.slice(1);
          variables[varName] = pathParts[index] || null;
        }
      });
    }

    const location: Location = document.location;

    const searchParams = Object.fromEntries(
      new URLSearchParams(document.location.search).entries(),
    );

    const hash = document.location.hash.replace('#', '');

    return {
      currentRoute,
      location,
      searchParams,
      variables,
      hash,
      routes,
    };
  };

  const state = State<UrlStateProps<typeof routes>>(parseUrlandLocationData());

  // on popstate, update the state with the new URL data
  window.addEventListener('popstate', () => {
    state.set(parseUrlandLocationData());
  });

  // on hashchange, update the state with the new URL data
  window.addEventListener('hashchange', () => {
    state.set(parseUrlandLocationData());
  });

  return state;
};
