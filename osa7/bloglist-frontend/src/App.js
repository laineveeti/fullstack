import { useEffect } from 'react';
import { Routes, Route, useMatch } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import { initializeBlogs } from './reducers/blogReducer';
import { initializeUsers } from './reducers/usersReducer';
import { useDispatch, useSelector } from 'react-redux';
import { checkLoggedIn, checkTokenExpiration } from './reducers/userReducer';
import BlogList from './components/BlogList';
import UsersList from './components/UsersList';
import User from './components/User';
import Blog from './components/Blog';
import Menu from './components/Menu';
import CreateForm from './components/CreateForm';
import { Container } from '@mui/material';

const App = () => {
    const dispatch = useDispatch();

    const user = useSelector(state => state.user);

    useEffect(() => {
        dispatch(initializeBlogs());
    }, []);

    useEffect(() => {
        dispatch(initializeUsers());
    }, []);

    useEffect(() => {
        dispatch(checkLoggedIn());
    }, []);

    useEffect(() => {
        if(user) {
            dispatch(checkTokenExpiration(user));
        }
    });

    const matchUser = useMatch('/users/:id');
    const matchBlog = useMatch('/blogs/:id');

    return (
        <Container maxWidth='md'>
            <Menu />
            <Notification />
            <Routes>
                <Route path='/' element={<BlogList />} />
                <Route path='/login' element={<LoginForm />} />
                <Route path='/blogs' element={<BlogList />}>
                    <Route path='create' element={<CreateForm />} />
                    {matchBlog ? (
                        <Route
                            path=':id'
                            element={<Blog id={matchBlog.params.id} />}
                        />
                    ) : null}
                </Route>
                <Route path='/users' element={<UsersList />}>
                    {matchUser ? (
                        <Route
                            path=':id'
                            element={<User id={matchUser.params.id} />}
                        />
                    ) : null}
                </Route>
            </Routes>
        </Container>
    );
};

export default App;
