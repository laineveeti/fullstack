import { useDispatch, useSelector } from 'react-redux';
import { loginAsync } from '../reducers/userReducer';
import { displayErrorNotification } from '../reducers/notificationReducer';
import { Navigate } from 'react-router-dom';
import { TextField, Container, Box, Typography, Button } from '@mui/material/';

const LoginForm = () => {
    const dispatch = useDispatch();

    const user = useSelector(state => state.user);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = new FormData(event.currentTarget);
        const credentials = { username: form.get('username'), password: form.get('password') };
        try {
            await dispatch(loginAsync(credentials));
        } catch (exception) {
            displayErrorNotification(dispatch, exception);
        }
    };

    if (user) return <Navigate replace to='/' />;

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign in
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default LoginForm;

/*         <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div>
                    username
                    <input required {...username} />
                </div>
                <div>
                    password
                    <input
                        required
                        type='password'
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </div>
                <button type='submit'>login</button>
            </form>
        </div> */