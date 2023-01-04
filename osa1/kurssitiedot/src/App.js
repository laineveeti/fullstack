const Header = (props) => {
    return (
        <>
            <h1>{props.title}</h1>
        </>
    );
}

const Content = (props) => {
    return (
        <>
            <p>{props.title} {props.count}</p>
        </>
    );
}

const Total = (props) => {
    return (
        <>
            <p>Number of exercises {props.total}</p>
        </>
    );
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
      <>
        <Header title={course} />
        <Content title={part1} count={exercises1} />
        <Content title={part2} count={exercises2} />
        <Content title={part3} count={exercises3} />
        <Total total={exercises1 + exercises2 + exercises3} />
      </>
    )
}
  
export default App