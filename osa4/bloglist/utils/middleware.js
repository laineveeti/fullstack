const config = require('./config');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const errorHandler = (error, request, response, next) => {
    console.error(error);

    if(error.name === 'ValidationError') {
        response.status(400).send({ error: error.message });
    } else if (error.name === 'invalidIdError') {
        response.status(404).send({ error: error.message });
    } else if (error.name === 'JsonWebTokenError') {
        response.status(401).json({ error: 'invalid token' });
    } else if (error.name === 'TokenExpiredError') {
        response.status(401).json({ error: 'expired token' });
    }

    next();
};

const getToken = (request) => {
    const authorization = request.get('authorization');
    if(authorization && authorization.toLowerCase().startsWith('bearer ')) {
        return authorization.substring(7);
    }
    return null;
};

const authorize = async (request, response, next) => {
    const token = getToken(request);
    if(token) {
        const decodedToken = jwt.verify(token, config.SECRET);
        if(decodedToken.id) {
            const user = await User.findById(decodedToken.id);
            request.authorization = user;
        }
    }

    next();
};

module.exports = { errorHandler, authorize };