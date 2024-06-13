import { NewEntry } from '../types';
import { Notification } from './Notification';

export const NewFlightForm = ({
    notification,
    newEntry,
    setNewEntry,
    submitForm,
}: {
    notification: string;
    newEntry: NewEntry;
    setNewEntry: React.Dispatch<React.SetStateAction<NewEntry>>;
    submitForm: (event: React.SyntheticEvent) => void;
}) => {
    return (
        <div>
            <h1>Add new entry</h1>
            {notification && <Notification msg={notification} />}
            <form>
                date{' '}
                <input
                    value={newEntry.date}
                    onChange={(event) =>
                        setNewEntry({ ...newEntry, date: event.target.value })
                    }
                />
                visibility{' '}
                <input
                    value={newEntry.visibility}
                    onChange={(event) =>
                        setNewEntry({
                            ...newEntry,
                            visibility: event.target.value,
                        })
                    }
                />
                weather{' '}
                <input
                    value={newEntry.weather}
                    onChange={(event) =>
                        setNewEntry({
                            ...newEntry,
                            weather: event.target.value,
                        })
                    }
                />
                <button onClick={submitForm}>Click here</button>
            </form>
        </div>
    );
};
