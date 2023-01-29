import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import CreateForm from './components/CreateForm'
import LoginForm from './components/LoginForm'
import login from './services/login'
import Notification from './components/Notification'

const App = () => {
    const [blogs, setBlogs] = useState([]);
    const [user, setUser] = useState(null);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [url, setUrl] = useState('');
    const [notification, setNotification] = useState(null);
    const [notificationColor, setNotificationColor] = useState('white');

    useEffect(() => {
        blogService.getAll().then(blogs =>
        setBlogs( blogs )
        )  
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
            const user = await login({ username, password });
            window.localStorage.setItem('loggedBloglistUser', JSON.stringify(user));
            blogService.setToken(user.token);

            setUser(user);
            setUsername('');
            setPassword('');
        } catch (error) {
            displayErrorNotification('wrong username or password');
        }
    }

    const logout = () => {
        window.localStorage.removeItem('loggedBloglistUser');
        setUser(null);
        blogService.emptyToken();
    }

    const createBlog = async (event) => {
        event.preventDefault();
        try{
            const newBlog = await blogService.createNew({ title, author, url });
            setTitle('');
            setAuthor('');
            setUrl('');
            setBlogs(blogs.concat(newBlog));

            displayNotification(`a new blog ${newBlog.title} by ${newBlog.author} added`, 'green');
        } catch (error) {
            displayErrorNotification(error.message);
        }
    };

    const displayNotification = (msg, color) => {
        setNotification(msg);
        setNotificationColor(color);
        setTimeout(() => {
            setNotification(null);
           // setNotificationColor('white');
        }, 4000);
    };

    const displayErrorNotification = msg => {
        displayNotification(msg, 'red');
    };

    return user
        ? <div>
            <Notification msg={notification} color={notificationColor} />
            {user.username} logged in
            <button onClick={logout}>logout</button>
            <br></br>
            <h2>create new</h2>
            <CreateForm
                create={createBlog}
                title={title}
                setTitle={setTitle}
                author= {author}
                setAuthor={setAuthor}
                url={url}
                setUrl={setUrl}
            />
            <br></br>
            <h2>blogs</h2>
            {blogs.map(blog =>
                <Blog key={blog.id} blog={blog} />
            )}
        </div>
        : <div>
            <Notification msg={notification} color={notificationColor} />
            <h2>log in to application</h2>
            <LoginForm
                username={username}
                password={password}
                setUsername={setUsername}
                setPassword={setPassword}
                handleLogin={handleLogin}
            />
        </div>
}

export default App