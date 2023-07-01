import axios from 'axios';

const baseUrl = 'http://localhost:3001/anecdotes';

export const getAll = async () => {
    const response = await axios.get(baseUrl);
    return response.data;
};

export const createNew = async (content) => {
    const response = await axios.post(baseUrl, { content, votes: 0 });
    return response.data;
};

export const updateAnecdote = async ({ anecdote, id }) => {
    const response = await axios.put(`${baseUrl}/${id}`, anecdote);
    return response.data;
};