import { useState } from 'react';

const CreateForm = ({ addBlog }) => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [url, setUrl] = useState('');

    const createBlog = (event) => {
        event.preventDefault();
        addBlog({ title: title, author: author, url: url });
        setTitle('');
        setAuthor('');
        setUrl('');
    };

    return (
        <form onSubmit={createBlog}>
            title:
            <input name='Title' value={title} type='text' id='title-input' required
                onChange={({ target }) => setTitle(target.value)}/>
            <br></br>
            author:
            <input name='Author' value={author} id='author-input' type='text'
                onChange={({ target }) => setAuthor(target.value)}/>
            <br></br>
            url:
            <input name='Url' value={url} id='url-input' type='text' required
                onChange={({ target }) => setUrl(target.value)}/>
            <br></br>
            <button type='submit'>create</button>
        </form>
    );
};

export default CreateForm;