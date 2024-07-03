import { Diagnosis, Patient, NonSensitivePatient, Entry } from '../types';
import diagnosisData from '../data/diagnoses';
import patientData from '../data/patients';
import { toNewPatient, parseEntry } from '../utils/parsers';
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
    return patients.map(
        ({ id, name, dateOfBirth, gender, occupation, entries }) => {
            const patientToReturn: NonSensitivePatient = {
                id,
                name,
                dateOfBirth,
                gender,
                occupation,
                entries,
            };
            return patientToReturn;
        }
    );
};

export const getPatientData = (id: string): Patient => {
    const patientData: Patient | undefined = patients.find((p) => p.id === id);
    if (!patientData) {
        throw new Error(`Patient with id ${id} not found`);
    }
    return patientData;
};

export const postNewPatient = (object: unknown): Patient => {
    const newPatient: Patient = toNewPatient(object) as Patient;
    newPatient.id = uuid();
    return newPatient;
};

export const postNewEntry = (_id: string, object: unknown): Entry => {
    const newEntry: Entry = parseEntry(object) as Entry;
    newEntry.id = uuid();
    return newEntry;
};
