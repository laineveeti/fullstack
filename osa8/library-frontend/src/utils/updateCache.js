export const updateBookCache = (cache, query, addedBook) => {
    const uniqueByName = (a) => {
        let seen = new Set();
        return a.filter((item) => {
            let k = item.title;
            return seen.has(k) ? false : seen.add(k);
        });
    };

    cache.updateQuery(query, ({ allBooks }) => {
        console.log(query);
        return {
            allBooks: uniqueByName(allBooks.concat(addedBook)),
        };
    });
};
