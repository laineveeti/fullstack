const notificationReducer = (state, action) => {
    switch(action.type) {
    case 'SETNOTIFICATION': {
        return action.payload;
    }
    default:
        return state;
    }
};

export const createSetNotification = (content) => {
    return {
        type: 'SETNOTIFICATION',
        payload: content
    };
};

export default notificationReducer;