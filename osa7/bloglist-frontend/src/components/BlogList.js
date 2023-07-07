import { useSelector } from 'react-redux';
import Toggleable from './Toggleable';
import CreateForm from './CreateForm';
import Blog from './Blog';

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
            {[...blogs]
                .sort((a, b) => b.likes - a.likes)
                .map((blog) => (
                    <Blog key={blog.id} blog={blog} />
                ))}
        </div>
    );
};

export default BlogList;
