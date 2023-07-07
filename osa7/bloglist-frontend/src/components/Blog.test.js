import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import '@testing-library/dom';
import * as userEvent from '@testing-library/user-event';
import Blog from './Blog';

const testUser = {
    id: '63d186f57bfaacefea0c0e9e',
    username: 'testUser'
};

const testBlog = {
    id: '63d186f57bfaacefea0c0ea2',
    title: 'MaijanBlogi',
    author: 'Maija Meikäläinen',
    url: 'maijanblogi.fi',
    user: testUser,
    likes: 0
};

let mockHandler;

beforeEach(() => {
    mockHandler = jest.fn();
});

test('renders only title and author when contents hidden', () => {
    render(<Blog blog={testBlog} likeBlog={mockHandler} removeBlog={mockHandler} user={testUser}/>);

    const element = screen.queryByText('maijanblogi.fi');
    expect(element).toBeNull();
    screen.getByText('MaijanBlogi Maija Meikäläinen');
});

test('renders url, likes, and user when contents shown', async () => {
    render(<Blog blog={testBlog} likeBlog={mockHandler} removeBlog={mockHandler} user={testUser}/>);

    const mockUser = userEvent.default.setup();
    const button = screen.getByText('view');
    await mockUser.click(button);

    screen.getByText('maijanblogi.fi', { exact: false });
    screen.getByText('likes: 0', { exact: false });
    screen.getByText('testUser', { exact: false });
});

test('like function is called twice when clicked twice', async () => {
    render(<Blog blog={testBlog} likeBlog={mockHandler} removeBlog={mockHandler} user={testUser}/>);

    const mockUser = userEvent.default.setup();
    const button = screen.getByText('view');
    await mockUser.click(button);

    const likeButton = screen.getByText('like');
    await mockUser.click(likeButton);
    expect(mockHandler.mock.calls).toHaveLength(2);
});