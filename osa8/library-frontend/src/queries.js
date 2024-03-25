import { gql } from '@apollo/client';

export const ALL_BOOKS = gql`
    query {
        allBooks {
            title
            author {
                name
            }
            published
            genres
            id
        }
    }
`;

export const GENRE_BOOKS = gql`
    query AllBooks($genre: String!) {
        allBooks(genre: $genre) {
            title
            author {
                name
            }
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
            author {
                name
            }
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
