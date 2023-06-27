const bcrypt = require('bcrypt');
const loginRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const config = require('../utils/config');

loginRouter.post('', async (request, response) => {
    const { username, password } = request.body;
    const user = await User.findOne({ username: username });

    const correctCreds = user
        ? await bcrypt.compare(password, user.password)
        : false;
    if(!correctCreds) {
        return response.status(401).json({ error: 'invalid username or password' });
    }

    const tokenData = {
        username: user.username,
        id: user._id
    };
    const token = jwt.sign(tokenData, config.SECRET, { expiresIn: 60*60 });

    response.status(200).send({ token, username: user.username, name: user.name, id: user._id });
});

module.exports = loginRouter;