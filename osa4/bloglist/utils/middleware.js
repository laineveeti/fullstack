const config = require('../utils/config');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const errorHandler = (error, request, response, next) => {
    console.error(error);

    if(error.name === 'ValidationError') {
        response.status(400).send({ error: error.message });
    } else if (error.name === 'invalidIdError') {
        response.status(404).send({ error: error.message });
    } else if (error.name === 'JsonWebTokenError') {
        response.status(401).json({ error: 'missing token' });
    } else if (error.name === 'TokenExpiredError') {
        response.status(401).json({ error: 'expired token' });
    }

    next();
};

const tokenExtractor = async (request, response, next) => {
    const authorization = request.get('authorization');
    if(authorization && authorization.toLowerCase().startsWith('bearer ')) {
        request.token = authorization.substring(7);
    }

    next();
};

const userExtractor = async (request, response, next) => {
    const decodedToken = jwt.verify(request.token, config.SECRET);
    if(decodedToken.id) {
        const user = await User.findById(decodedToken.id);
        if(!user) {
            response.status(401).json({ error: 'invalid token' });
        }
        request.user = user;
    }

    next();
};

module.exports = { errorHandler, tokenExtractor, userExtractor };