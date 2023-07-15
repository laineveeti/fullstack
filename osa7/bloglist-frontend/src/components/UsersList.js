import { Link, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ContentList from './ContentList';
import { Grid, Stack, Typography } from '@mui/material';

const UsersList = () => {
    const users = useSelector((state) => state.users);

    return (
        <Grid container spacing={3}>
            <Grid item xs={4}>
                <ContentList header='users'>
                    {[...users].map((user) => (
                        <ListItem key={user.id} disablePadding>
                            <ListItemButton
                                component={Link}
                                to={`/users/${user.id}`}
                                style={{ display: 'flex' }}
                            >
                                <Stack direction='row' justifyContent='space-between' spacing={3} style={{ width: '100%' }}>
                                    <Typography>{user.name}</Typography>
                                    <Typography>{user.blogs.length} blogs</Typography>
                                </Stack>
                            </ListItemButton>
                        </ListItem>
                    ))}
                </ContentList>
            </Grid>
            <Grid item xs>
                <Outlet />
            </Grid>
        </Grid>
    );
};

export default UsersList;
