import { Entry } from '../types';
import { DiaryEntry } from './DiaryEntry';

export const Content = ({ entries }: { entries: Entry[] }) => {
    return (
        <div>
            <h1>Diary entries</h1>
            {entries.map((e) => (
                <DiaryEntry entry={e} />
            ))}
        </div>
    );
};
