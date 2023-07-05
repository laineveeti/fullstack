import { useState } from 'react';
import { useField } from './hooks';
import { Link, Routes, Route, useMatch, Navigate } from 'react-router-dom';
import { Table } from 'react-bootstrap';
import { Alert, AppBar, Button, Container, IconButton, TextField, Toolbar } from '@mui/material';

const Menu = () => {
    return (
        <AppBar position='static'>
            <Toolbar>
                <IconButton edge='start' color='inherit' aria-label='menu'></IconButton>
                <Button color='inherit' component={Link} to='/'>
                    anecdotes
                </Button>
                <Button color='inherit' component={Link} to='/create'>
                    create new
                </Button>
                <Button color='inherit' component={Link} to='/about'>
                    about
                </Button>
            </Toolbar>
        </AppBar>
    );
};

const AnecdoteList = ({ anecdotes }) => (
    <div>
        <h2>Anecdotes</h2>
        <Table striped>
            <tbody>
                {anecdotes.map(anecdote =>
                    <tr key={anecdote.id} >
                        <td>
                            <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
                        </td>
                    </tr>
                )}
            </tbody>
        </Table>
    </div>
);

const Anecdote = ({ anecdote }) => (
    <div>
        <h2>{anecdote.content}</h2>
        has {anecdote.votes} votes
        <br></br>
        for more info see <a href={anecdote.info}>{anecdote.info}</a>
    </div>
);

const About = () => (
    <div>
        <h2>About anecdote app</h2>
        <p>According to Wikipedia:</p>

        <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is &quot;a story with a point.&quot;</em>

        <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
    </div>
);

const Notification = ({ notification }) => (
    <div>
        {(notification &&
            <Alert severity='success'>
                {notification}
            </Alert>
        )}
    </div>
);

const Footer = () => (
    <div>
    Anecdote app for <a href='https://fullstackopen.com/'>Full Stack Open</a>.

    See <a href='https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js</a> for the source code.
    </div>
);

const CreateNew = (props) => {
    const { reset: contentReset, ...content } = useField('text');
    const { reset: authorReset, ...author } = useField('text');
    const { reset: infoReset, ...info } = useField('text');
    const [created, setCreated] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        props.addNew({
            content: content.value,
            author: author.value,
            info: info.value,
            votes: 0
        });
        setCreated(true);
    };

    const resetAll = () => {
        [contentReset, authorReset, infoReset].forEach(f => f());
    };

    if (created) return <Navigate replace to='/' />;

    return (
        <div>
            <h2>create a new anecdote</h2>
            <form>
                <div>
                    <TextField label='content' {...content} />
                </div>
                <div>
                    <TextField label='author' {...author} />
                </div>
                <div>
                    <TextField label='info' {...info} />
                </div>
                <Button variant='contained' color='primary' onClick={handleSubmit}>create</Button>
                <Button onClick={resetAll}>reset</Button>
            </form>
        </div>
    );

};

const App = () => {
    const [anecdotes, setAnecdotes] = useState([
        {
            content: 'If it hurts, do it more often',
            author: 'Jez Humble',
            info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
            votes: 0,
            id: 1
        },
        {
            content: 'Premature optimization is the root of all evil',
            author: 'Donald Knuth',
            info: 'http://wiki.c2.com/?PrematureOptimization',
            votes: 0,
            id: 2
        }
    ]);

    const [notification, setNotification] = useState('');

    const timedNotification = (content, time) => {
        setNotification(content);
        setTimeout(() => {
            setNotification('');
        }, 1000 * time);
    };

    const addNew = (anecdote) => {
        anecdote.id = Math.round(Math.random() * 10000);
        setAnecdotes(anecdotes.concat(anecdote));
        timedNotification(`a new anecdote ${anecdote.content} created!`, 5);
    };

    const anecdoteById = (id) => {
        return anecdotes.find(a => a.id === id);
    };

    const match = useMatch('/anecdotes/:id');
    const anecdote = match
        ? anecdoteById(Number(match.params.id))
        : null;

    /*     const vote = (id) => {
        const anecdote = anecdoteById(id);

        const voted = {
            ...anecdote,
            votes: anecdote.votes + 1
        };

        setAnecdotes(anecdotes.map(a => a.id === id ? voted : a));
    }; */

    return (
        <Container>
            <h1>Software anecdotes</h1>
            <Menu />
            <Notification notification={notification} />
            <Routes>
                <Route path='/anecdotes/:id' element={<Anecdote anecdote={anecdote} />} />
                <Route path='/' element={<AnecdoteList anecdotes={anecdotes} />} />
                <Route path='/about' element={<About />} />
                <Route path='/create' element={<CreateNew addNew={addNew} />} />
            </Routes>
            <Footer />
        </Container>
    );
};

export default App;
