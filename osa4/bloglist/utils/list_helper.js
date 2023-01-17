const totalLikes = (blogs) => blogs.reduce((acc, current) => acc + current.likes, 0);

const favoriteBlog = (blogs) => (
    blogs.length === 0
        ? undefined
        : blogs.reduce((acc, current) => current.likes > acc.likes ? current : acc, { likes : 0 })
);

const mostBlogs = (blogs) => {
    const authors = blogs.reduce((list, blog) => {
        const alreadyFound = list.find(item => item.author === blog.author);
        if (alreadyFound) {
            alreadyFound.blogs++;
            return list;
        } else {
            return list.concat({ author: blog.author, blogs: 1 });
        }
    }, []);
    return authors.length === 0
        ? undefined
        : authors.reduce((acc, current) => current.blogs > acc.blogs ? current : acc, { blogs : 0 });
};

const mostLikes = (blogs) => {
    const authors = blogs.reduce((list, blog) => {
        const alreadyFound = list.find(item => item.author === blog.author);
        if (alreadyFound) {
            alreadyFound.likes += blog.likes;
            return list;
        } else {
            return list.concat({ author: blog.author, likes: blog.likes });
        }
    }, []);
    return authors.length === 0
        ? undefined
        : authors.reduce((acc, current) => current.likes > acc.likes ? current : acc, { likes : 0 });
};

module.exports = { totalLikes, favoriteBlog, mostBlogs, mostLikes };