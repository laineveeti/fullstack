import { useReducer, createContext, useContext } from 'react';
import notificationReducer from './reducers/notificationReducer';

const NotificationContext = createContext();

export const NotificationContextProvider = (props) => {
    const [notification, notificationDispatch] = useReducer(notificationReducer, '');

    return <NotificationContext.Provider value={[notification, notificationDispatch]}>
        {props.children}
    </NotificationContext.Provider>;
};

export const useNotification = () => {
    return useContext(NotificationContext)[0];
};

export const useNotificationDispatch = () => {
    return useContext(NotificationContext)[1];
};

export default NotificationContext;