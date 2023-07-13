import { useSelector } from 'react-redux';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import Button from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { Link } from 'react-router-dom';
import ContentList from './ContentList';

const BlogList = () => {
    const blogs = useSelector((state) => state.blogs);

    return (
        <ContentList
            header={
                <div>
                    blogs
                    <Button component={Link} to='/create'>
                        <AddBoxIcon />
                    </Button>
                </div>
            }
        >
            {[...blogs]
                .sort((a, b) => b.likes - a.likes)
                .map((blog) => (
                    <ListItem key={blog.id} disablePadding>
                        <ListItemButton
                            component={Link}
                            to={`/blogs/${blog.id}`}
                        >
                            <ListItemText primary={blog.title} />
                        </ListItemButton>
                    </ListItem>
                ))}
        </ContentList>
    );
};

export default BlogList;
