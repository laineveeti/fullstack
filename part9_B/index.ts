import express from 'express';
import calculateBmi from './calculateBmi';
import { calculateExercises } from './calculateExercises';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});
app.get('/bmi', (req, res) => {
    try {
        const { height, weight } = req.query;
        if (isNaN(Number(height)) || isNaN(Number(weight)))
            throw new Error('parameters are not numbers');
        const result = {
            weight,
            height,
            bmi: calculateBmi(Number(height), Number(weight)),
        };
        res.json(result);
    } catch (error: unknown) {
        const errorMsg = { error: 'malformatted parameters' };
        res.json(errorMsg);
    }
});
app.post('/exercises', (req, res) => {
    const input = req.body;
    console.log(input);
    try {
        const hours = input.daily_exercises.map((h: any) => Number(h));
        const target = Number(input.target);
        if (hours.length < 1 || hours.concat(target).some(isNaN)) {
            res.json({ error: 'malformatted parameters' });
        }
        res.json(calculateExercises(hours, target));
    } catch (error: unknown) {
        res.json({ error: 'parameters missing' });
    }
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log('listening on port ' + PORT);
});
