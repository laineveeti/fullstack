import { useState, SyntheticEvent } from 'react';
import { Entry, NewHealthCheckEntry, Patient } from '../../types';
import {
    TextField,
    SelectChangeEvent,
    InputLabel,
    MenuItem,
    Select,
    Grid,
    Button,
    Box,
} from '@mui/material';
import patientService from '../../services/patients';
import axios from 'axios';

export const AddEntryForm = ({
    patientId,
    patientList,
    updatePatientList,
}: {
    patientId: string;
    patientList: Patient[];
    updatePatientList: React.Dispatch<React.SetStateAction<Patient[]>>;
}) => {
    const emptyEntry: NewHealthCheckEntry = {
        description: '',
        date: '',
        type: 'HealthCheck',
        healthCheckRating: 0,
        diagnosisCodes: [],
        specialist: '',
    };
    const [newEntry, setNewEntry] = useState<NewHealthCheckEntry>(emptyEntry);
    const [msg, setMsg] = useState('');

    const addEntry = async (event: SyntheticEvent) => {
        event.preventDefault();
        try {
            const createdEntry: Entry = await patientService.createEntry(
                patientId,
                newEntry
            );
            let patientToModify: Patient | undefined = patientList.find(
                (p) => p.id === patientId
            );
            if (patientToModify) {
                patientToModify.entries =
                    patientToModify.entries.concat(createdEntry);
                updatePatientList(
                    patientList
                        .filter((p) => p.id !== patientId)
                        .concat(patientToModify)
                );
            }
            setNewEntry(emptyEntry);
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                if (
                    error?.response?.data &&
                    typeof error?.response?.data === 'string'
                ) {
                    const message = error.response.data.replace(
                        'Something went wrong. Error: ',
                        ''
                    );
                    console.error(message);
                    setMsg(message);
                } else {
                    setMsg('Unrecognized axios error');
                }
            } else {
                console.error('Unknown error', error);
                setMsg('Unknown error');
            }
        }
    };

    const onCancel = async (event: SyntheticEvent) => {
        event.preventDefault();
        setNewEntry(emptyEntry);
    };

    const diagnosisCodes = ['shitfuckery', 'ass'];

    const onDiagnosisChange = (event: SelectChangeEvent<string>) => {
        event.preventDefault();
        if (typeof event.target.value === 'string') {
            const value = event.target.value;
            setNewEntry({ ...newEntry, diagnosisCodes: value.split(',') });
        }
    };

    return (
        <Box sx={{ p: 2, border: '1px' }}>
            <Box>{msg}</Box>
            <form onSubmit={addEntry}>
                <TextField
                    label='Description'
                    fullWidth
                    value={newEntry.description}
                    onChange={({ target }) =>
                        setNewEntry({ ...newEntry, description: target.value })
                    }
                />
                <TextField
                    label='Date'
                    fullWidth
                    value={newEntry.date}
                    onChange={({ target }) =>
                        setNewEntry({ ...newEntry, date: target.value })
                    }
                />
                <TextField
                    label='Specialist'
                    fullWidth
                    value={newEntry.specialist}
                    onChange={({ target }) =>
                        setNewEntry({ ...newEntry, specialist: target.value })
                    }
                />
                <TextField
                    label='Healthcheck rating'
                    fullWidth
                    value={newEntry.healthCheckRating}
                    onChange={({ target }) =>
                        setNewEntry({
                            ...newEntry,
                            healthCheckRating: Number(target.value),
                        })
                    }
                />

                <InputLabel style={{ marginTop: 20 }}>
                    Diagnosis codes
                </InputLabel>
                <Select
                    label='Diagnosis'
                    fullWidth
                    multiple
                    value={newEntry.diagnosisCodes}
                    onChange={onDiagnosisChange}
                >
                    {diagnosisCodes.map((code) => (
                        <MenuItem key={code} value={code}>
                            {code}
                        </MenuItem>
                    ))}
                </Select>

                <Grid>
                    <Grid item>
                        <Button
                            color='secondary'
                            variant='contained'
                            style={{ float: 'left' }}
                            type='button'
                            onClick={onCancel}
                        >
                            Cancel
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button
                            style={{
                                float: 'right',
                            }}
                            type='submit'
                            variant='contained'
                        >
                            Add
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Box>
    );
};
