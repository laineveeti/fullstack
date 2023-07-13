import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ContentList from './ContentList';
import { Stack } from '@mui/material';

const UsersList = () => {
    const users = useSelector((state) => state.users);

    return (
        <ContentList header='users'>
            {[...users].map((user) => (
                <ListItem key={user.id} disablePadding>
                    <ListItemButton
                        component={Link}
                        to={`/users/${user.id}`}
                        style={{ display: 'flex' }}
                    >
                        <Stack direction='row' justifyContent='space-between'>
                            <ListItemText primary={user.name} />
                            <ListItemText
                                secondary={user.blogs.length + ' blogs'}
                            />
                        </Stack>
                    </ListItemButton>
                </ListItem>
            ))}
        </ContentList>
    );
};

export default UsersList;
