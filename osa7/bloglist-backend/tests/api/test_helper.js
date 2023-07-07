const Blog = require('../../models/blog');
const User = require('../../models/user');

const initialBlogs = [
    {
        title: 'ErkinBlogi',
        author: 'Erkki Esimerkki',
        url: 'http://google.com',
        likes: 5
    },
    {
        title: 'MaijanBlogi',
        author: 'Maija Meikäläinen',
        url: 'http://localhost:8080',
        likes: 3
    }
];

const initialUsers = [
    {
        username: 'user1',
        name: 'käyttäjä',
        password: 'salasana'
    },
    {
        username: 'user2',
        name: 'käyttäjä toinen',
        password: 'salasana'
    },
];


const blogsInDb = async () => {
    const blogs = await Blog.find({});
    return blogs.map(blog => blog.toJSON());
};

const usersInDb = async () => {
    const users = await User.find({});
    return users.map(user => user.toJSON());
};

const invalidId = async () => {
    const toBeDeleted = Blog({ title: 'tobedeleted', url: 'url' });
    await toBeDeleted.save();
    await toBeDeleted.remove();
    return toBeDeleted._id.toString();
};

module.exports = { initialBlogs, initialUsers, blogsInDb, usersInDb, invalidId };