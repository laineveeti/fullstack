import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    createHttpLink,
    split,
} from '@apollo/client';
import { BrowserRouter } from 'react-router-dom';
import { setContext } from '@apollo/client/link/context';
import { getMainDefinition } from '@apollo/client/utilities';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';

import NotificationContextProvider from './NotificationContextProvider';
import LoginContextProvider from './LoginContextProvider';

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
const wsLink = new GraphQLWsLink(createClient({ url: 'ws://localhost:4000' }));
const splitLink = split(
    ({ query }) => {
        const definition = getMainDefinition(query);
        return (
            definition.kind === 'OperationDefinition' &&
            definition.operation === 'subscription'
        );
    },
    wsLink,
    authLink.concat(httpLink)
);

const client = new ApolloClient({
    cache: new InMemoryCache(),
    setUseDevtools: true,
    link: splitLink,
});

ReactDOM.createRoot(document.getElementById('root')).render(
    <ApolloProvider client={client}>
        <NotificationContextProvider>
            <LoginContextProvider>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </LoginContextProvider>
        </NotificationContextProvider>
    </ApolloProvider>
);
