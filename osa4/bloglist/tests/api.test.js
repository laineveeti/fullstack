const mongoose = require('mongoose');
const app = require('../app');
const supertest = require('supertest');
const api = supertest(app);
const Blog = require('../models/blog');
const { initialBlogs, blogsInDb, invalidId } = require('./test_helper');

beforeEach(async () => {
    await Blog.deleteMany({});

    await Promise.all(initialBlogs.map(blog => {
        const newBlog = Blog(blog);
        return newBlog.save();
    }));
    console.log('initialized blogs');
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
});

describe('POST api/blogs', () => {
    const newBlog = {
        title: 'uusiblogi',
        author: 'kirjoittaja',
        url: 'osoite',
        likes: 1
    };

    test('response has status 400 when title or url is missing', async () => {
        const blogWithMissingProps = { ... newBlog };
        delete blogWithMissingProps.title, blogWithMissingProps.url;

        await api
            .post('/api/blogs')
            .send(blogWithMissingProps)
            .expect(400);
    });

    test('increases blog count by one', async () => {
        await api.post('/api/blogs').send(newBlog);
        const blogsAtEnd = await blogsInDb();
        expect(blogsAtEnd).toHaveLength(initialBlogs.length + 1);
    });

    test('saves blog with correct properties', async () => {
        const response = await api.post('/api/blogs').send(newBlog);
        delete response.body.id;
        expect(response.body).toEqual(newBlog);
    });

    test('gives property "likes" a default value of 0', async () => {
        const blogWith0Likes = { ... newBlog };
        delete blogWith0Likes.likes;
        const response = await api.post('/api/blogs').send(blogWith0Likes);
        expect(response.body.likes).toBe(0);
    });
});

describe('DELETE api/blogs/id', () => {
    test('succesfully removes resource when given valid id', async () => {
        const toDelete = (await blogsInDb())[0].id;
        await api.delete(`/api/blogs/${toDelete}`);
        const blogsAtEnd = await blogsInDb();
        expect(blogsAtEnd).toHaveLength(initialBlogs.length - 1);
    });

    test('returns status code 204 on removal', async () => {
        const toDelete = (await blogsInDb())[0].id;
        await api
            .delete(`/api/blogs/${toDelete}`)
            .expect(204);
    });

    test('returns status code 404 on invalid id', async () => {
        const toDelete = await invalidId();
        await api
            .delete(`/api/blogs/${toDelete}`)
            .expect(404);
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