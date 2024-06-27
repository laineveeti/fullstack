import {
    NewPatient,
    Gender,
    Entry,
    Diagnosis,
    HospitalEntry,
    NewEntry,
} from '../types';

const isString = (input: unknown): input is string => {
    return typeof input === 'string' || input instanceof String;
};

export const parseString = (input: unknown, fieldName: string): string => {
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

const isEntryType = (input: string): input is Entry['type'] => {
    return ['HealthCheck', 'Hospital', 'OccupationalHealthcare'].includes(
        input
    );
};

const parseEntryType = (input: unknown): Entry['type'] => {
    if (!isString(input) || !isEntryType(input)) {
        throw new Error('Incorrect entry type: ' + input);
    }

    return input;
};

const isDischarge = (input: Object): input is HospitalEntry['discharge'] => {
    return 'criteria' in input && 'date' in input;
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> => {
    if (
        !object ||
        typeof object !== 'object' ||
        !('diagnosisCodes' in object)
    ) {
        return [] as Array<Diagnosis['code']>;
    }
    return object.diagnosisCodes as Array<Diagnosis['code']>;
};

export const parseEntry = (object: unknown): NewEntry => {
    if (!object || typeof object !== 'object') {
        throw new Error('Incorrect or missing entry data');
    }

    if (
        'description' in object &&
        'date' in object &&
        'specialist' in object &&
        'type' in object &&
        'diagnosisCodes' in object
    ) {
        const newEntry = {
            description: parseString(object.description, 'description'),
            date: parseString(object.date, 'date'),
            specialist: parseString(object.specialist, 'specialist'),
            type: parseEntryType(object.type),
            diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
        };

        switch (newEntry.type) {
            case 'HealthCheck':
                if (
                    'healthCheckRating' in object &&
                    object.healthCheckRating &&
                    isString(object.healthCheckRating)
                ) {
                    return {
                        ...newEntry,
                        healthCheckRating: Number(object.healthCheckRating),
                    };
                }
                throw new Error(
                    'Incorrect healthcheckRating: ' + object.healthCheckRating
                );
            case 'Hospital':
                if (
                    !(
                        'discharge' in input &&
                        input.discharge &&
                        typeof input.discharge === 'object' &&
                        isDischarge(input.discharge)
                    )
                ) {
                    return false;
                }
                return true;
            case 'OccupationalHealthcare':
                if (!('employerName' in input)) {
                    return false;
                }
                if (
                    'sickLeave' in input &&
                    !(
                        typeof input.sickLeave === 'object' &&
                        input.sickLeave &&
                        'startDate' in input.sickLeave &&
                        'endDate' in input.sickLeave
                    )
                ) {
                    return false;
                }
                return true;
            default:
                return false;
        }
        return newPatient;
    }

    throw new Error('Incorrect data: some fields are missing');
};

const parseEntries = (input: unknown): Entry[] => {
    if (!(input instanceof Array)) {
        throw new Error('Incorrect entry list format');
    }
    return input.map((e) => {
        return { ...parseEntry(e), id: e.id };
    });
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
        'occupation' in object &&
        'entries' in object
    ) {
        const newPatient: NewPatient = {
            name: parseString(object.name, 'name'),
            dateOfBirth: parseString(object.dateOfBirth, 'dateOfBirth'),
            ssn: parseString(object.ssn, 'ssn'),
            gender: parseGender(object.gender),
            occupation: parseString(object.occupation, 'occupation'),
            entries: parseEntries(object.entries),
        };
        return newPatient;
    }

    throw new Error('Incorrect data: some fields are missing');
};
