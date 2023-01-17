const express = require('express');
const app = express();
const cors = require('cors');
const { PORT, MONGODB_URI } = require('./utils/config');
const blogsRouter = require('./controllers/blogs');
const { info } = require('./utils/logger');
const mongoose = require('mongoose');

mongoose.connect(MONGODB_URI);

app.use(cors());
app.use(express.json());
app.use('/api/blogs', blogsRouter);

app.listen(PORT, () => {
    info(`Server running on port ${PORT}`);
});