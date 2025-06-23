import { useCounterStore } from './store/counter'

const App = () => {
  const count = useCounterStore((state) => state.count)
  const increment = useCounterStore((state) => state.increment)
  return (
    <div>
      <h1>Counter: {count}</h1>
    </div>
  )
}

export default App
