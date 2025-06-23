import { create } from 'obostha'

type CounterState = { count: number; increment: () => void }

export const useCounter = create<CounterState>((set) => ({
  count: 0,
  increment: () => set((s) => ({ count: s.count + 1 })),
}))
