import { Diagnosis, Patient, NonSensitivePatient } from '../types';
import diagnosisData from '../data/diagnoses';
import patientData from '../data/patients';
import { toNewPatient } from '../utils/parsers';
import { v1 as uuid } from 'uuid';

const patients: Patient[] = patientData.map((obj) => {
    const newPatient: Patient = toNewPatient(obj) as Patient;
    newPatient.id = obj.id;
    return newPatient;
});

export const getDiagnoses = (): Diagnosis[] => {
    return diagnosisData;
};

export const getPatients = (): NonSensitivePatient[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => {
        const patientToReturn: NonSensitivePatient = {
            id,
            name,
            dateOfBirth,
            gender,
            occupation,
        };
        return patientToReturn;
    });
};

export const postNewPatient = (object: unknown): Patient => {
    const newPatient: Patient = toNewPatient(object) as Patient;
    newPatient.id = uuid();
    return newPatient;
};
