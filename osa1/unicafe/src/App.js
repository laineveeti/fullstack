import { useState } from 'react'

const Button = ({handleClick, text}) => (
    <button onClick={handleClick}>{text}</button>
)

const Statistics = ({good, neutral, bad, all}) => {
    if(all === 0) {
        return <p>No feedback given</p>;
    }
    return (
        <table>
            <tbody>
                <StatisticLine statistic={good} text='good' />
                <StatisticLine statistic={neutral} text='neutral' />
                <StatisticLine statistic={all} text='all' />
                <StatisticLine statistic={(good - bad) / all} text='average' />
                <StatisticLine statistic={good * 100 / all + '%'} text='positive' />
            </tbody>
        </table>
    );
}

const StatisticLine = ({statistic, text}) => (
    <tr>
        <td>{text}</td>
        <td>{statistic}</td>
    </tr>
)

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)

  const incrementCounter = (counter, setter) => () => {
    setter(counter + 1);
    setAll(all + 1);
  }

  return (
    <div>
        <h1>give feedback</h1>
        <Button handleClick={incrementCounter(good, setGood)} text="good" />
        <Button handleClick={incrementCounter(neutral, setNeutral)} text="neutral" />
        <Button handleClick={incrementCounter(bad, setBad)} text="bad" />
        <h1>statistics</h1>
        <Statistics good={good} neutral={neutral} bad={bad} all={all} />
    </div>
  )
}

export default App