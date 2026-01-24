import { useState } from 'react'

const Button = ({ text, onClick }) => {
  return <button onClick={onClick}>{text}</button>
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const total = good + neutral + bad
  const average = ((good + bad * -1) / total).toFixed(2);
  const positive = (good / total * 100).toFixed(2);

  return (
    <>
      <section>
        <h1>Give Feedback</h1>
        <div>
          <Button text="Good" onClick={() => setGood(good + 1)} />
          <Button text="Neutral" onClick={() => setNeutral(neutral + 1)} />
          <Button text="Bad" onClick={() => setBad(bad + 1)} />
        </div>
      </section>
      <section>
        <h2>Statistics</h2>
        <p>Good {good}</p>
        <p>Neutral {neutral}</p>
        <p>Bad {bad}</p>
        <p>All {total}</p>
        <p>Average {average}</p>
        <p>Positive {positive}%</p>
      </section>
    </>
  )
}

export default App
