import { useState, useContext } from 'react';
import { LoginContext } from '../LoginContext';
import { Navigate } from 'react-router';

const LoginForm = () => {
    const [username, setName] = useState('');
    const [password, setPassword] = useState('');

    const { userQuery, loginMutation } = useContext(LoginContext);

    const handleSubmit = (event) => {
        event.preventDefault();
        loginMutation({ variables: { username, password } });
    };

    return userQuery.data.me ? (
        <Navigate to='/' />
    ) : (
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
                type='password'
                onChange={({ target }) => setPassword(target.value)}
            />
            <button type='submit'>login</button>
        </form>
    );
};

export default LoginForm;
