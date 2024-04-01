import { NotificationContext } from './NotificationContext';
import { useState } from 'react';

const NotificationContextProvider = (props) => {
    const [notification, setNotification] = useState(null);

    const notify = (message) => {
        setNotification(message);
        setTimeout(() => {
            setNotification(null);
        }, 10000);
    };

    return (
        <NotificationContext.Provider value={{ notification, notify }}>
            {props.children}
        </NotificationContext.Provider>
    );
};

export default NotificationContextProvider;
