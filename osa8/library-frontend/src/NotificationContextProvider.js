import { NotificationContext } from './NotificationContext';
import { useState } from 'react';

const NotificationContextProvider = (props) => {
    const [notification, setNotification] = useState(null);

    const setError = (message) => {
        setNotification(message);
        setTimeout(() => {
            setNotification(null);
        }, 10000);
    };

    return (
        <NotificationContext.Provider value={[notification, setError]}>
            {props.children}
        </NotificationContext.Provider>
    );
};

export default NotificationContextProvider;
