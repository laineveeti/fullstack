const { totalLikes, favoriteBlog, mostBlogs, mostLikes } = require('../../utils/list_helper');

const blog1 = { title: 't', author: 'author', url: 'url', likes: 5 };
const blog2 = { title: 't', author: 'author', url: 'url', likes: 10 };
const blog3 = { title: 't', author: 'author2', url: 'url', likes: 10 };
const blog4 = { title: 't', author: 'author2', url: 'url', likes: 3 };
const blog5 = { title: 't', author: 'author3', url: 'url', likes: 15 };

describe('total likes', () => {

    test('of empty list is zero', () => {
        expect(totalLikes([])).toBe(0);
    });

    test('when list has only one blog equals the likes of that', () => {
        expect(totalLikes([blog1])).toBe(5);
    });

    test('of a bigger list is calculated right', () => {
        expect(totalLikes([blog1, blog2])).toBe(15);
    });
});

describe('favorite blog', () => {

    test('is undefined when list is empty', () => {
        expect(favoriteBlog([])).toBe(undefined);
    });

    test('when list has only one blog is that blog', () => {
        expect(favoriteBlog([blog1])).toEqual(blog1);
    });

    test('is any of the blogs with the most likes when multiple blogs are favorites', () => {
        const blogList = [blog1, blog2, blog3];
        expect([blog2, blog3]).toContain(favoriteBlog(blogList));
    });
});

describe('most blogs', () => {
    test('author is undefined when list is empty', () => {
        expect(mostBlogs([])).toBe(undefined);
    });

    test('when list has only one blog, author with most blogs is the author of that blog', () => {
        expect(mostBlogs([blog1]).author).toEqual(blog1.author);
    });

    test('author is correct when the authors have different amount of blogs', () => {
        expect(mostBlogs([blog1, blog2, blog3]).author).toEqual(blog1.author);
    });

    test('author is any of the authors who have the greatest amount of blogs', () => {
        const blogList = [blog1, blog2, blog3, blog4, blog5];
        const validAuthorList = [blog1, blog3].map(blog => blog.author);
        expect(validAuthorList).toContain(mostBlogs(blogList).author);
    });
});


describe('most likes', () => {
    test('author is undefined when list is empty', () => {
        expect(mostLikes([])).toBe(undefined);
    });

    test('when list has only one blog, author with most likes is the author of that blog', () => {
        expect(mostLikes([blog1]).author).toEqual(blog1.author);
    });

    test('author is correct when the authors have different amount of likes', () => {
        expect(mostLikes([blog3, blog4, blog5]).author).toEqual(blog5.author);
    });

    test('author is any of the authors who have the greatest amount of blogs', () => {
        const blogList = [blog1, blog2, blog4, blog5];
        const validAuthorList = [blog1, blog5].map(blog => blog.author);
        expect(validAuthorList).toContain(mostLikes(blogList).author);
    });
});