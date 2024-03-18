import { LoginContext } from './LoginContext';
import { useEffect, useContext } from 'react';
import { useApolloClient, useMutation, useQuery } from '@apollo/client';
import { LOGIN, CURRENT_USER } from './queries';
import { NotificationContext } from './NotificationContext';

const LoginContextProvider = (props) => {
    const userQuery = useQuery(CURRENT_USER);
    const client = useApolloClient();

    const [, setError] = useContext(NotificationContext);
    const [loginMutation, result] = useMutation(LOGIN, {
        onError: (error) => {
            console.log(error.graphQLErrors);
            const messages = error.graphQLErrors
                .map((e) => e.message)
                .join('\n');
            setError(messages);
        },
    });

    // after login mutation sent, add token to local storage
    useEffect(() => {
        if (result.data) {
            const newToken = result.data.login.value;
            localStorage.setItem('library-user-token', newToken);
            client.resetStore();
        }
    }, [result.data]);

    const logout = () => {
        localStorage.clear();
        client.resetStore();
    };

    return (
        <LoginContext.Provider value={{ userQuery, loginMutation, logout }}>
            {props.children}
        </LoginContext.Provider>
    );
};

export default LoginContextProvider;
