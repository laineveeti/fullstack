import { useEffect } from 'react';
import { Routes, Route, useMatch } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import { initializeBlogs } from './reducers/blogReducer';
import { initializeUsers } from './reducers/usersReducer';
import { useDispatch } from 'react-redux';
import { checkLoggedIn } from './reducers/userReducer';
import BlogList from './components/BlogList';
import UsersList from './components/UsersList';
import User from './components/User';
import Blog from './components/Blog';
import Menu from './components/Menu';
import CreateForm from './components/CreateForm';
import { Container, Grid } from '@mui/material';

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

    const matchUser = useMatch('/users/:id');
    const matchBlog = useMatch('/blogs/:id');

    return (
        <Container>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Menu />
                    <Notification />
                </Grid>
                <Grid item xs={4}>
                    <Routes>
                        <Route path='/' element={<BlogList />} />
                        <Route path='/create' element={<BlogList />} />
                        <Route path='/blogs' element={<BlogList />} />
                        <Route path='/blogs/:id' element={<BlogList />} />
                        <Route path='/users' element={<UsersList />} />
                        <Route path='/users/:id' element={<UsersList />} />
                    </Routes>
                </Grid>
                <Grid item xs={8}>
                    <Routes>
                        <Route path='/create' element={<CreateForm />} />
                        <Route path='/login' element={<LoginForm />} />
                        {matchBlog ? (
                            <Route
                                path='/blogs/:id'
                                element={<Blog id={matchBlog.params.id} />}
                            />
                        ) : null}
                        {matchUser ? (
                            <Route
                                path='/users/:id'
                                element={<User id={matchUser.params.id} />}
                            />
                        ) : null}
                    </Routes>
                </Grid>
            </Grid>
        </Container>
    );
};

export default App;
