const Blog = require('../models/blog');

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

const blogsInDb = async () => {
    const blogs = await Blog.find({});
    return blogs.map(blog => blog.toJSON());
};

const invalidId = async () => {
    const toBeDeleted = Blog({ title: 'tobedeleted', url: 'url' });
    await toBeDeleted.save();
    await toBeDeleted.remove();
    return toBeDeleted._id.toString();
};

module.exports = { initialBlogs, blogsInDb, invalidId };