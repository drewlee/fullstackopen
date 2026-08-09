import useCounter from '../hooks/use-counter'

const Display = () => {
  const { counter } = useCounter()

  return <div>{counter}</div>
}

export default Display
