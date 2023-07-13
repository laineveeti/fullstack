import { useDispatch } from 'react-redux';
import {
    likeBlogAsync,
    removeBlogAsync,
    addCommentAsync,
} from '../reducers/blogReducer';
import { displayErrorNotification } from '../reducers/notificationReducer';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { useField } from '../hooks';
import { Button, Input } from '@mui/material';

const Blog = ({ id }) => {
    const blog = useSelector((state) => state.blogs.find((b) => b.id === id));

    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);

    if (!blog) return <Navigate replace to='/' />;

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

    const CommentForm = () => {
        // eslint-disable-next-line no-unused-vars
        const { reset, ...comment } = useField('text');

        const handleComment = async (event) => {
            event.preventDefault();
            try {
                dispatch(addCommentAsync(blog.id, comment.value));
            } catch (exception) {
                displayErrorNotification(dispatch, exception);
            }
        };

        return (
            <form onSubmit={handleComment}>
                <Input {...comment}></Input>
                <Button type='submit'>add comment</Button>
            </form>
        );
    };

    return (
        <div className='blog' style={blogStyle}>
            <h1>
                {blog.title} {blog.author}
            </h1>
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
            <h2>comments</h2>
            <CommentForm />
            <ul>
                {[...blog.comments].map((c, i) => (
                    <li key={`comment-${i}`}>{c}</li>
                ))}
            </ul>
        </div>
    );
};

export default Blog;
