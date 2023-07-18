import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    createHttpLink,
} from '@apollo/client';
import { BrowserRouter } from 'react-router-dom';
import { setContext } from '@apollo/client/link/context';
import NotificationContextProvider from './NotificationContextProvider';

const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('library-user-token');
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : null,
        },
    };
});

const httpLink = createHttpLink({
    uri: 'http://localhost:4000',
});

const client = new ApolloClient({
    cache: new InMemoryCache(),
    setUseDevtools: true,
    link: authLink.concat(httpLink),
});

ReactDOM.createRoot(document.getElementById('root')).render(
    <ApolloProvider client={client}>
        <NotificationContextProvider>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </NotificationContextProvider>
    </ApolloProvider>
);
