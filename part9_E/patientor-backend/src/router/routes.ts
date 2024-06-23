import {
    getDiagnoses,
    getPatients,
    getPatientData,
    postNewPatient,
} from '../services/dataService';
import express from 'express';
import { Patient } from '../types';

const router = express.Router();

router.get('/ping', (_req, res) => {
    console.log('ping');
    res.send('pong');
});

router.get('/diagnoses', (_req, res) => {
    res.send(getDiagnoses());
});

router.get('/patients', (_req, res) => {
    res.send(getPatients());
});

router.get('/patients/:id', (req, res) => {
    try {
        const patientData: Patient = getPatientData(req.params.id);
        res.json(patientData);
    } catch (error: unknown) {
        let errorMessage = 'Something went wrong.';
        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
});

router.post('/patients', (req, res) => {
    try {
        const newEntry: Patient = postNewPatient(req.body);
        res.json(newEntry);
    } catch (error: unknown) {
        let errorMessage = 'Something went wrong.';
        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
});

export default router;
