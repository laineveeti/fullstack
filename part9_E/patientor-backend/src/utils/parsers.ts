import {
    NewPatient,
    Gender,
    Entry,
    Diagnosis,
    NewEntry,
    HealthCheckRating,
    HospitalEntry,
    OccupationalHealthcareEntry,
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

const parseDiagnosisCodes = (input: unknown): Array<Diagnosis['code']> => {
    if (!input || !(input instanceof Array)) {
        return [] as Array<Diagnosis['code']>;
    }
    return input as Array<Diagnosis['code']>;
};

const isHealthCheckRating = (input: number): input is HealthCheckRating => {
    return Object.values(HealthCheckRating).includes(input);
};

const parseHealthCheckRating = (input: unknown): HealthCheckRating => {
    const asNum: number = Number(input);

    if (isNaN(asNum) || !isHealthCheckRating(asNum)) {
        throw new Error('Incorrect or missing healthcheckrating: ' + input);
    }

    return asNum;
};

const parseDischarge = (object: unknown): HospitalEntry['discharge'] => {
    if (!object || typeof object !== 'object') {
        throw new Error('Incorrect discharge data');
    }
    if (!('date' in object)) {
        throw new Error('Missing discharge date');
    }
    if (!('criteria' in object)) {
        throw new Error('Missing discharge criteria');
    }
    return {
        date: parseString(object.date, 'date'),
        criteria: parseString(object.criteria, 'criteria'),
    };
};

const parseSickLeave = (
    object: unknown
): OccupationalHealthcareEntry['sickLeave'] => {
    if (!object || typeof object !== 'object') {
        throw new Error('Incorrect discharge data');
    }
    if (!('startDate' in object)) {
        throw new Error('Missing sickleave startdate');
    }
    if (!('endDate' in object)) {
        throw new Error('Missing sickleave enddate');
    }
    return {
        startDate: parseString(object.startDate, 'startDate'),
        endDate: parseString(object.endDate, 'endDate'),
    };
};

export const parseEntry = (object: unknown): NewEntry => {
    if (!object || typeof object !== 'object') {
        throw new Error('Incorrect or missing entry data');
    }

    if (
        !(
            'description' in object &&
            'date' in object &&
            'specialist' in object &&
            'type' in object
        )
    ) {
        throw new Error('Incorrect data: some fields are missing');
    }

    const newEntryWithoutDiagnosis = {
        description: parseString(object.description, 'description'),
        date: parseString(object.date, 'date'),
        specialist: parseString(object.specialist, 'specialist'),
    };

    const newEntry =
        'diagnosisCodes' in object
            ? {
                  ...newEntryWithoutDiagnosis,
                  diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
              }
            : newEntryWithoutDiagnosis;

    switch (parseEntryType(object.type)) {
        case 'HealthCheck':
            if (!('healthCheckRating' in object)) {
                throw new Error(
                    'Incorrect data: some fields are missing from type HealthCheck'
                );
            }
            return {
                ...newEntry,
                type: 'HealthCheck',
                healthCheckRating: parseHealthCheckRating(
                    object.healthCheckRating
                ),
            };
        case 'OccupationalHealthcare':
            if (!('employerName' in object)) {
                throw new Error(
                    'Incorrect data: some fields are missing from type OccupationalHealthcare'
                );
            }
            const entryWithoutSickLeave: NewEntry = {
                ...newEntry,
                type: 'OccupationalHealthcare',
                employerName: parseString(object.employerName, 'employerName'),
            };
            const occupationalHealthcareEntry: NewEntry =
                'sickLeave' in object
                    ? {
                          ...entryWithoutSickLeave,
                          sickLeave: parseSickLeave(object.sickLeave),
                      }
                    : entryWithoutSickLeave;
            return occupationalHealthcareEntry;
        case 'Hospital':
            if (!('discharge' in object)) {
                throw new Error(
                    'Incorrect data: some fields are missing from type Hospital'
                );
            }
            return {
                ...newEntry,
                type: 'Hospital',
                discharge: parseDischarge(object.discharge),
            };
    }
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
