import { gql } from '@apollo/client';

export const ALL_BOOKS = gql`
    query {
        allBooks {
            title
            author
            published
            genres
            id
        }
    }
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
            title
            author
            published
            genres
            id
        }
    }
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
