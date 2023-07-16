import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import { Link, Route, Routes } from 'react-router-dom';

const App = () => {
    return (
        <div>
            <Link to="/authors">authors</Link>
            <Link to="/books">books</Link>
            <Link to="/create">add</Link>
            <Routes>
                <Route path="/" element={<Books />} />
                <Route path="/authors" element={<Authors />} />
                <Route path="/books" element={<Books />} />
                <Route path="/create" element={<NewBook />} />
            </Routes>
        </div>
    );
};

export default App;
