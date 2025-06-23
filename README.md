# Obostha.js

Minimal State Management Library For React

[![npm version](https://img.shields.io/npm/v/obostha.svg)](https://www.npmjs.com/package/obostha)
[![npm downloads](https://img.shields.io/npm/dm/obostha.svg)](https://www.npmjs.com/package/obostha)
[![GitHub license](https://img.shields.io/github/license/yeasin2002/obostha.js.svg)](https://github.com/yeasin2002/obostha/blob/main/LICENSE)

## Features

- Minimal state management core
- React integration with `useSyncExternalStore`
- TypeScript support

## Installation

```sh
npm install obostha
```

## Usage

### Core Store

Create a store using [`createStore`](src/core/store.ts):

```typescript
import { createStore } from 'obostha/core/store'

type CounterState = { count: number }
const counterStore = createStore<CounterState>((set) => ({
  count: 0,
  increment: () => set((s) => ({ count: s.count + 1 })),
}))
```

- `createStore(fn)` initializes the store with your state and actions.
- The returned store has:
  - `getSnapshot()`: returns the current state
  - `subscribe(listener)`: subscribe to state changes
  - `setState(partial)`: update the state

### React Integration

Use [`create`](src/react/use-store.ts) to create a React hook for your store:

```typescript
import { create } from 'obostha/react/use-store'

type CounterState = { count: number }
const useCounter = create<CounterState>((set) => ({
  count: 0,
  increment: () => set((s) => ({ count: s.count + 1 })),
}))

function Counter() {
  const count = useCounter((s) => s.count)
  const increment = useCounter((s) => s.increment)
  return (
    <button onClick={increment}>
      Count: {count}
    </button>
  )
}
```

- `create(fn)` returns a React hook.
- The hook accepts a selector to pick part of the state.

## API Reference

### [`createStore`](src/core/store.ts)

```typescript
function createStore<S extends object>(
  fn: StateCreator<S>
): {
  getSnapshot: () => S
  subscribe: (listener: () => void) => () => void
  setState: SetState<S>
}
```

- `StateCreator<S>`: `(set: SetState<S>) => S`
- `SetState<S>`: `(partial: Partial<S> | (prev: S) => Partial<S>) => void`

### [`create`](src/react/use-store.ts)

```typescript
function create<S extends object>(fn: StateCreator<S>): <Sel = S>(selector?: (s: S) => Sel) => Sel
```

- Returns a React hook for consuming the store.

## License

MIT

<!--

This starter followed https://www.totaltypescript.com/how-to-create-an-npm-package?fbclid=IwZXh0bgNhZW0CMTEAAR30Xe7tQXTY-63VIZDDhBjL5l_CBBdsgSisemfDFgse8DoKpPSOJ7qNP1E_aem_EfaptgEl5hSIGSAdLKwoig
 -->
