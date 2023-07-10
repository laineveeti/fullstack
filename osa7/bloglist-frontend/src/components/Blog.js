import { useDispatch } from 'react-redux';
import { likeBlogAsync, removeBlogAsync } from '../reducers/blogReducer';
import { displayErrorNotification } from '../reducers/notificationReducer';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const Blog = ({ id }) => {
    const blog = useSelector(state => state.blogs.find(b => b.id === id));

    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);

    if(!blog) return <Navigate replace to='/' />;

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 2,
        marginBottom: 5,
    };


    const handleLike = async () => {
        try {
            dispatch(likeBlogAsync(blog.id));
        } catch (exception) {
            displayErrorNotification(dispatch, exception);
        }
    };

    const handleRemove = async () => {
        try {
            window.confirm(`Remove blog ${blog.title}?`) &&
                dispatch(removeBlogAsync(blog.id));
        } catch (exception) {
            displayErrorNotification(dispatch, exception);
        }
    };

    return (
        <div className='blog' style={blogStyle}>
            <h1>{blog.title} {blog.author}</h1>
            <a href={blog.url}>{blog.url}</a>
            <br></br>
            {blog.likes} likes
            <button onClick={handleLike}>like</button>
            <br></br>
            added by {blog.user.username}
            <br></br>
            {user && blog.user.id === user.id ? (
                <button onClick={handleRemove}>remove</button>
            ) : null}
        </div>
    );
};

export default Blog;
