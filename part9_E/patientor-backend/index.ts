import express from 'express';
import cors from 'cors';
import router from './src/router/routes';

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 3001;

app.use('/api', router);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
