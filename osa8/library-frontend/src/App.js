import Authors from './components/Authors';
import BooksByGenre from './components/BooksByGenre';
import Recommended from './components/Recommended';
import LoginForm from './components/LoginForm';
import BirthyearForm from './components/BirthyearForm';
import NewBook from './components/NewBook';
import Navbar from './components/Navbar';
import Notification from './components/Notification';
import { LoginContext } from './LoginContext';
import { Route, Routes, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { useQuery } from '@apollo/client';
import { ALL_AUTHORS, ALL_BOOKS } from './queries';

const App = () => {
    const { userQuery } = useContext(LoginContext);
    const booksQuery = useQuery(ALL_BOOKS);
    const authorsQuery = useQuery(ALL_AUTHORS);

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
                    path='/authors'
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
                    path='/books'
                    element={<BooksByGenre booksQuery={booksQuery} />}
                />
                <Route
                    path='/recommended'
                    element={
                        currentUser ? (
                            <Recommended />
                        ) : (
                            <Navigate to='/login' replace />
                        )
                    }
                />
                <Route path='/create' element={<NewBook />} />
                <Route path='/login' element={<LoginForm />} />
                <Route path='*' element={<Navigate to='/books' replace />} />
            </Routes>
        </div>
    );
};

export default App;
