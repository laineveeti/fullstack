export type Entry = {
    id: string;
    date: string;
    visibility: string;
    weather: string;
    comment: string;
};

export type NewEntry = Omit<Entry, 'id'>;
