const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('', async (request, response) => {
    const blogs = await Blog.find({});
    response.json(blogs);
});

blogsRouter.post('', async (request, response) => {
    const blogObj = request.body;
    blogObj.likes = blogObj.likes ? blogObj.likes : 0;
    const blog = new Blog(blogObj);
    const savedBlog = await blog.save();
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