import Authors from './components/Authors';
import BooksByGenre from './components/BooksByGenre';
import Recommended from './components/Recommended';
import LoginForm from './components/LoginForm';
import BirthyearForm from './components/BirthyearForm';
import NewBook from './components/NewBook';
import Navbar from './components/Navbar';
import Notification from './components/Notification';
import { NotificationContext } from './NotificationContext';
import { LoginContext } from './LoginContext';
import { Route, Routes, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { useQuery, useSubscription } from '@apollo/client';
import { ALL_AUTHORS, ALL_BOOKS, BOOK_ADDED, GENRE_BOOKS } from './queries';
import { updateBookCache } from './utils/updateCache';

const App = () => {
    const { userQuery } = useContext(LoginContext);
    const booksQuery = useQuery(ALL_BOOKS);
    const authorsQuery = useQuery(ALL_AUTHORS);
    const { notify } = useContext(NotificationContext);

    useSubscription(BOOK_ADDED, {
        onData: ({ data, client }) => {
            const addedBook = data.data.bookAdded;
            notify(`Book '${addedBook.title}' added`);
            updateBookCache(client.cache, { query: ALL_BOOKS }, addedBook);
        },
    });

    if (authorsQuery.loading || userQuery.loading) {
        return <div>loading...</div>;
    }

    const currentUser = userQuery.data.me;

    return (
        <div>
            <Navbar />
            <Notification />
            <Routes>
                <Route
                    path="/authors"
                    element={
                        <Authors authorsQuery={authorsQuery}>
                            {userQuery ? (
                                <BirthyearForm authorsQuery={authorsQuery} />
                            ) : (
                                <span>login to edit authors</span>
                            )}
                        </Authors>
                    }
                />
                <Route
                    path="/books"
                    element={<BooksByGenre booksQuery={booksQuery} />}
                />
                <Route
                    path="/recommended"
                    element={
                        currentUser ? (
                            <Recommended />
                        ) : (
                            <div>
                                Login to view recommendations
                                <LoginForm />
                            </div>
                        )
                    }
                />
                <Route
                    path="/create"
                    element={
                        currentUser ? (
                            <NewBook />
                        ) : (
                            <div>
                                Login to add new books
                                <LoginForm />
                            </div>
                        )
                    }
                />
                <Route
                    path="/login"
                    element={
                        !currentUser ? (
                            <LoginForm />
                        ) : (
                            <Navigate to="/books" replace />
                        )
                    }
                />
                <Route path="*" element={<Navigate to="/books" replace />} />
            </Routes>
        </div>
    );
};

export default App;
