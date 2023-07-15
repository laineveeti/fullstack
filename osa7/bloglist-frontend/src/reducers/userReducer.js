import { createSlice } from '@reduxjs/toolkit';
import login from '../services/login';
import blogService from '../services/blogs';
import { displayErrorNotification } from './notificationReducer';
const { Buffer } = require('buffer/');

const userReducer = createSlice({
    name: 'user',
    initialState: null,
    reducers: {
        setUser(state, action) {
            return action.payload;
        },
        logoutUser() {
            return null;
        },
    },
});

export default userReducer.reducer;
export const { setUser, logoutUser } = userReducer.actions;

export const checkLoggedIn = () => {
    return async (dispatch) => {
        const loggedInUser = JSON.parse(
            window.localStorage.getItem('loggedBloglistUser')
        );
        if (loggedInUser) {
            dispatch(setUser(loggedInUser));
            blogService.setToken(loggedInUser.token);
        }
    };
};

export const checkTokenExpiration = (user) => {
    return async (dispatch) => {
        const isTokenExpired = Date.now() >= JSON.parse(Buffer.from(user.token.split('.')[1], 'base64').toString()).exp * 1000;
        if(isTokenExpired) {
            displayErrorNotification(dispatch, 'token expired');
            dispatch(logoutUser());
        }
    };
};

export const loginAsync = (credentials) => {
    return async (dispatch) => {
        const user = await login(credentials);
        window.localStorage.setItem('loggedBloglistUser', JSON.stringify(user));
        blogService.setToken(user.token);
        dispatch(setUser(user));
    };
};

export const logout = (dispatch) => {
    window.localStorage.removeItem('loggedBloglistUser');
    dispatch(setUser(null));
    blogService.emptyToken();
};
