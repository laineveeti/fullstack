import { createSlice } from '@reduxjs/toolkit';
import usersService from '../services/users';


const usersReducer = createSlice({
    name: 'users',
    initialState: [],
    reducers: {
        setUsers(state, action) {
            return action.payload;
        }
    }
});

export default usersReducer.reducer;

export const { setUsers } = usersReducer.actions;

export const initializeUsers = () => {
    return async (dispatch) => {
        const response = await usersService.getAll();
        dispatch(setUsers(response));
    };
};