const Books = ({ books }) => {
    return (
        <table>
            <tbody>
                <tr>
                    <th></th>
                    <th>author</th>
                    <th>published</th>
                </tr>
                {[...books].map((b) => (
                    <tr key={b.id}>
                        <td key={b.id + '_title'}>{b.title}</td>
                        <td key={b.id + '_author'}>{b.author.name}</td>
                        <td key={b.id + '_publish'}>{b.published}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default Books;
