import { useState, SyntheticEvent } from 'react';
import { Entry, NewHealthCheckEntry, Patient } from '../../types';
import {
    TextField,
    Grid,
    Button,
    Box,
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
} from '@mui/material';
import patientService from '../../services/patients';
import axios from 'axios';

export const AddEntryForm = ({
    patientId,
    patients,
    setPatients,
}: {
    patientId: string;
    patients: Patient[];
    setPatients: React.Dispatch<React.SetStateAction<Patient[]>>;
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
            let patientToModify: Patient | undefined = patients.find(
                (p) => p.id === patientId
            );
            if (patientToModify) {
                patientToModify.entries =
                    patientToModify.entries.concat(createdEntry);
                setPatients(
                    patients
                        .filter((p) => p.id !== patientId)
                        .concat(patientToModify)
                );
            }
            console.log(patients);
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
                    setTimeout(() => {
                        setMsg('');
                    }, 10000);
                } else {
                    setMsg('Unrecognized axios error');
                    setTimeout(() => {
                        setMsg('');
                    }, 10000);
                }
            } else {
                console.error('Unknown error', error);
                setMsg('Unknown error');
                setTimeout(() => {
                    setMsg('');
                }, 10000);
            }
        }
    };

    const onCancel = async (event: SyntheticEvent) => {
        event.preventDefault();
        setNewEntry(emptyEntry);
    };

    return (
        <Box sx={{ p: 2, border: 'dashed 2px gray' }}>
            <Box sx={{ bgcolor: 'red', borderRadius: 1 }}>{msg}</Box>
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
                <FormControl>
                    <FormLabel>Health rating</FormLabel>
                    <RadioGroup
                        row
                        name='controlled-radio-buttons-group'
                        onChange={(event) =>
                            setNewEntry({
                                ...newEntry,
                                healthCheckRating: Number(event.target.value),
                            })
                        }
                    >
                        <FormControlLabel
                            value={0}
                            control={<Radio />}
                            label='Healthy'
                        />
                        <FormControlLabel
                            value={1}
                            control={<Radio />}
                            label='Low risk'
                        />
                        <FormControlLabel
                            value={2}
                            control={<Radio />}
                            label='High risk'
                        />
                        <FormControlLabel
                            value={3}
                            control={<Radio />}
                            label='Critical'
                        />
                    </RadioGroup>
                </FormControl>

                <TextField
                    label='Diagnosis codes'
                    fullWidth
                    value={
                        newEntry.diagnosisCodes
                            ? newEntry.diagnosisCodes.join(',')
                            : ''
                    }
                    onChange={({ target }) =>
                        setNewEntry({
                            ...newEntry,
                            diagnosisCodes: target.value.split(','),
                        })
                    }
                />

                <Grid>
                    <Grid item>
                        <Button
                            color='secondary'
                            variant='contained'
                            type='button'
                            onClick={onCancel}
                        >
                            Cancel
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button type='submit' variant='contained'>
                            Add
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Box>
    );
};
