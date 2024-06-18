import { Entry } from '../types';

export const DiaryEntry = ({ entry }: { entry: Entry }) => {
    return (
        <div>
            <h3>{entry.date}</h3>
            visibility: {entry.visibility}
            <br />
            weather: {entry.weather}
        </div>
    );
};
