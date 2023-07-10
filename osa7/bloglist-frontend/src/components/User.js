import { useSelector } from 'react-redux';

const User = ({ id }) => {
    const user = useSelector(state => state.users.find(u => u.id === id));

    return <div>
        <h1>{user.name}</h1>
        <h2>added blogs</h2>
        <ul>
            {[...user.blogs].map(blog => {
                return <li key={blog.id}>
                    {blog.title}
                </li>;
            })}
        </ul>
    </div>;
};

export default User;