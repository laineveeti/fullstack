const GenreSelector = ({ books, setGenre }) => {
    const genres = books.reduce((acc, book) => {
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
            {genres.map((genre) => (
                <button onClick={() => setGenre(genre)}>{genre}</button>
            ))}
            <button onClick={() => setGenre('')}>all genres</button>
        </div>
    );
};

export default GenreSelector;
