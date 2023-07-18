import { useState, useContext, useEffect } from 'react';
import { LOGIN } from '../queries';
import { useMutation } from '@apollo/client';
import { NotificationContext } from '../NotificationContext';

const LoginForm = ({ setToken }) => {
    const [username, setName] = useState('');
    const [password, setPassword] = useState('');
    const [setNotification] = useContext(NotificationContext);
    const [login, result] = useMutation(LOGIN, {
        onError: (error) => {
            setNotification(error.GraphQLErrors[0].message);
        },
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        login({ variables: { username, password } });
    };

    useEffect(() => {
        if (result.data) {
            setToken(result.data.login.value);
            localStorage.setItem('library-user-token', result.data.login.value);
        }
    }, [result.data]);

    return (
        <form onSubmit={handleSubmit}>
            username
            <input
                value={username}
                onChange={({ target }) => setName(target.value)}
            />
            <br></br>
            password
            <input
                value={password}
                type="password"
                onChange={({ target }) => setPassword(target.value)}
            />
            <button type="submit">login</button>
        </form>
    );
};

export default LoginForm;
