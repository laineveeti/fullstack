const Book = require('../models/Book');
const Author = require('../models/Author');

module.exports = {
    authorCount: async () => Author.collection.countDocuments(),
    bookCount: async () => Book.collection.countDocuments(),
    allBooks: async (root, args) => {
        const genreQuery = args.genre
            ? { genres: { $in: [args.genre] } }
            : null;
        const authorQuery = args.author
            ? { author: await Author.find({ name: args.author }) }
            : null;
        var query = {};
        if (args.author) {
            if (args.genre) {
                query = { $and: [authorQuery, genreQuery] };
            } else {
                query = authorQuery;
            }
        } else if (args.genre) {
            query = genreQuery;
        }
        return await Book.find(query).populate('author');
    },
    allAuthors: async () => Author.find({}),
    me: async (root, args, context) => context.currentUser,
};
