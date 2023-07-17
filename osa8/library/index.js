const { ApolloServer } = require('@apollo/server');
const mongoose = require('mongoose');
const { startStandaloneServer } = require('@apollo/server/standalone');
const Book = require('./models/Book');
const Author = require('./models/Author');
const User = require('./models/User');
const { GraphQLError } = require('graphql');
const jwt = require('jsonwebtoken');
require('dotenv').config();

mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('connected to MONGODB');
    })
    .catch((error) => {
        console.log('error connecting to mongoDB', error.message);
    });

const typeDefs = `
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addBook(title: String!, author: String!, published: Int!, genres: [String!]!): Book!
    editAuthor(name: String!, setBornTo: Int!): Author
    createUser(
        username: String!
        favoriteGenre: String!
    ): User
        login(
        username: String!
        password: String!
    ): Token
  }

  type Author {
    name: String!
    born: Int
    id: ID!
    bookCount: Int!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }
`;

const resolvers = {
    Query: {
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
    },
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
                        error,
                    },
                });
            }
            try {
                const newBook = new Book({
                    title,
                    author: authorObj,
                    published,
                    genres,
                });
                return await newBook.save();
            } catch (error) {
                throw new GraphQLError('Saving book failed', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                        invalidArgs: title,
                        error,
                    },
                });
            }
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
                value: `Bearer ${jwt.sign(userForToken, process.env.SECRET)}`,
            };
        },
    },
    Author: {
        bookCount: async (root) => Book.find({ author: root }).countDocuments(),
    },
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async ({ req, res }) => {
        const auth = req ? req.headers.authorization : null;
        if (auth && auth.startsWith('Bearer ')) {
            const decodedToken = jwt.verify(
                auth.substring(7),
                process.env.SECRET
            );
            const currentUser = await User.findById(decodedToken.id);
            return { currentUser };
        }
    },
}).then(({ url }) => {
    console.log(`Server ready at ${url}`);
});
