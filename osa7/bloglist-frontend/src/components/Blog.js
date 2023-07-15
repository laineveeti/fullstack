import { useDispatch } from 'react-redux';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

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

    const ExpandMore = styled((props) => {
        // eslint-disable-next-line no-unused-vars
        return <IconButton {...props} />;
    })(({ theme }) => ({
        transform: !expanded ? 'rotate(0deg)' : 'rotate(180deg)',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    }));

    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    if (!blog) return <Navigate replace to='/' />;

    return (
        <Card>
            <CardHeader title={blog.title} subheader={blog.author} />
            <CardContent>
                <Typography variant='body2' color='text.secondary'>
                    <a href={blog.url}>{blog.url}</a>
                    <br></br>
                    added by {blog.user.username}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                {blog.likes} likes
                <IconButton onClick={handleLike} aria-label='like'>
                    <FavoriteIcon />
                </IconButton>
                {user && blog.user.id === user.id ? (
                    <IconButton onClick={handleRemove}>
                        <DeleteIcon />
                    </IconButton>
                ) : null}
                comments
                <ExpandMore
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label='show comments'
                >
                    <ExpandMoreIcon />
                </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout='auto' unmountOnExit>
                <CardContent>
                    <CommentForm />
                    <ul>
                        {[...blog.comments].map((c, i) => (
                            <li key={`comment-${i}`}>{c}</li>
                        ))}
                    </ul>
                </CardContent>
            </Collapse>
        </Card>
    );
};

export default Blog;
