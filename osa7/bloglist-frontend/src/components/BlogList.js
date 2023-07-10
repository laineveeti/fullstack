import { useSelector } from 'react-redux';
import Toggleable from './Toggleable';
import CreateForm from './CreateForm';
import { Link } from 'react-router-dom';

const BlogList = () => {
    const blogs = useSelector((state) => state.blogs);

    return (
        <div>
            <h2>create new</h2>
            <Toggleable showLabel='create new blog' hideLabel='cancel'>
                <CreateForm />
            </Toggleable>
            <br></br>
            <h2>blogs</h2>
            <ul>
                {[...blogs]
                    .sort((a, b) => b.likes - a.likes)
                    .map((blog) => (
                        <li key={blog.id}>
                            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                        </li>
                    ))
                }
            </ul>
        </div>
    );
};

export default BlogList;
