import { LoginContext } from '../LoginContext';
import { useContext } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const { userQuery, logout } = useContext(LoginContext);
    const currentUser = userQuery.data.me;

    return (
        <div>
            <Link to='/authors'>authors</Link>
            <Link to='/books'>books</Link>
            {currentUser ? <Link to='/create'>add</Link> : null}
            {currentUser ? (
                <>
                    <Link to='/recommended'>recommended</Link>
                    <button onClick={logout}>logout</button>
                </>
            ) : (
                <Link to='/login'>login</Link>
            )}
        </div>
    );
};

export default Navbar;
