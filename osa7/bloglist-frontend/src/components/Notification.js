import { useSelector } from 'react-redux';

const Notification = () => {
    const { color, content } = useSelector((state) => state.notification);

    if (content === '') {
        return null;
    }

    const style = {
        color: color,
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    };

    return (
        <div id='msg' style={style}>
            {content}
        </div>
    );
};

export default Notification;
