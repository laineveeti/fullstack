import { getDiagnoses, getPatients } from '../services/data';
import express from 'express';

const router = express.Router();

router.get('/diagnoses', (_req, res) => {
    res.send(getDiagnoses());
});

router.get('/patients', (_req, res) => {
    res.send(getPatients());
});

export default router;
