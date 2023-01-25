const blogsRouter = require('express').Router();
const config = require('../utils/config');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Blog = require('../models/blog');

blogsRouter.get('', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 });
    response.json(blogs);
});

blogsRouter.post('', async (request, response) => {
    const decodedToken = jwt.verify(request.token, config.SECRET);
    if(!decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' });
    }
    const user = await User.findById(decodedToken.id);

    const body = request.body;
    body.likes = body.likes ? body.likes : 0;
    body.user = user._id;

    const blog = new Blog(body);
    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();
    response.status(201).json(savedBlog);
});

blogsRouter.delete('/:id', async (request, response) => {
    const result = await Blog.findByIdAndDelete(request.params.id);
    if (result) {
        response.status(204).end();
    } else {
        const invalidIdError = new Error('blog with id does not exist!');
        invalidIdError.name = 'invalidIdError';
        throw invalidIdError;
    }
});

blogsRouter.put('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id);
    if(!blog) {
        const invalidIdError = new Error('blog with id does not exist!');
        invalidIdError.name = 'invalidIdError';
        throw invalidIdError;
    }
    const updatedBlog = await Blog.findByIdAndUpdate(
        request.params.id,
        { ...request.body },
        { new: true, runValidators: true, context: 'query' }
    );
    response.json(updatedBlog);
});

module.exports = blogsRouter;