const mongoose = require('mongoose');
const app = require('../../app');
const supertest = require('supertest');
const api = supertest(app);
const User = require('../../models/user');
const { initialUsers } = require('./test_helper');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('../../utils/config');

beforeEach(async () => {
    await User.deleteMany({});

    await Promise.all(initialUsers.map(async user => {
        user.password = await bcrypt.hash(user.password.plaintext, 10);
        const newUser = User(user);
        return newUser.save();
    }));
});

describe('POST /', () => {
    test('returns valid token when correct credentials are given', async () => {
        const response = await api.post('/').send({ username: 'user1', password: 'salasana' });
        expect(response.body.token).toBeDefined();
        expect(jwt.verify(response.body.token, config.SECRET).id).toBeDefined();
    });

    test('returns user information when correct credentials are given', async () => {
        const response = await api.post('/').send({ username: 'user1', password: 'salasana' });
        expect(response.body.username).toBe('user1');
    });

    test('responds with 401 when incorrect credentials are given', async () => {
        await api
            .post('/')
            .send({ username: 'user', password: 'salasana' })
            .expect(401);
    });
});

afterAll(() => {
    mongoose.connection.close();
});