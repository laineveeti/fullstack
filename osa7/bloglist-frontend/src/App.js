import { useEffect } from 'react';
import { Routes, Route, Link, useMatch } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import { initializeBlogs } from './reducers/blogReducer';
import { initializeUsers } from './reducers/usersReducer';
import { useDispatch, useSelector } from 'react-redux';
import { logout, checkLoggedIn } from './reducers/userReducer';
import BlogList from './components/BlogList';
import UsersList from './components/UsersList';
import User from './components/User';
import Blog from './components/Blog';
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
    const matchUser = useMatch('/users/:id');
    const matchBlog = useMatch('/blogs/:id');

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
                <Route path='/' element={<BlogList />} />
                <Route path='/login' element={<LoginForm />} />
                <Route path='/blogs' element={<BlogList />} />
                <Route path='/users' element={<UsersList />} />
                {matchBlog ? <Route path='/blogs/:id' element={<Blog id={matchBlog.params.id}/>} /> : null}
                {matchUser ? <Route path='/users/:id' element={<User id={matchUser.params.id}/>} /> : null}
            </Routes>
        </Container>
    );
};

export default App;
