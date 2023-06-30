const filterReducer = (state='', action) => {
    switch(action.type) {
    case 'SETFILTER':
        return action.payload;
    default:
        return state;
    }
};

export const updateFilter = (value) => {
    return {
        type: 'SETFILTER',
        payload: value
    };
};

export default filterReducer;