import { useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import { initializeBlogs } from './reducers/blogReducer';
import { useDispatch, useSelector } from 'react-redux';
import { logout, checkLoggedIn } from './reducers/userReducer';
import BlogList from './components/BlogList';
import { Container } from '@mui/material';

const App = () => {
    const user = useSelector((state) => state.user);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(initializeBlogs());
    }, [dispatch]);

    useEffect(() => {
        dispatch(checkLoggedIn());
    }, [dispatch]);

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
                <Route path='/' element={<BlogList />} />
            </Routes>
        </Container>
    );
};

export default App;
