export type Entry = {
    id: string;
    date: string;
    visibility: string;
    weather: string;
};

export type NewEntry = Omit<Entry, 'id'>;
