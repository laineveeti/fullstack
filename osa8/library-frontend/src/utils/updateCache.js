export const updateBookCache = (cache, query, addedBook) => {
    const uniqueByName = (a) => {
        let seen = new Set();
        return a.filter((item) => {
            let k = item.title;
            return seen.has(k) ? false : seen.add(k);
        });
    };

    const readData = cache.readQuery(query);
    if (readData) {
        cache.writeQuery({
            ...query,
            data: {
                allBooks: uniqueByName(readData.allBooks.concat(addedBook)),
            },
        });
    }
};
