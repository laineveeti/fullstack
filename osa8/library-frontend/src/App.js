import Authors from './components/Authors';
import Books from './components/Books';
import LoginForm from './components/LoginForm';
import NewBook from './components/NewBook';
import Notification from './components/Notification';
import { Link, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useApolloClient, useQuery } from '@apollo/client';
import BirthyearForm from './components/BirthyearForm';
import GenreSelector from './components/GenreSelector';
import { ALL_AUTHORS, ALL_BOOKS, CURRENT_USER } from './queries';

const App = () => {
    const [token, setToken] = useState(null);
    const client = useApolloClient();
    const authorsQuery = useQuery(ALL_AUTHORS);
    const booksQuery = useQuery(ALL_BOOKS);
    const [selectedGenre, setGenre] = useState('');
    const userQuery = useQuery(CURRENT_USER);

    const logout = () => {
        setToken(null);
        localStorage.clear();
        client.resetStore();
    };

    useEffect(() => {
        if (!token) {
            const storedToken = localStorage.getItem('library-user-token');
            if (storedToken) {
                setToken(storedToken);
            }
        }
    });

    if (authorsQuery.loading || booksQuery.loading || userQuery.loading) {
        return <div>loading...</div>;
    }

    const genres = booksQuery.data.allBooks.reduce((acc, book) => {
        let newGenres = acc;
        book.genres.forEach((genre) => {
            if (!newGenres.includes(genre)) {
                newGenres = newGenres.concat(genre);
            }
        });
        return newGenres;
    }, []);

    return (
        <div>
            <Link to="/authors">authors</Link>
            <Link to="/books">books</Link>
            <Link to="/create">add</Link>
            <Notification />
            {token ? (
                <button onClick={logout}>logout</button>
            ) : (
                <Link to="/login">login</Link>
            )}
            <Routes>
                <Route
                    path="/authors"
                    element={
                        <Authors authorsQuery={authorsQuery}>
                            {token ? (
                                <BirthyearForm authorsQuery={authorsQuery} />
                            ) : (
                                <span>login to edit authors</span>
                            )}
                        </Authors>
                    }
                />

                <Route
                    path="/books"
                    element={
                        <div>
                            <h2>books</h2>
                            {selectedGenre ? (
                                <>
                                    books in genre <b>{selectedGenre}</b>
                                </>
                            ) : (
                                <>all books</>
                            )}
                            <Books
                                booksQuery={booksQuery}
                                genre={selectedGenre}
                            />
                            <GenreSelector
                                genres={genres}
                                setGenre={setGenre}
                            />
                        </div>
                    }
                />
                <Route
                    path="/recommended"
                    element={
                        <div>
                            <h1>recommended</h1>
                            books in your favorite genre{' '}
                            {userQuery.data.me.favoriteGenre}
                            <Books
                                booksQuery={booksQuery}
                                genre={userQuery.data.me.favoriteGenre}
                            />
                        </div>
                    }
                />
                <Route path="/create" element={<NewBook />} />
                <Route
                    path="/login"
                    element={<LoginForm setToken={setToken} />}
                />
            </Routes>
        </div>
    );
};

export default App;
