const Book = require('../models/Book');
const Author = require('../models/Author');
const mongoose = require('mongoose');
require('dotenv').config();

let authors = [
    {
        name: 'Robert Martin',
        born: 1952,
    },
    {
        name: 'Martin Fowler',
        born: 1963,
    },
    {
        name: 'Fyodor Dostoevsky',
        born: 1821,
    },
    {
        name: 'Joshua Kerievsky', // birthyear not known
    },
    {
        name: 'Sandi Metz', // birthyear not known
    },
];

let books = [
    {
        title: 'Clean Code',
        published: 2008,
        author: 'Robert Martin',
        genres: ['refactoring'],
    },
    {
        title: 'Agile software development',
        published: 2002,
        author: 'Robert Martin',
        genres: ['agile', 'patterns', 'design'],
    },
    {
        title: 'Refactoring, edition 2',
        published: 2018,
        author: 'Martin Fowler',
        genres: ['refactoring'],
    },
    {
        title: 'Refactoring to patterns',
        published: 2008,
        author: 'Joshua Kerievsky',
        genres: ['refactoring', 'patterns'],
    },
    {
        title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
        published: 2012,
        author: 'Sandi Metz',
        genres: ['refactoring', 'design'],
    },
    {
        title: 'Crime and punishment',
        published: 1866,
        author: 'Fyodor Dostoevsky',
        genres: ['classic', 'crime'],
    },
    {
        title: 'The Demon ',
        published: 1872,
        author: 'Fyodor Dostoevsky',
        genres: ['classic', 'revolution'],
    },
];

const resetDb = async () => {
    await Book.deleteMany({});
    await Author.deleteMany({});
    await Promise.all(
        authors.map(async (author) => {
            const newAuthor = new Author({ ...author });
            await newAuthor.save();
        })
    );
    await Promise.all(
        books.map(async (book) => {
            const author = await Author.findOne({ name: book.author });
            const newBook = new Book({ ...book, author: author });
            await newBook.save();
        })
    );
};

mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('connected to MONGODB');
    })
    .then(() => {
        resetDb();
        console.log('database reset');
    })
    .catch((error) => {
        console.log('error connecting to mongoDB', error.message);
    });
