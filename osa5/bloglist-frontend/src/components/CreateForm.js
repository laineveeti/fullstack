const CreateForm = ({ create, title, setTitle, author, setAuthor, url, setUrl }) => (
    <form onSubmit={create}>
        title:
        <input name='Title' value={title} type='text' required
            onChange={({ target }) => setTitle(target.value)}/>
        <br></br>
        author:
        <input name='Author' value={author} type='text'
            onChange={({ target }) => setAuthor(target.value)}/>
        <br></br>
        url:
        <input name='Url' value={url} type='text' required
            onChange={({ target }) => setUrl(target.value)}/>
        <br></br>
        <button type='submit'>create</button>
    </form>
);

export default CreateForm;