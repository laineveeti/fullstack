import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../reducers/userReducer';
import { Navigation } from '../styles';

const Menu = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);

    return (
        <Navigation>
            <Link to='/blogs'>blogs</Link>
            <Link to='/users'>users</Link>
            {user ? (
                <div>
                    {user.username} logged in
                    <button onClick={() => dispatch(logout)}>logout</button>
                </div>
            ) : (
                <Link to='/login'>login</Link>
            )}
        </Navigation>
    );
};

export default Menu;
