import { gql } from '@apollo/client';

const BOOK_DETAILS = gql`
    fragment BookDetails on Book {
        title
        author {
            name
        }
        published
        genres
        id
    }
`;

export const ALL_BOOKS = gql`
    query {
        allBooks {
            ...BookDetails
        }
    }
    ${BOOK_DETAILS}
`;

export const GENRE_BOOKS = gql`
    query AllBooks($genre: String!) {
        allBooks(genre: $genre) {
            ...BookDetails
        }
    }
    ${BOOK_DETAILS}
`;

export const ALL_AUTHORS = gql`
    query {
        allAuthors {
            name
            born
            id
            bookCount
        }
    }
`;

export const ADD_BOOK = gql`
    mutation (
        $title: String!
        $author: String!
        $published: Int!
        $genres: [String!]!
    ) {
        addBook(
            title: $title
            author: $author
            published: $published
            genres: $genres
        ) {
            ...BookDetails
        }
    }
    ${BOOK_DETAILS}
`;

export const EDIT_AUTHOR = gql`
    mutation ($name: String!, $born: Int!) {
        editAuthor(setBornTo: $born, name: $name) {
            name
            id
            born
        }
    }
`;

export const LOGIN = gql`
    mutation ($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            value
        }
    }
`;

export const CURRENT_USER = gql`
    query {
        me {
            username
            favoriteGenre
        }
    }
`;

export const BOOK_ADDED = gql`
    subscription {
        bookAdded {
            ...BookDetails
        }
    }
    ${BOOK_DETAILS}
`;
