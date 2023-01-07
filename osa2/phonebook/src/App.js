import { useEffect, useState } from 'react';
import Persons from './components/Persons';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import phonebookServer from './services/jsonserver';

const App = () => {
    const [persons, setPersons] = useState([]);
    const [newNumber, setNewNumber] = useState('');
    const [newName, setNewName] = useState('');
    const [filter, setFilter] = useState('');

    useEffect(() => {
        phonebookServer.getAll().then(data => setPersons(data));
    }, []);

    const addNew = (event) => {
        const existingContact = persons.find(person => person.name === newName);
        event.preventDefault();
        if (existingContact) {
            if (window.confirm(`${existingContact.name} is already added to phonebook, replace the old number with a new one?`)) {
                const updatedContact = { ...existingContact, number: newNumber};
                phonebookServer.update(existingContact.id, updatedContact);
                setPersons(persons.map(contact => contact.id === updatedContact.id ? updatedContact : contact));
            
                setNewName('');
                setNewNumber('');
            }
        } else {
            const newPerson = { name: newName, number: newNumber };
            phonebookServer.create(newPerson).then(data => setPersons(persons.concat(data)));
    
            setNewName('');
            setNewNumber('');
        }
    };

    const removePerson = id => {
        if(window.confirm(`Delete ${persons.find(person => person.id === id).name}`)) {
            phonebookServer.remove(id)
                .then(setPersons(persons.filter(person => person.id !== id)))
                .catch(error => alert('resource does not exist!'));
        }
    }

    const handleNameChange = (event) => {
        setNewName(event.target.value);
    }

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value);
    }

    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter filter={filter} handleFilterChange={handleFilterChange} />
            <h2>add a new</h2>
            <PersonForm
                addNew={addNew}
                handleNameChange={handleNameChange}
                handleNumberChange={handleNumberChange}
                newName={newName}
                newNumber={newNumber} />
            <h2>Numbers</h2>
            <Persons
                persons={persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))}
                removePerson={removePerson} />
        </div>
    );

}

export default App