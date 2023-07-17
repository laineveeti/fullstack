import { useMutation, useQuery } from '@apollo/client';
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries';
import { useState } from 'react';

const BirthyearForm = ({ authors }) => {
    const [editAuthor] = useMutation(EDIT_AUTHOR, {
        refetchQueries: [{ query: ALL_AUTHORS }],
    });
    const [name, setName] = useState('');
    const [born, setBorn] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        editAuthor({ variables: { name: name, born: Number(born) } });

        setName('');
        setBorn('');
    };

    return (
        <div>
            <h2>Set birthyear</h2>
            <form onSubmit={handleSubmit}>
                name
                <select
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                >
                    {authors.map(({ name }) => (
                        <option value={name}>{name}</option>
                    ))}
                </select>
                <br></br>
                born
                <input
                    onChange={(event) => setBorn(event.target.value)}
                    value={born}
                />
                <br></br>
                <button type="submit">update author</button>
            </form>
        </div>
    );
};

const Authors = () => {
    const { loading, data } = useQuery(ALL_AUTHORS);

    if (loading) return <div>loading...</div>;

    const authors = data.allAuthors;

    return (
        <div>
            <h2>authors</h2>
            <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th>born</th>
                        <th>books</th>
                    </tr>
                    {authors.map((a) => (
                        <tr key={a.name}>
                            <td>{a.name}</td>
                            <td>{a.born}</td>
                            <td>{a.bookCount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <BirthyearForm authors={authors} />
        </div>
    );
};

export default Authors;
