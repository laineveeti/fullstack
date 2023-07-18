const Books = ({ booksQuery, genre }) => {
    if (booksQuery.loading) return <div>loading...</div>;

    const books = booksQuery.data.allBooks;

    return (
        <div>
            <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th>author</th>
                        <th>published</th>
                    </tr>
                    {[...books]
                        .filter((b) =>
                            genre ? b.genres.includes(genre) : true
                        )
                        .map((b) => (
                            <tr key={b.title}>
                                <td>{b.title}</td>
                                <td>{b.author.name}</td>
                                <td>{b.published}</td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
};

export default Books;
