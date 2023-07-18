import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { EDIT_AUTHOR, ALL_AUTHORS } from '../queries';

const BirthyearForm = ({ authorsQuery }) => {
    const [editAuthor] = useMutation(EDIT_AUTHOR, {
        refetchQueries: [{ query: ALL_AUTHORS }],
    });
    const [name, setName] = useState('');
    const [born, setBorn] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        console.log(name);

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
