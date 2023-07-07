import { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import CreateForm from './components/CreateForm';
import LoginForm from './components/LoginForm';
import login from './services/login';
import Notification from './components/Notification';
import Toggleable from './components/Toggleable';

const App = () => {
    const [blogs, setBlogs] = useState([]);
    const [user, setUser] = useState(null);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [notification, setNotification] = useState(null);
    const [notificationColor, setNotificationColor] = useState('white');

    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogs(blogs)
        );
    }, []);

    useEffect(() => {
        const loggedInUser = JSON.parse(window.localStorage.getItem('loggedBloglistUser'));
        if(loggedInUser) {
            setUser(loggedInUser);
            blogService.setToken(loggedInUser.token);
        }
    }, []);

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const loggedInUser = await login({ username, password });
            window.localStorage.setItem('loggedBloglistUser', JSON.stringify(loggedInUser));
            blogService.setToken(loggedInUser.token);
            setUser(loggedInUser);
            setUsername('');
            setPassword('');
        } catch (exception) {
            displayErrorNotification(exception);
        }
    };

    const logout = () => {
        window.localStorage.removeItem('loggedBloglistUser');
        setUser(null);
        blogService.emptyToken();
    };

    const addBlog = async (blogData) => {
        try{
            const newBlog = await blogService.createNew(blogData);
            newBlog.user = {
                id: user.id,
                username: user.username,
                name: user.name
            };
            setBlogs(blogs.concat(newBlog));
            createFormRef.current.toggleVisibility();
            displayNotification(`a new blog ${newBlog.title} by ${newBlog.author} added`, 'green');
        } catch (exception) {
            displayErrorNotification(exception);
        }
    };

    const likeBlog = (id) => async () => {
        try {
            const updatedBlog = await blogService.like(id);
            setBlogs(blogs.map(blog => {
                if(blog.id === updatedBlog.id) {
                    blog.likes = updatedBlog.likes;
                }
                return blog;
            }));
        } catch (exception) {
            displayErrorNotification(exception);
        }
    };

    const removeBlog = (id) => async () => {
        try {
            if(window.confirm(`Remove blog ${blogs.find(blog => blog.id === id).title}?`)) {
                await blogService.remove(id);
                setBlogs(blogs.filter(blog => blog.id !== id));
            }
        } catch (exception) {
            displayErrorNotification(exception);
        }
    };

    const displayNotification = (msg, color) => {
        setNotification(msg);
        setNotificationColor(color);
        setTimeout(() => {
            setNotification(null);
            setNotificationColor('white');
        }, 4000);
    };

    const displayErrorNotification = msg => {
        displayNotification(msg, 'red');
    };

    const createFormRef = useRef();

    return <div>
        <Notification msg={notification} color={notificationColor} />
        {user ? <div>
            {user.username} logged in
            <button onClick={logout}>logout</button>
            <br></br>
            <h2>create new</h2>
            <Toggleable showLabel='create new blog' hideLabel='cancel' ref={createFormRef}>
                <CreateForm addBlog={addBlog} />
            </Toggleable>
            <br></br>
            <h2>blogs</h2>
            {blogs.sort((a, b) => b.likes - a.likes)
                .map(blog => <Blog
                    key={blog.id}
                    blog={blog}
                    likeBlog={likeBlog}
                    removeBlog={removeBlog}
                    user={user}
                />)
            }
        </div> : <LoginForm
            username={username}
            password={password}
            setUsername={setUsername}
            setPassword={setPassword}
            handleLogin={handleLogin}
        />
        }
    </div>;
};

export default App;