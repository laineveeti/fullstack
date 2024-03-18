const { ApolloServer } = require('@apollo/server');
const mongoose = require('mongoose');
const { startStandaloneServer } = require('@apollo/server/standalone');
const User = require('./models/User');
const resolvers = require('./api/resolver');
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
