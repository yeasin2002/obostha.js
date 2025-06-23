import { useSyncExternalStore } from 'react'

type PartialState<S> = Partial<S> | ((prev: S) => Partial<S>)
export type SetState<S> = (p: PartialState<S>) => void
export type StateCreator<S> = (set: SetState<S>) => S

export function createStore<S extends object>(fn: StateCreator<S>) {
  let state: S
  const listeners = new Set<() => void>()

  const setState: SetState<S> = (partial) => {
    const next =
      typeof partial === 'function'
        ? { ...state, ...(partial as (prev: S) => Partial<S>)(state) }
        : { ...state, ...partial }

    state = next as S
    listeners.forEach((l) => l())
  }

  const subscribe = (l: () => void) => {
    listeners.add(l)
    return () => listeners.delete(l)
  }

  const getSnapshot = () => state

  state = fn(setState) // init

  return { getSnapshot, subscribe, setState }
}
