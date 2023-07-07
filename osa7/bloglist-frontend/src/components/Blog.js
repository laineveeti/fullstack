import { useDispatch } from 'react-redux';
import { likeBlogAsync, removeBlogAsync } from '../reducers/blogReducer';
import Toggleable from './Toggleable';
import { displayErrorNotification } from '../reducers/notificationReducer';
import { useSelector } from 'react-redux';

const Blog = ({ blog }) => {
    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 2,
        marginBottom: 5,
    };

    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);

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
            {blog.title} {blog.author}
            <Toggleable showLabel='view' hideLabel='hide' key={blog.id}>
                {blog.url}
                <br></br>
                likes: {blog.likes}
                <button onClick={handleLike}>like</button>
                <br></br>
                {blog.user.username}
                <br></br>
                {user && blog.user.id === user.id ? (
                    <button onClick={handleRemove}>remove</button>
                ) : null}
            </Toggleable>
        </div>
    );
};

export default Blog;
