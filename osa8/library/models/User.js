const { Schema, model } = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const schema = new Schema({
    username: {
        type: String,
        required: true,
    },
    favoriteGenre: {
        type: String,
        required: true,
    },
});

schema.plugin(uniqueValidator);

module.exports = model('User', schema);
