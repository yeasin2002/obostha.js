import { useCounter } from './store/counter'

const App = () => {
  const count = useCounter((s) => s.count)
  const increment = useCounter((s) => s.increment)
  return (
    <div>
      <h1>Counter: {count}</h1>
      <button onClick={increment}>Increment</button>
    </div>
  )
}

export default App
