import { Diagnosis, Entry } from '../../types';

export const EntryBlock = ({
    entryData,
    diagnoses,
}: {
    entryData: Entry;
    diagnoses: Diagnosis[];
}) => {
    return (
        <div>
            {entryData.date} <i>{entryData.description}</i>
            <ul>
                {entryData.diagnosisCodes &&
                    entryData.diagnosisCodes.map((d) => (
                        <li key={`diagnosis_${d}`}>
                            {d}{' '}
                            {
                                (
                                    diagnoses.find((e) => d === e.code) || {
                                        name: 'diagnosis name not found',
                                    }
                                ).name
                            }
                        </li>
                    ))}
            </ul>
        </div>
    );
};
