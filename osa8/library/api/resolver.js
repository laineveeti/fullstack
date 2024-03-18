const Book = require('../models/Book');
const Query = require('./Query');
const Mutation = require('./Mutation');

module.exports = {
    Query,
    Mutation,
    Author: {
        bookCount: async (root) => Book.find({ author: root }).countDocuments(),
    },
};
