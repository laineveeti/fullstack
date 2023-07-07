import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useField } from '../hooks';
import { loginAsync } from '../reducers/userReducer';
import { displayErrorNotification } from '../reducers/notificationReducer';
import { Navigate } from 'react-router-dom';

const LoginForm = () => {
    const dispatch = useDispatch();

    // eslint-disable-next-line no-unused-vars
    const { reset, ...username } = useField('text');
    const [password, setPassword] = useState('');
    const user = useSelector((state) => state.user);

    const handleLogin = async (event) => {
        event.preventDefault();
        const credentials = { username: username.value, password: password };
        try {
            dispatch(loginAsync(credentials));
        } catch (exception) {
            displayErrorNotification(dispatch, exception);
        }
    };

    if (user) return <Navigate replace to='/' />;

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div>
                    username
                    <input required {...username} />
                </div>
                <div>
                    password
                    <input
                        required
                        type='password'
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </div>
                <button type='submit'>login</button>
            </form>
        </div>
    );
};

export default LoginForm;
