import { useLoaderData, Params } from 'react-router-dom';
import patientService from '../../services/patients';
import { Female, Male, Transgender } from '@mui/icons-material';
import { Diagnosis, Patient } from '../../types';
import { EntryBlock } from './EntryBlock';

interface LoaderData {
    patient: Patient;
}

export const loader = async ({
    params,
}: {
    params: Params<'id'>;
}): Promise<LoaderData> => {
    if (!params.id) {
        throw new Error('Missing parameter id');
    }
    const patient: Patient = await patientService.getOne(params.id);
    return { patient };
};

export const PatientPage = ({ diagnoses }: { diagnoses: Diagnosis[] }) => {
    const { patient }: LoaderData = useLoaderData() as LoaderData;
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
