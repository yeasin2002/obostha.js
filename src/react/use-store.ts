import { useSyncExternalStore } from 'react'
import type { StateCreator } from '../core/store'
import { createStore } from '../core/store'

export function create<S extends object>(fn: StateCreator<S>) {
  const api = createStore(fn)

  function useStore<Sel = S>(selector: (s: S) => Sel = (s) => s as unknown as Sel): Sel {
    return useSyncExternalStore(api.subscribe, () => selector(api.getSnapshot()))
  }

  return useStore
}
