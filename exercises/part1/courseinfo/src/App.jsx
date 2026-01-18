const Header = (props) => {
  return <h1>{props.content}</h1>
}

const Content = (props) => {
  return (
    <>
      <p>{props.name1} {props.total1}</p>
      <p>{props.name2} {props.total2}</p>
      <p>{props.name3} {props.total3}</p>
    </>
  )
}

const Total = (props) => {
  return <p>Number of exercises {props.total}</p>
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header content={course} />
      <Content
        name1={part1}
        name2={part2}
        name3={part3}
        total1={exercises1}
        total2={exercises2}
        total3={exercises3}
      />
      <Total total={exercises1 + exercises2 + exercises3} />
    </div>
  )
}

export default App
