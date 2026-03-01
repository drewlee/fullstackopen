const Header = ({ course }) => {
  return <h2>{course}</h2>
}

const Part = ({ info }) => {
  return <p>{info.name} {info.exercises}</p>
}

const Content = ({ parts }) => {
  return parts.map(part => <Part key={part.id} info={part} />)
}

const Total = ({ parts }) => {
  const total = parts.reduce((sum, { exercises }) => sum + exercises, 0)
  return <p><strong>Number of exercises: {total}</strong></p>
}

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default Course
