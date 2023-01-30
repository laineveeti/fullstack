import Toggleable from './Toggleable';

const Blog = ({ blog, likeBlog, removeBlog, user }) => {
    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    };

    return (
        <div style={blogStyle}>
            <div>
                {blog.title} {blog.author}
                <Toggleable showLabel='view' hideLabel='hide' key={blog.id}>
                    {blog.url}
                    <br></br>
                    likes {blog.likes}
                    <button onClick={likeBlog(blog.id)}>like</button>
                    <br></br>
                    {blog.user.username}
                    <br></br>
                    {blog.user.username === user.username
                        ? <button onClick={removeBlog(blog.id)}>remove</button>
                        : null
                    }
                </Toggleable>
            </div>
        </div>
    );};

export default Blog;