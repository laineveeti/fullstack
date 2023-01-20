const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: String,
    password: String
});

const User = mongoose.model('User', userSchema);

module.exports = User;