const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const app = require('../../app');
const supertest = require('supertest');
const api = supertest(app);
const Blog = require('../../models/blog');
const User = require('../../models/user');
const { initialBlogs, initialUsers, blogsInDb, invalidId } = require('./test_helper');

const getToken = async () => {
    const token = (await api
        .post('/api/login')
        .send({ username: 'user1', password: 'salasana' }))
        .body.token;
    return token;
};

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

    const someUser = await User.findOne({ username: 'user1' });

    const savedBlogs = await Promise.all(initialBlogs.map(blog => {
        const newBlog = Blog(blog);
        newBlog.user = someUser._id;
        return newBlog.save();
    }));

    someUser.blogs = savedBlogs.map(blog => blog._id);
    await someUser.save();
});

describe('GET api/blogs', () => {
    test('returns blogs as JSON', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/);
    });

    test('returns correct amount of blogs', async () => {
        const response = await api.get('/api/blogs');
        expect(response.body).toHaveLength(initialBlogs.length);
    });

    test('returns blogs with id property named "id"', async () => {
        const response = await api.get('/api/blogs');
        expect(response.body[0].id).toBeDefined();
    });

    test('populates blogs with their users', async () => {
        const response = await api.get('/api/blogs');
        expect(response.body[0].user.id).toBeDefined();
    });
});

describe('POST api/blogs', () => {
    const newBlog = {
        title: 'uusiblogi',
        author: 'kirjoittaja',
        url: 'osoite',
        likes: 1
    };

    test('response has status 400 when title or url is missing', async () => {
        const token = await getToken();

        const blogWithMissingProps = { ... newBlog };
        delete blogWithMissingProps.title, blogWithMissingProps.url;

        await api
            .post('/api/blogs')
            .set('authorization', `Bearer ${token}`)
            .send(blogWithMissingProps)
            .expect(400);
    });

    test('increases blog count by one', async () => {
        const token = await getToken();

        await api
            .post('/api/blogs')
            .set('authorization', `Bearer ${token}`)
            .send(newBlog);
        const blogsAtEnd = await blogsInDb();
        expect(blogsAtEnd).toHaveLength(initialBlogs.length + 1);
    });

    test('saves blog with user property', async () => {
        const token = await getToken();
        const response = await api.post('/api/blogs').set('authorization', `Bearer ${token}`).send(newBlog);
        expect(response.body.user).toBeDefined();
    });

    test('gives property "likes" a default value of 0', async () => {
        const token = await getToken();
        const blogWith0Likes = { ... newBlog };
        delete blogWith0Likes.likes;
        const response = await api.post('/api/blogs').set('authorization', `Bearer ${token}`).send(blogWith0Likes);
        expect(response.body.likes).toBe(0);
    });
});

describe('DELETE api/blogs/id', () => {
    test('succesfully removes resource when given valid id and token', async () => {
        const token = await getToken();
        const toDelete = (await blogsInDb())[0].id;
        await api
            .delete(`/api/blogs/${toDelete}`)
            .set('authorization', `Bearer ${token}`);

        const blogsAtEnd = await blogsInDb();
        expect(blogsAtEnd).toHaveLength(initialBlogs.length - 1);
    });

    test('returns status code 204 on removal', async () => {
        const token = await getToken();
        const toDelete = (await blogsInDb())[0].id;
        await api
            .delete(`/api/blogs/${toDelete}`)
            .set('authorization', `Bearer ${token}`)
            .expect(204);
    });

    test('returns status code 404 on invalid id', async () => {
        const token = await getToken();
        const toDelete = await invalidId();
        await api
            .delete(`/api/blogs/${toDelete}`)
            .set('authorization', `Bearer ${token}`)
            .expect(404);
    });

    test('returns status code 401 on missing token', async () => {
        const toDelete = (await blogsInDb())[0].id;
        await api
            .delete(`/api/blogs/${toDelete}`)
            .expect(401);
    });

    test('returns status code 401 if user is not authorized to delete the blog', async () => {
        const wrongUserToken = (await api
            .post('/')
            .send({ username: 'user2', password: 'salasana' }))
            .body.token;
        const toDelete = (await blogsInDb())[0].id;
        await api
            .delete(`/api/blogs/${toDelete}`)
            .set('authorization', `Bearer ${wrongUserToken}`)
            .expect(401);
    });
});

describe('PUT api/blogs/id', () => {
    test('succesfully update likes when given valid id', async () => {
        const toUpdate = (await blogsInDb())[0].id;
        const response = await api
            .put(`/api/blogs/${toUpdate}`)
            .send({ likes: 10 });
        expect(response.body.likes).toBe(10);
    });

    test('returns 200 on succesfull update', async () => {
        const toUpdate = (await blogsInDb())[0].id;
        await api
            .put(`/api/blogs/${toUpdate}`)
            .send({ likes: 10 })
            .expect(200);
    });
});

afterAll(() => {
    mongoose.connection.close();
});