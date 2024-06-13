import { useEffect, useState } from 'react';
import { NewFlightForm } from './components/NewFlightForm';
import { Content } from './components/Content';
import { Entry, NewEntry } from './types';
import { createEntry, getAllEntries } from './services/dataService';

const App = () => {
    const [entries, setEntries] = useState<Entry[]>([]);
    const [notification, setNotification] = useState<string>('');
    const [newEntry, setNewEntry] = useState<NewEntry>({
        date: '',
        visibility: '',
        weather: '',
    });

    useEffect(() => {
        getAllEntries().then((data) => {
            setEntries(data);
            console.log(data);
        });
    }, []);

    const submitForm = (event: React.SyntheticEvent) => {
        event.preventDefault();
        try {
            createEntry(newEntry).then((data) => {
                console.log('created entry: ' + data);
                setEntries(entries.concat(data));
            });
            setNewEntry({ date: '', visibility: '', weather: '' });
        } catch (error) {
            if (error instanceof Error) {
                setNotification(error.message);
            }
        }
    };

    return (
        <div>
            <NewFlightForm
                notification={notification}
                newEntry={newEntry}
                setNewEntry={setNewEntry}
                submitForm={submitForm}
            />
            <Content entries={entries} />
        </div>
    );
};

export default App;
