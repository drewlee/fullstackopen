const Header = (props) => {
  return <h1>{props.course}</h1>
}

const Part = (props) => {
  return <p>{props.info.name} {props.info.exercises}</p>
}

const Content = (props) => {
  return (
    <>
      <Part info={props.parts[0]} />
      <Part info={props.parts[1]} />
      <Part info={props.parts[2]} />
    </>
  )
}

const Total = (props) => {
  const total = props.parts.reduce((sum, { exercises }) => sum + exercises, 0)
  return <p>Number of exercises {total}</p>
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default App
