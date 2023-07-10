import { useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import { initializeBlogs } from './reducers/blogReducer';
import { initializeUsers } from './reducers/usersReducer';
import { useDispatch, useSelector } from 'react-redux';
import { logout, checkLoggedIn } from './reducers/userReducer';
import BlogList from './components/BlogList';
import UsersList from './components/UsersList';
import { Container } from '@mui/material';

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(initializeBlogs());
    }, []);

    useEffect(() => {
        dispatch(initializeUsers());
    }, []);

    useEffect(() => {
        dispatch(checkLoggedIn());
    }, []);

    const user = useSelector((state) => state.user);

    return (
        <Container>
            {user ? (
                <div>
                    {user.username} logged in
                    <button onClick={() => dispatch(logout)}>logout</button>
                </div>
            ) : (
                <Link to='/login'>login</Link>
            )}
            <Notification />
            <Routes>
                <Route path='/login' element={<LoginForm />} />
                <Route path='/blogs' element={<BlogList />} />
                <Route path='/users' element={<UsersList />} />
                <Route path='/' element={<BlogList />} />
            </Routes>
        </Container>
    );
};

export default App;
