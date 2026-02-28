---
name: useUrlState
description: State Object to track the current URL in the application.
license: MIT
metadata:
  author: Kevin Lint
  version: '1.0'
---

# UrlState

A reactive state hook that tracks the current URL, matching it against a set of defined routes and extracting params, query strings, and hash fragments.

## Features

- **Route matching**: Matches the current pathname against Express-style route patterns (e.g. `/user/:id`)
- **Param extraction**: Automatically extracts named parameters from matched routes
- **Query & hash parsing**: Parses query string parameters and hash fragments from the URL
- **Type-safe routes**: Route handler signatures are inferred from the route pattern — routes with `:param` segments require a typed params object
- **Reactive**: Returns a State object that updates on `popstate` and `hashchange` events

## Usage

```typescript
import { useUrlState } from '@linttrap/oem';

const url = useUrlState<{
  '/': any;
  '/about': any;
  '/user/:id': any;
  '/user/:id/post/:postId': any;
}>({
  '/': () => '/',
  '/about': () => '/about',
  '/user/:id': ({ id }) => `/user/${id}`,
  '/user/:id/post/:postId': ({ id, postId }) => `/user/${id}/post/${postId}`,
});

// Read the current URL state
const { matchedRoute, params, query, hash } = url.val();

// Subscribe to URL changes
url.sub(({ matchedRoute, params, query, hash }) => {
  console.log('Route:', matchedRoute);
  console.log('Params:', params);
  console.log('Query:', query);
  console.log('Hash:', hash);
});
```

## Signature

```typescript
function useUrlState<T extends Record<string, any>>(routes: {
  [K in keyof T]: K extends string ? RouteHandler<K> : never;
}): StateType<UrlState<typeof routes>, {}>;
```

## Parameters

| Parameter | Type     | Description                                                                                      |
| --------- | -------- | ------------------------------------------------------------------------------------------------ |
| `routes`  | `object` | A map of route patterns to handler functions. Patterns use `:param` syntax for dynamic segments. |

### Route Handler Signatures

Route handlers are type-inferred from the pattern string:

- **Static routes** (no params): `() => string`
- **Dynamic routes** (with `:param`): `(params: { [K in ExtractRouteParams<Path>]: string }) => string`

## Return Value

Returns a `State<UrlState>` containing:

| Property       | Type                     | Description                                                  |
| -------------- | ------------------------ | ------------------------------------------------------------ |
| `matchedRoute` | `string`                 | The route pattern that matched the current pathname, or `''` |
| `params`       | `Record<string, string>` | Named parameters extracted from the matched route            |
| `query`        | `Record<string, string>` | Parsed query string parameters                               |
| `hash`         | `string`                 | The hash fragment (without the leading `#`)                  |
| `location`     | `Location`               | The raw `document.location` object                           |
| `routes`       | `Routes`                 | The routes map passed to the hook                            |

## Behavior

- Parses `document.location` on initialization and returns the matched state
- Listens for `popstate` events (browser back/forward navigation)
- Listens for `hashchange` events (hash fragment changes)
- On each event, re-parses the location and updates the state, notifying all subscribers
- Route matching converts patterns like `/user/:id` to regex and tests against the current pathname
- If no route matches, `matchedRoute` is an empty string and `params` is an empty object

## Common Patterns

### Route-based rendering

```typescript
const url = useUrlState<{
  '/': any;
  '/about': any;
  '/contact': any;
}>({
  '/': () => '/',
  '/about': () => '/about',
  '/contact': () => '/contact',
});

url.sub(({ matchedRoute }) => {
  switch (matchedRoute) {
    case '/':
      renderHome();
      break;
    case '/about':
      renderAbout();
      break;
    case '/contact':
      renderContact();
      break;
  }
});
```

### Reading dynamic params

```typescript
const url = useUrlState<{
  '/user/:id': any;
}>({
  '/user/:id': ({ id }) => `/user/${id}`,
});

// If current URL is /user/42
const { params } = url.val();
console.log(params.id); // "42"
```

### Using with conditions

```typescript
const url = useUrlState<{
  '/': any;
  '/about': any;
}>({
  '/': () => '/',
  '/about': () => '/about',
});

// Create a condition to test the matched route
const isHome = url.$test((s) => s.matchedRoute === '/');
const isAbout = url.$test((s) => s.matchedRoute === '/about');
```

## Notes

- Event listeners (`popstate`, `hashchange`) are added globally and remain active for the lifetime of the page
- Route patterns support alphanumeric characters and hyphens in param values (`[\w-]+`)
- Query string parsing uses the standard `URLSearchParams` API
- The `routes` object is included in the state value for programmatic navigation via handler functions
