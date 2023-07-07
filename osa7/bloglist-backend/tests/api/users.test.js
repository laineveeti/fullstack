const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const app = require('../../app');
const supertest = require('supertest');
const api = supertest(app);
const Blog = require('../../models/blog');
const User = require('../../models/user');
const { initialBlogs, initialUsers, usersInDb } = require('./test_helper');

beforeEach(async () => {
    await Blog.deleteMany({});
    await User.deleteMany({});

    await Promise.all(initialUsers.map(async user => {
        const newUser = new User({
            username: user.username,
            name: user.name,
            password: await bcrypt.hash(user.password, 10)
        });
        return await newUser.save();
    }));

    const someUser = await User.findOne({});

    const savedBlogs = await Promise.all(initialBlogs.map(blog => {
        const newBlog = Blog(blog);
        newBlog.user = someUser._id;
        return newBlog.save();
    }));

    someUser.blogs = savedBlogs.map(blog => blog._id);
    await someUser.save();
});

describe('POST api/users', () => {
    test('responds with 400 when missing username', async () => {
        const newUser = {
            name: 'erkki',
            password: 'salasana'
        };
        await api
            .post('/api/users')
            .send(newUser)
            .expect(400);
    });

    test('responds with 400 when password is too short', async () => {
        const newUser = {
            name: 'erkki',
            username: 'esimerkki',
            password: 's'
        };
        await api
            .post('/api/users')
            .send(newUser)
            .expect(400);
    });

    test('responds with 400 when username already in use', async () => {
        const newUser = {
            name: 'erkki',
            username: 'esimerkki',
            password: 'salasana'
        };
        await api.post('/api/users').send(newUser);
        await api
            .post('/api/users')
            .send(newUser)
            .expect(400);
    });

    test('succesfully adds new user to db', async () => {
        const newUser = {
            name: 'erkki',
            username: 'esimerkki',
            password: 'salasana'
        };
        await api.post('/api/users').send(newUser);
        const usersAtEnd = await usersInDb();
        expect(usersAtEnd).toHaveLength(initialUsers.length + 1);
        expect(usersAtEnd.map(user => user.username)).toContain('esimerkki');
    });
});

describe('GET api/users', () => {
    test('returns users as JSON', async () => {
        await api
            .get('/api/users')
            .expect(200)
            .expect('Content-Type', /application\/json/);
    });

    test('returns correct amount of users', async () => {
        const response = await api.get('/api/users');
        expect(response.body).toHaveLength(initialUsers.length);
    });

    test('returns users with id property named "id"', async () => {
        const response = await api.get('/api/users');
        expect(response.body[0].id).toBeDefined();
    });

    test('populates users with their added blogs', async () => {
        const response = await api.get('/api/users');
        expect(response.body[0].blogs[0].id).toBeDefined();
    });
});



afterAll(() => {
    mongoose.connection.close();
});