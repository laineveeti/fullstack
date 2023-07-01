import AnecdoteForm from './components/AnecdoteForm';
import Notification from './components/Notification';
import { getAll, updateAnecdote } from './services/anecdotes';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useNotificationDispatch } from './Context';
import { createSetNotification } from './reducers/notificationReducer';

const App = () => {
    const queryClient = useQueryClient();
    const voteMutation = useMutation(updateAnecdote, {
        onSuccess: (updatedAnecdote) => {
            const anecdotes = queryClient.getQueryData('anecdotes');
            queryClient.setQueryData('anecdotes', anecdotes
                .map(a => {
                    return a.id === updatedAnecdote.id ? updatedAnecdote : a;
                })
            );
        }
    });
    const dispatch = useNotificationDispatch();

    const handleVote = (anecdote) => {
        voteMutation.mutate({ anecdote: { ...anecdote, votes: anecdote.votes + 1 }, id: anecdote.id });
        dispatch(createSetNotification(`anecdote '${anecdote.content}' voted`));
    };

    const result = useQuery('anecdotes', getAll, {
        refetchOnWindowFocus: false,
        retry: 1
    });

    if(result.isLoading) {
        return <div>
            loading anecdotes data
        </div>;
    }

    if(result.isError) {
        return <div>
            anecdote service not available due to problems in server
        </div>;
    }

    const anecdotes = result.data;

    return (
        <div>
            <h3>Anecdote app</h3>

            <Notification />
            <AnecdoteForm />

            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => handleVote(anecdote)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default App;
