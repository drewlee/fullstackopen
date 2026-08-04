import { useFeedbackProps, useFeedbackActions } from './store'

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const StatisticsLine = ({ label, value }) => {
  return (
    <tr>
      <td>{label}</td>
      <td>{value}</td>
    </tr>
  )
}

const App = () => {
  const { good, neutral, bad } = useFeedbackProps()
  const { incrementGood, incrementNeutral, incrementBad } = useFeedbackActions()

  const total = good + neutral + bad
  const average = ((good + bad * -1) / total).toFixed(2)
  const positive = `${((good / total) * 100).toFixed(2)}%`

  return (
    <>
      <section>
        <h1>Give Feedback</h1>
        <div>
          <Button text="Good" onClick={incrementGood} />
          <Button text="Neutral" onClick={incrementNeutral} />
          <Button text="Bad" onClick={incrementBad} />
        </div>
      </section>
      <section>
        <h2>Statistics</h2>
        {total > 0 ? (
          <table>
            <tbody>
              <StatisticsLine label="Good" value={good} />
              <StatisticsLine label="Neutral" value={neutral} />
              <StatisticsLine label="Bad" value={bad} />
              <StatisticsLine label="All" value={total} />
              <StatisticsLine label="Average" value={average} />
              <StatisticsLine label="Positive" value={positive} />
            </tbody>
          </table>
        ) : (
          <p>No feedback given</p>
        )}
      </section>
    </>
  )
}

export default App
