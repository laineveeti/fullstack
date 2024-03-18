import Authors from './components/Authors';
import Books from './components/Books';
import LoginForm from './components/LoginForm';
import BirthyearForm from './components/BirthyearForm';
import NewBook from './components/NewBook';
import Notification from './components/Notification';
import GenreSelector from './components/GenreSelector';
import { LoginContext } from './LoginContext';
import { Link, Route, Routes, Navigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { useQuery } from '@apollo/client';
import { ALL_AUTHORS, ALL_BOOKS } from './queries';

const App = () => {
    const { userQuery, logout } = useContext(LoginContext);
    const authorsQuery = useQuery(ALL_AUTHORS);
    const booksQuery = useQuery(ALL_BOOKS);
    const [selectedGenre, setGenre] = useState('');
    /*     const userQuery = useQuery(CURRENT_USER); */

    if (
        authorsQuery.loading ||
        booksQuery.loading ||
        (!userQuery && userQuery.loading)
    ) {
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

    const currentUser = userQuery.data.me;

    return (
        <div>
            <Link to='/authors'>authors</Link>
            <Link to='/books'>books</Link>
            {currentUser ? <Link to='/create'>add</Link> : null}
            <Notification />
            {currentUser ? (
                <button onClick={logout}>logout</button>
            ) : (
                <Link to='/login'>login</Link>
            )}
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
                    path='/recommended'
                    element={
                        currentUser ? (
                            <div>
                                <h1>recommended</h1>
                                books in your favorite genre{' '}
                                {currentUser.favoriteGenre}
                                <Books
                                    booksQuery={booksQuery}
                                    genre={currentUser.favoriteGenre}
                                />
                            </div>
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
