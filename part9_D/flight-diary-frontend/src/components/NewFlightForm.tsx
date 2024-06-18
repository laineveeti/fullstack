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
                    type='date'
                    value={newEntry.date}
                    onChange={(event) => {
                        event.preventDefault();
                        setNewEntry({ ...newEntry, date: event.target.value });
                    }}
                />
                <br />
                visibility{' '}
                {['great', 'good', 'ok', 'poor'].map((choice) => (
                    <label>
                        <input
                            type='radio'
                            value={choice}
                            name='visibility'
                            onChange={(event) => {
                                setNewEntry({
                                    ...newEntry,
                                    visibility: event.target.value,
                                });
                            }}
                        />{' '}
                        {choice}
                    </label>
                ))}
                <br />
                weather{' '}
                {['sunny', 'rainy', 'cloudy', 'stormy', 'windy'].map(
                    (choice) => (
                        <label>
                            <input
                                type='radio'
                                value={choice}
                                name='weather'
                                onChange={(event) => {
                                    setNewEntry({
                                        ...newEntry,
                                        weather: event.target.value,
                                    });
                                }}
                            />{' '}
                            {choice}
                        </label>
                    )
                )}
                <br />
                comment{' '}
                <input
                    value={newEntry.comment}
                    onChange={(event) => {
                        event.preventDefault();
                        setNewEntry({
                            ...newEntry,
                            comment: event.target.value,
                        });
                    }}
                />
                <br />
                <button onClick={submitForm}>add</button>
            </form>
        </div>
    );
};
