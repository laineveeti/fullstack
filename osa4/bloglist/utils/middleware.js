const errorHandler = (error, request, response, next) => {
    console.error(error.message);

    if(error.name === 'ValidationError') {
        response.status(400).send({ error: error.message });
    } else if (error.name === 'invalidIdError') {
        response.status(404).send({ error: error.message });
    }

    next();
};

module.exports = { errorHandler };