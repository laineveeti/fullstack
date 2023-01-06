const Course = ({ course }) => (
    <>
        <Header name={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
    </>
);

const Header = ({ name }) => (<h1>{name}</h1>);

const Content = ({ parts }) => (
    <div>
        {parts.map(part => (
            <Part key={part.id} part={part} />
        ))}
    </div>
);

const Part = ({ part }) => (<p>{part.name} {part.exercises}</p>);

const Total = ({ parts }) => (<p>total of {parts.reduce((acc, curr) => acc + curr.exercises, 0)} exercises</p>);

export default Course;