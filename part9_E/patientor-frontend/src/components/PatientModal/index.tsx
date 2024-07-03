import { useLoaderData, Params } from 'react-router-dom';
import { Female, Male, Transgender } from '@mui/icons-material';
import { Diagnosis, Patient } from '../../types';
import { EntryBlock } from './EntryBlock';
import { AddEntryForm } from './AddEntryForm';

interface LoaderData {
    patientId: string;
}

export const loader = async ({
    params,
}: {
    params: Params<'id'>;
}): Promise<LoaderData> => {
    if (!params.id) {
        throw new Error('Missing parameter id');
    }
    const patientId: string = params.id;
    return { patientId };
};

export const PatientPage = ({
    diagnoses,
    patients,
    setPatients,
}: {
    diagnoses: Diagnosis[];
    patients: Patient[];
    setPatients: React.Dispatch<React.SetStateAction<Patient[]>>;
}) => {
    const { patientId }: LoaderData = useLoaderData() as LoaderData;
    const patient: Patient | undefined = patients.find(
        (p) => p.id === patientId
    );
    if (!patient) {
        return <div>Something went wrong, patient not found.</div>;
    }
    return (
        <div>
            <h2>
                {patient.name}
                {patient.gender === 'male' ? (
                    <Male />
                ) : patient.gender === 'female' ? (
                    <Female />
                ) : (
                    <Transgender />
                )}
            </h2>
            ssn: {patient.ssn}
            <br />
            occupation: {patient.occupation}
            <br />
            <AddEntryForm
                patientId={patient.id}
                patients={patients}
                setPatients={setPatients}
            />
            <br />
            <h3>Entries</h3>
            {patient.entries.map((e) => (
                <EntryBlock
                    key={`entry_${e.id}`}
                    entryData={e}
                    diagnoses={diagnoses}
                />
            ))}
        </div>
    );
};
