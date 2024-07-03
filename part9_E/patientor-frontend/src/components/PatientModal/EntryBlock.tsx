import {
    Diagnosis,
    Entry,
    HospitalEntry,
    HealthCheckEntry,
    OccupationalHealthcareEntry,
    HealthCheckRating,
} from '../../types';

import {
    LocalHospital,
    Work,
    MedicalInformation,
    Favorite,
} from '@mui/icons-material';

import { Box } from '@mui/material';

const assertNever = (value: never): never => {
    throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
};

const HospitalEntryDetails = ({ entryData }: { entryData: HospitalEntry }) => {
    return (
        <>
            {entryData.date} <LocalHospital />
            <br />
            <i>{entryData.description}</i>
            <br />
            Discharged on {entryData.discharge.date}:{' '}
            {entryData.discharge.criteria}
        </>
    );
};

const getHeartColor = (rating: HealthCheckRating) => {
    switch (rating) {
        case 0:
            return 'green';
        case 1:
            return 'yellow';
        case 2:
            return 'orange';
        case 3:
            return 'red';
    }
};

const HealthCheckEntryDetails = ({
    entryData,
}: {
    entryData: HealthCheckEntry;
}) => {
    return (
        <>
            {entryData.date} <MedicalInformation />
            <br />
            <i>{entryData.description}</i>
            <br />
            Rating:{' '}
            <Favorite
                sx={{ color: getHeartColor(entryData.healthCheckRating) }}
            />
        </>
    );
};

const OccupationalHealthcareEntryDetails = ({
    entryData,
}: {
    entryData: OccupationalHealthcareEntry;
}) => {
    return (
        <>
            {entryData.date} <Work />
            <br />
            <i>{entryData.description}</i>
            <br />
            Employer: {entryData.employerName}
            {entryData.sickLeave && (
                <>
                    <br />
                    Sick leave: {entryData.sickLeave?.startDate} -{' '}
                    {entryData.sickLeave?.startDate}
                </>
            )}
        </>
    );
};

export const EntryBlock = ({
    entryData,
    diagnoses,
}: {
    entryData: Entry;
    diagnoses: Diagnosis[];
}) => {
    const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
        switch (entry.type) {
            case 'Hospital':
                return <HospitalEntryDetails entryData={entry} />;
            case 'OccupationalHealthcare':
                return <OccupationalHealthcareEntryDetails entryData={entry} />;
            case 'HealthCheck':
                return <HealthCheckEntryDetails entryData={entry} />;
            default:
                return assertNever(entry);
        }
    };

    return (
        <Box sx={{ p: 1, border: '2px solid grey', borderRadius: 2 }}>
            <EntryDetails entry={entryData} />
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
            Diagnosed by {entryData.specialist}
        </Box>
    );
};
