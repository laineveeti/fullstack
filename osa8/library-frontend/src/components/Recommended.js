import { useContext } from 'react';
import { useQuery } from '@apollo/client';
import { GENRE_BOOKS } from '../queries';
import { LoginContext } from '../LoginContext';
import Books from '../components/Books';

const Recommended = () => {
    const { userQuery } = useContext(LoginContext);
    const currentUser = userQuery.data.me;
    const genreQuery = useQuery(GENRE_BOOKS, {
        variables: { genre: currentUser.favoriteGenre },
    });

    if (genreQuery.loading) return <div>loading...</div>;

    return (
        <div>
            <h1>recommended</h1>
            books in your favorite genre {currentUser.favoriteGenre}
            <Books books={genreQuery.data.allBooks} />
        </div>
    );
};

export default Recommended;
