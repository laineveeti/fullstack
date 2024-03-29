import { useState, useContext } from 'react';
import { ADD_BOOK, ALL_BOOKS, GENRE_BOOKS, ALL_AUTHORS } from '../queries';
import { useMutation } from '@apollo/client';
import { NotificationContext } from '../NotificationContext';

const NewBook = () => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [published, setPublished] = useState('');
    const [genre, setGenre] = useState('');
    const [genres, setGenres] = useState([]);
    const [, setError] = useContext(NotificationContext);

    const [addBook] = useMutation(ADD_BOOK, {
        refetchQueries: [
            { query: ALL_BOOKS },
            { query: GENRE_BOOKS },
            { query: ALL_AUTHORS },
        ],
        onError: (error) => {
            const messages = error.graphQLErrors
                .map((e) => `${e.message} : ${e.extensions.error.message}`)
                .join('\n');
            setError(messages);
        },
    });

    const submit = async (event) => {
        event.preventDefault();

        addBook({
            variables: {
                title,
                author,
                published: Number(published),
                genres,
            },
        });

        setTitle('');
        setPublished('');
        setAuthor('');
        setGenres([]);
        setGenre('');
    };

    const addGenre = () => {
        setGenres(genres.concat(genre));
        setGenre('');
    };

    return (
        <div>
            <form onSubmit={submit}>
                <div>
                    title
                    <input
                        value={title}
                        onChange={({ target }) => setTitle(target.value)}
                    />
                </div>
                <div>
                    author
                    <input
                        value={author}
                        onChange={({ target }) => setAuthor(target.value)}
                    />
                </div>
                <div>
                    published
                    <input
                        type='number'
                        value={published}
                        onChange={({ target }) => setPublished(target.value)}
                    />
                </div>
                <div>
                    <input
                        value={genre}
                        onChange={({ target }) => setGenre(target.value)}
                    />
                    <button onClick={addGenre} type='button'>
                        add genre
                    </button>
                </div>
                <div>genres: {genres.join(' ')}</div>
                <button type='submit'>create book</button>
            </form>
        </div>
    );
};

export default NewBook;
