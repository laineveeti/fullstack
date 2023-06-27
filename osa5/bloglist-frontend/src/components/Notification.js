const Notification = ({ msg, color }) => {
    if(msg === null) {
        return null;
    }

    const style = {
        color: color,
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    };

    return (
        <div id='msg' style={style}>
            {msg}
        </div>
    );
};

export default Notification;