import Toggleable from './Toggleable';

const Blog = ({ blog, likeBlog, removeBlog, user }) => {
    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 2,
        marginBottom: 5
    };


    return (
        <div className='blog' style={blogStyle}>
            {blog.title} {blog.author}
            <Toggleable showLabel='view' hideLabel='hide' key={blog.id}>
                {blog.url}
                <br></br>
                likes: {blog.likes}
                <button onClick={likeBlog(blog.id)}>like</button>
                <br></br>
                {blog.user.username}
                <br></br>
                {blog.user.id === user.id
                    ? <button onClick={removeBlog(blog.id)}>remove</button>
                    : null
                }
            </Toggleable>
        </div>
    );};

export default Blog;