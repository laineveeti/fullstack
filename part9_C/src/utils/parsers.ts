import { NewPatient, Gender } from '../types';

const isString = (input: unknown): input is string => {
    return typeof input === 'string' || input instanceof String;
};

const parseString = (input: unknown, fieldName: string): string => {
    if (!isString(input) || input.length < 1) {
        throw new Error(`Incorrect ${fieldName}: ${input}`);
    }
    return input;
};

const isGender = (input: string): input is Gender => {
    return Object.values(Gender)
        .map((v) => v.toString())
        .includes(input);
};

const parseGender = (input: unknown): Gender => {
    if (!isString(input) || !isGender(input)) {
        throw new Error('Incorrect or missing gender: ' + input);
    }

    return input;
};

export const toNewPatient = (object: unknown): NewPatient => {
    if (!object || typeof object !== 'object') {
        throw new Error('Incorrect or missing data');
    }

    if (
        'name' in object &&
        'dateOfBirth' in object &&
        'ssn' in object &&
        'gender' in object &&
        'occupation' in object
    ) {
        const newPatient: NewPatient = {
            name: parseString(object.name, 'name'),
            dateOfBirth: parseString(object.dateOfBirth, 'dateOfBirth'),
            ssn: parseString(object.ssn, 'ssn'),
            gender: parseGender(object.gender),
            occupation: parseString(object.occupation, 'occupation'),
        };
        return newPatient;
    }

    throw new Error('Incorrect data: some fields are missing');
};
