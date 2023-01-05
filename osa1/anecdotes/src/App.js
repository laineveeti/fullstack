import { useState } from 'react'

const Anecdote = ({votes, anecdotes, selected}) => (
    <>
        {anecdotes[selected]}
        <br></br>
        has {votes[selected]} votes
    </>
)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ];

  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));
   
  const [selected, setSelected] = useState(0);

  const selectRandom = () => {
    const randInt = Math.floor(Math.random() * anecdotes.length);
    setSelected(randInt);
  }

  const vote = () => {
    const copy = [... votes];
    copy[selected] += 1;
    setVotes(copy);
  }

  const getMostVotesKey = () => Object.keys(votes).reduce((a, b) => votes[a] > votes[b] ? a : b);

  return (
    <div>
        <h1>Anecdote of the day</h1>
        <Anecdote selected={selected} votes={votes} anecdotes={anecdotes} />
        <br></br>
        <button onClick={vote}>vote</button>
        <button onClick={selectRandom}>next anecdote</button>
        <h1>Anecdote with most votes</h1>
        <Anecdote selected={getMostVotesKey()} votes={votes} anecdotes={anecdotes} />
    </div>
  )
}

export default App