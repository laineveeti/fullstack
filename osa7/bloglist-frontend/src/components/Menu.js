import * as React from 'react';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
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
        <React.Fragment>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    textAlign: 'center',
                }}
            >
                <Button sx={{ minWidth: 100 }} component={Link} to='/blogs'>
                    blogs
                </Button>
                <Button sx={{ minWidth: 100 }} component={Link} to='/users'>
                    users
                </Button>
                {user ? (
                    <div>
                        {user.name} signed in
                        <Button onClick={handleLogout}>sign out</Button>
                    </div>
                ) : (
                    <Button component={Link} to='/login'>
                        sign in
                    </Button>
                )}
            </Box>
        </React.Fragment>
    );
};

export default Menu;
