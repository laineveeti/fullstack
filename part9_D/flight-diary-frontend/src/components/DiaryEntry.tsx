import { Entry } from '../types';

export const DiaryEntry = ({ entry }: { entry: Entry }) => {
    return (
        <div>
            <h1>{entry.date}</h1>
            <p>visibility: {entry.visibility}</p>
            <p>weather: {entry.weather}</p>
        </div>
    );
};
