import { NewPatient } from "../types";

const isString = (input: unknown): input is string => {
    return typeof input === 'string' ||input instanceof String;
};

const parseString = (input: unknown, fieldName: string): string => {
    if (!isString(input)) {
        throw new Error(`Incorrect ${fieldName}: ${input}`);
    }
    return input;
};

export const toNewPatient = (object: unknown): NewPatient => {
    if (!object || typeof object !== 'object') {
        throw new Error('Incorrect or missing data');
    };

    if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object) {
        const newPatient: NewPatient = {
            name: parseString(object.name, "name");
            dateOfBirth: parseString(object.dateOfBirth, 'dateOfBirth'),
            ssn: parseString(object.ssn, 'ssn'),
            gender: parseString(object.gender, 'gender'),
            occupation: parseString(object.occupation, 'occupation')
        };
        return newPatient;
    }

    throw new Error('Incorrect data: some fields are missing');
};