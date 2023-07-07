import { createSlice } from '@reduxjs/toolkit';

const notificationReducer = createSlice({
    name: 'notification',
    initialState: {
        color: 'green',
        content: '',
    },
    reducers: {
        setNotification(state, action) {
            return { ...state, content: action.payload };
        },
        setNotificationColor(state, action) {
            return { ...state, color: action.payload };
        },
    },
});

export default notificationReducer.reducer;
export const { setNotification, setNotificationColor } =
    notificationReducer.actions;

export const displayNotification = (dispatch, msg, color) => {
    dispatch(setNotification(msg));
    dispatch(setNotificationColor(color));
    setTimeout(() => {
        dispatch(setNotification(null));
        dispatch(setNotificationColor('white'));
    }, 4000);
};

export const displayErrorNotification = (dispatch, msg) => {
    displayNotification(dispatch, msg, 'red');
};
