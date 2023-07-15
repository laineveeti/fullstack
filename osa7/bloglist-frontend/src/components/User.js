import { useSelector } from 'react-redux';
import { Card, CardHeader, CardContent, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const User = ({ id }) => {
    const user = useSelector(state => state.users.find(u => u.id === id));

    return <Card>
        <CardHeader title={user.name} subheader={user.username}/>
        <CardContent>
            <Typography variant='body2' color='text.secondary'>
                <h3>added blogs</h3>
                <ul>
                    {[...user.blogs].map(blog => {
                        return <li key={blog.id}>
                            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                        </li>;
                    })}
                </ul>
            </Typography>
        </CardContent>
    </Card>;
};

export default User;