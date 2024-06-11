import { Diagnosis, Patient, NonSensitivePatient } from '../types';
import diagnosisData from '../data/diagnoses';
import patientData from '../data/patients';
import { toNewPatient } from '../utils/parsers';
import { v1 as uuid } from 'uuid';

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

export const postNewPatient = (object: unknown): Patient => {
    const newPatient: Patient = toNewPatient(object) as Patient;
    newPatient.id = uuid();
    return newPatient;
};
