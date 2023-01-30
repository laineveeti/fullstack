const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const { userExtractor } = require('../utils/middleware');

blogsRouter.get('', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 });
    response.json(blogs);
});

blogsRouter.get('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id);
    if(!blog) {
        const invalidIdError = new Error('blog with id does not exist!');
        invalidIdError.name = 'invalidIdError';
        throw invalidIdError;
    }
    response.json(blog);
});

blogsRouter.post('', userExtractor, async (request, response) => {
    const user = request.user;

    const body = request.body;
    body.likes = body.likes ? body.likes : 0;
    body.user = user._id;

    const blog = new Blog(body);
    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();
    response.status(201).json(savedBlog);
});

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
    const blog = await Blog.findById(request.params.id);

    if(!blog) {
        const invalidIdError = new Error('blog with id does not exist!');
        invalidIdError.name = 'invalidIdError';
        throw invalidIdError;
    }
    if(request.user._id.toString() !== blog.user.toString()) {
        return response.status(401).json({ error: 'user does not have access to this blog' });
    }

    await blog.delete();
    response.status(204).end();
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