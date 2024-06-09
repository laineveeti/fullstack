import { Diagnosis, NonSensitivePatient } from '../types';
import diagnosisData from '../data/diagnoses';
import patientData from '../data/patients';

export const getDiagnoses = (): Diagnosis[] => {
    return diagnosisData;
};

export const getPatients = (): NonSensitivePatient[] => {
    return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
    }));
};
