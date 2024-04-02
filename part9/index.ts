import express from 'express';
import calculateBmi from './calculateBmi';

const app = express();
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

const PORT = 3003;

app.listen(PORT, () => {
    console.log('listening on port ' + PORT);
});
