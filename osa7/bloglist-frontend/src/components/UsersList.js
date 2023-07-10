import { Table, TableCell, TableHead, TableRow, TableBody } from '@mui/material';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const UsersList = () => {
    const users = useSelector(state => state.users);

    return <div>
        <h1>Users</h1>
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell></TableCell>
                    <TableCell>blogs created</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {[...users].map(user => {
                    return <TableRow key={user.id}>
                        <TableCell>
                            <Link to={`${user.id}`}>{user.username}</Link>
                        </TableCell>
                        <TableCell>{user.blogs.length}</TableCell>
                    </TableRow>;
                })}
            </TableBody>
        </Table>
    </div>;
};

export default UsersList;