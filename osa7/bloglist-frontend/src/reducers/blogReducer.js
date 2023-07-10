import { createSlice } from '@reduxjs/toolkit';
import blogService from '../services/blogs';

const blogReducer = createSlice({
    name: 'blogs',
    initialState: [],
    reducers: {
        setBlogs(state, action) {
            return action.payload;
        },
        appendBlog(state, action) {
            return [...state, action.payload];
        },
        likeBlog(state, action) {
            ++state.find((blog) => blog.id === action.payload).likes;
        },
        removeBlog(state, action) {
            return state.filter((blog) => blog.id !== action.payload);
        },
    },
});

export default blogReducer.reducer;
export const { setBlogs, appendBlog, likeBlog, removeBlog } =
    blogReducer.actions;

export const initializeBlogs = () => {
    return async (dispatch) => {
        const blogs = await blogService.getAll();
        dispatch(setBlogs(blogs));
    };
};

export const createBlog = (blog) => {
    return async (dispatch) => {
        const newBlog = await blogService.createNew(blog);
        dispatch(appendBlog(newBlog));
        return newBlog;
    };
};

export const likeBlogAsync = (id) => {
    return async (dispatch) => {
        dispatch(likeBlog(id));
        await blogService.like(id);
    };
};

export const removeBlogAsync = (id) => {
    return async (dispatch) => {
        await blogService.remove(id);
        dispatch(removeBlog(id));
    };
};
