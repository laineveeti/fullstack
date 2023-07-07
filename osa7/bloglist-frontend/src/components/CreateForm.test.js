import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { act, render, screen } from '@testing-library/react';
import '@testing-library/dom';
import * as userEvent from '@testing-library/user-event';
import CreateForm from './CreateForm';

const testBlog = {
    title: 'MaijanBlogi',
    author: 'Maija Meikäläinen',
    url: 'maijanblogi.fi'
};

let mockHandler;

beforeEach(() => {
    mockHandler = jest.fn();
});

test('addblog function is called with correct data when submit button is clicked', async () => {
    const { container } = render(<CreateForm addBlog={mockHandler}/>);

    const mockUser = userEvent.default.setup();
    await act(async () => {
        await mockUser.type(container.querySelector('#title-input'), testBlog.title);
    });
    await act(async () => {
        await mockUser.type(container.querySelector('#author-input'), testBlog.author);
    });
    await act(async () => {
        await mockUser.type(container.querySelector('#url-input'), testBlog.url);
    });
    const submitButton = screen.getByText('create');
    await act(async () => {
        await mockUser.click(submitButton);
    });

    expect(mockHandler.mock.calls[0][0]).toStrictEqual(testBlog);
});