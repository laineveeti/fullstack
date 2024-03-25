import { GENRE_BOOKS } from '../queries';
import { useState } from 'react';
import { useQuery } from '@apollo/client';
import GenreSelector from '../components/GenreSelector';
import Books from '../components/Books';

const BooksByGenre = ({ booksQuery }) => {
    const [genre, setGenre] = useState('');
    const genreQuery = useQuery(GENRE_BOOKS, { variables: { genre } });

    if (booksQuery.loading || genre & genreQuery.loading)
        return <div>loading...</div>;
    const books = booksQuery.data.allBooks;
    const genreBooks = genreQuery.data && genreQuery.data.allBooks;

    return (
        <div>
            <h2>books</h2>
            {genre ? (
                <>
                    books in genre <b>{genre}</b>
                </>
            ) : (
                <> all books </>
            )}
            <GenreSelector books={books} setGenre={setGenre} />
            <Books books={genreBooks || books} />
        </div>
    );
};

export default BooksByGenre;
