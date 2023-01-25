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

const tokenExtractor = async (request, response, next) => {
    const authorization = request.get('authorization');
    if(authorization && authorization.toLowerCase().startsWith('bearer ')) {
        request.token = authorization.substring(7);
    }

    next();
};

module.exports = { errorHandler, tokenExtractor };