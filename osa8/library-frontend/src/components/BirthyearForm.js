import { useState, useContext } from 'react';
import { useMutation } from '@apollo/client';
import { EDIT_AUTHOR, ALL_AUTHORS } from '../queries';
import { NotificationContext } from '../NotificationContext';

const BirthyearForm = ({ authorsQuery }) => {
    const { notify } = useContext(NotificationContext);

    const [editAuthor] = useMutation(EDIT_AUTHOR, {
        refetchQueries: [{ query: ALL_AUTHORS }],
        onError: (error) => {
            const messages = error.graphQLErrors
                .map((e) => e.message)
                .join('\n');
            notify(messages);
        },
    });

    const [name, setName] = useState('');
    const [born, setBorn] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        editAuthor({ variables: { name: name, born: Number(born) } });
        setName('');
        setBorn('');
    };

    if (authorsQuery.loading) {
        return <>loading data...</>;
    }

    return (
        <div>
            <h2>Set birthyear</h2>
            <form onSubmit={handleSubmit}>
                name
                <select
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                >
                    {authorsQuery.data.allAuthors.map(({ name }) => (
                        <option key={`option-${name}`} value={name}>
                            {name}
                        </option>
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

export default BirthyearForm;
