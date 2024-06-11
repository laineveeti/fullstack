import {
    getDiagnoses,
    getPatients,
    postNewPatient,
} from '../services/dataService';
import express from 'express';

const router = express.Router();

router.get('/diagnoses', (_req, res) => {
    res.send(getDiagnoses());
});

router.get('/patients', (_req, res) => {
    res.send(getPatients());
});

router.post('/patients', (_req, res) => {});

export default router;
