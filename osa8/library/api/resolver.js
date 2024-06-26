const Book = require('../models/Book');
const Author = require('../models/Author');
const Query = require('./Query');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { GraphQLError } = require('graphql');
const { PubSub } = require('graphql-subscriptions');
const pubsub = new PubSub();

const resolvers = {
    Query,
    Mutation: {
        addBook: async (
            root,
            { title, author, published, genres },
            { currentUser }
        ) => {
            if (!currentUser) {
                throw new GraphQLError('not authenticated', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                    },
                });
            }
            try {
                var authorObj = await Author.findOne({ name: author });
                if (!authorObj) {
                    const newAuthor = new Author({ name: author });
                    authorObj = await newAuthor.save();
                }
            } catch (error) {
                throw new GraphQLError('Saving author failed', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                        invalidArgs: author,
                        error: error,
                    },
                });
            }

            const newBook = new Book({
                title,
                author: authorObj,
                published,
                genres,
            });

            try {
                await newBook.save();
            } catch (error) {
                throw new GraphQLError('Saving book failed', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                        invalidArgs: title,
                        error: error,
                    },
                });
            }

            pubsub.publish('BOOK_ADDED', { bookAdded: newBook });

            return newBook;
        },
        editAuthor: async (root, { name, setBornTo }, { currentUser }) => {
            if (!currentUser) {
                throw new GraphQLError('not authenticated', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                    },
                });
            }
            const author = await Author.findOne({ name });
            if (!author) {
                return null;
            }
            author.born = setBornTo;
            return author.save();
        },
        createUser: async (root, { username, favoriteGenre }) => {
            const newUser = new User({ username, favoriteGenre });
            return await newUser.save();
        },
        login: async (root, { username, password }) => {
            const user = await User.findOne({ username });
            if (!user || password !== 'password') {
                throw new GraphQLError('wrong credentials');
            }
            const userForToken = {
                username: user.username,
                id: user._id,
            };
            return {
                value: jwt.sign(userForToken, process.env.SECRET),
            };
        },
    },
    Author: {
        bookCount: async (root) => Book.find({ author: root }).countDocuments(),
    },
    Subscription: {
        bookAdded: {
            subscribe: () => pubsub.asyncIterator('BOOK_ADDED'),
        },
    },
};

module.exports = resolvers;
