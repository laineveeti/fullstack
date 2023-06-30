import { vote } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';
import { useDispatch, useSelector } from 'react-redux';

const AnecdoteList = () => {
    const anecdotes = useSelector(({ filter, anecdotes }) => {
        return filter === ''
            ? anecdotes
            : anecdotes.filter(a => a.content.toLowerCase().includes(filter.toLowerCase()));
    });

    const handleVote = (anecdote) => {
        dispatch(vote(anecdote.id));
        dispatch(setNotification(`you voted '${anecdote.content}'`, 10));
    };

    const dispatch = useDispatch();

    return <div>
        <h2>Anecdotes</h2>
        {[...anecdotes]
            .sort((a, b) => b.votes - a.votes)
            .map(anecdote =>
                <div key={anecdote.id}>
                    <div> {anecdote.content} </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => handleVote(anecdote)}>vote</button>
                    </div>
                </div>
            )
        }
    </div>;
};

export default AnecdoteList;