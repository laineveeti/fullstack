import { useContext } from 'react';
import { NotificationContext } from '../NotificationContext';

const Notification = () => {
    const { notification } = useContext(NotificationContext);

    const style = {
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    };

    return (
        notification && (
            <div id="notification" style={style}>
                {notification}
            </div>
        )
    );
};

export default Notification;
