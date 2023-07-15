import * as React from 'react';
import { Button, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../reducers/userReducer';

const Menu = () => {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const handleLogout = async () => {
        dispatch(logoutUser());
    };

    return (
        <Stack
            direction='row'
            sx={{
                display: 'flex',
                justifyContent: 'space-between'
            }}
        >
            <Stack
                direction='row'
            >
                <Button sx={{ minWidth: 100 }} component={Link} to='/blogs'>
                    blogs
                </Button>
                <Button sx={{ minWidth: 100 }} component={Link} to='/users'>
                    users
                </Button>
            </Stack>
            {user ? (
                <Stack direction='row'>
                    <Typography>{user.name} signed in</Typography>
                    <Button onClick={handleLogout}>sign out</Button>
                </Stack>
            ) : (
                <Button component={Link} to='/login'>
                    sign in
                </Button>
            )}
        </Stack>
    );
};

export default Menu;
