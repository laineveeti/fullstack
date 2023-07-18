import { NotificationContext } from './NotificationContext';
import { useState } from 'react';

const NotificationContextProvider = (props) => {
    const [notification, setNotification] = useState(null);
    return (
        <NotificationContext.Provider value={[notification, setNotification]}>
            {props.children}
        </NotificationContext.Provider>
    );
};

export default NotificationContextProvider;
