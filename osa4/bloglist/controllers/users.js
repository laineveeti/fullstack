const usersRouter = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');

usersRouter.get('', async (request, response) => {
    const users = await User.find({}).populate('blogs');
    response.json(users);
});

usersRouter.post('', async (request, response) => {
    const { username, name, password } = request.body;

    if((await User.find({ username: username })).length !== 0) {
        return response.status(400).send({ error: 'username already exists' });
    }

    if(!password || password.length < 3) {
        return response.status(400).send({ error: 'password must be at least 3 characters long' });
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = new User({ username: username, name: name, password: passwordHash });
    const savedUser = await user.save();
    response.status(201).json(savedUser);
});

module.exports = usersRouter;