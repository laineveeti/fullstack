const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const {
    ApolloServerPluginDrainHttpServer,
} = require('@apollo/server/plugin/drainHttpServer');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const express = require('express');
const cors = require('cors');
const http = require('http');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const User = require('./models/User');
const resolvers = require('./api/resolver');
const typeDefs = require('./schema');

require('dotenv').config();

mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('connected to MONGODB');
    })
    .catch((error) => {
        console.log('error connecting to mongoDB', error.message);
    });

const start = async () => {
    const app = express();
    const httpServer = http.createServer(app);

    const server = new ApolloServer({
        schema: makeExecutableSchema({ typeDefs, resolvers }),
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    });

    await server.start();

    app.use(
        '/',
        cors(),
        express.json(),
        expressMiddleware(server, {
            context: async ({ req }) => {
                const auth = req ? req.headers.authorization : null;
                if (auth && auth.startsWith('Bearer ')) {
                    const decodedToken = jwt.verify(
                        auth.substring(7),
                        process.env(SECRET)
                    );
                    console.log('user:' + decodedToken);
                    const currentUser = await User.findById(decodedToken.id);

                    return { currentUser };
                }
                return null;
            },
        })
    );

    const PORT = 4000;
    httpServer.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
};

start();
