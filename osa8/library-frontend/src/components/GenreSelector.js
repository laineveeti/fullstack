const GenreSelector = ({ genres, setGenre }) => {
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
