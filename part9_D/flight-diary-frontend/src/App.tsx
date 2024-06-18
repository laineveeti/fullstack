import { useEffect, useState } from 'react';
import { NewFlightForm } from './components/NewFlightForm';
import { Content } from './components/Content';
import { Entry, NewEntry } from './types';
import { createEntry, getAllEntries } from './services/dataService';
import { AxiosError } from 'axios';

const App = () => {
    const [entries, setEntries] = useState<Entry[]>([]);
    const [notification, setNotification] = useState<string>('');
    const [newEntry, setNewEntry] = useState<NewEntry>({
        date: '',
        visibility: '',
        weather: '',
        comment: '',
    });

    useEffect(() => {
        getAllEntries().then((data) => {
            setEntries(data);
        });
    }, []);

    const submitForm = async (event: React.SyntheticEvent) => {
        event.preventDefault();
        try {
            const data: Entry = await createEntry(newEntry);
            setEntries(entries.concat(data));
            setNewEntry({ date: '', visibility: '', weather: '', comment: '' });
        } catch (error) {
            if (error instanceof AxiosError && error.response) {
                setNotification(error.response.data);
            } else {
                console.error(error);
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
