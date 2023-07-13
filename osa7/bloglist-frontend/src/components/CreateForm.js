import { createBlog } from '../reducers/blogReducer';
import {
    displayNotification,
    displayErrorNotification,
} from '../reducers/notificationReducer';
import { useDispatch } from 'react-redux';
import { useField } from '../hooks/index';
import { Navigate } from 'react-router-dom';
import { useState } from 'react';

const CreateForm = () => {
    const { reset: titleReset, ...title } = useField('text');
    const { reset: authorReset, ...author } = useField('text');
    const { reset: urlReset, ...url } = useField('text');
    const [created, setCreated] = useState(null);

    const dispatch = useDispatch();

    if (created) return <Navigate to={`/blogs/${created.id}`} replace />;

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const newBlog = await dispatch(
                createBlog({
                    title: title.value,
                    author: author.value,
                    url: url.value,
                })
            );
            displayNotification(
                dispatch,
                `a new blog ${newBlog.title} by ${newBlog.author} added`,
                'green'
            );
            setCreated(newBlog);
        } catch (exception) {
            displayErrorNotification(dispatch, exception);
        }
        [titleReset, authorReset, urlReset].forEach((fun) => fun());
    };

    return (
        <form onSubmit={handleSubmit}>
            title:
            <input required id='title-input' {...title} />
            <br></br>
            author:
            <input required id='author-input' {...author} />
            <br></br>
            url:
            <input required id='url-input' {...url} />
            <br></br>
            <button type='submit'>create</button>
        </form>
    );
};

export default CreateForm;
