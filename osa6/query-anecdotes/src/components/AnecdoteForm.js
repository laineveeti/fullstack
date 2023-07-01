import { createNew } from '../services/anecdotes';
import { useMutation, useQueryClient } from 'react-query';
import { useNotificationDispatch } from '../Context';
import { createSetNotification } from '../reducers/notificationReducer';

const AnecdoteForm = () => {
    const dispatch = useNotificationDispatch();
    const queryClient = useQueryClient();
    const newMutation = useMutation(createNew, {
        onSuccess: (newAnecdote) => {
            const anecdotes = queryClient.getQueryData('anecdotes');
            queryClient.setQueryData('anecdotes', [...anecdotes, newAnecdote]);
        },
        onError: () => {
            dispatch(createSetNotification('too short anecdote, must have length 5 or more'));
        }
    });

    const onCreate = (event) => {
        event.preventDefault();
        const content = event.target.anecdote.value;
        event.target.anecdote.value = '';
        newMutation.mutate(content);
        dispatch(createSetNotification(`new anecdote ${content} added`));
    };

    return (
        <div>
            <h3>create new</h3>
            <form onSubmit={onCreate}>
                <input name='anecdote' />
                <button type="submit">create</button>
            </form>
        </div>
    );
};

export default AnecdoteForm;
