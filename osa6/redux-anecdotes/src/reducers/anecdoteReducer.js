import { createSlice } from '@reduxjs/toolkit';
import anecdoteService from '../services/anecdotes';

const anecdoteSlice = createSlice({
    name: 'anecdotes',
    initialState: [],
    reducers: {
        incrementVote(state, action) {
            var id = action.payload;
            return state.map(anecdote => {
                return anecdote.id !== id ? anecdote : {
                    ...anecdote,
                    votes: anecdote.votes + 1
                };
            });
        },
        appendAnecdote(state, action) {
            return [...state, action.payload];
        },
        setAnecdotes(state, action) {
            return action.payload;
        }
    }
});

export const initializeAnecdotes = () => {
    return async dispatch => {
        const anecdotes = await anecdoteService.getAll();
        dispatch(setAnecdotes(anecdotes));
    };
};

export const createAnecdote = (content) => {
    return async dispatch => {
        const newAnecdote = await anecdoteService.createNew(content);
        dispatch(appendAnecdote(newAnecdote));
    };
};

export const vote = (id) => {
    return async dispatch => {
        dispatch(incrementVote(id));
        await anecdoteService.vote(id);
    };
};

export default anecdoteSlice.reducer;
export const { incrementVote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions;