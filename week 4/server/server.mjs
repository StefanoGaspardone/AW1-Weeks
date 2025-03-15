import express, { json } from 'express';
import morgan from 'morgan';

import { dao } from './db/dao.mjs';

const app = express();
const port = 3001;

app.use(json())
app.use(morgan('combined'));

/* ROUTE */

// GET /api/questions
app.get('/api/questions', async (req, res) => {
    try {
        const questions = await dao.getQuestions();
        return res.status(200).json(questions);
    } catch(error) {
        console.log(error);
        return res.status(500).json({ error: 'Something went wrong' });
    }
});

app.listen(port, () => console.log(`Server running on http://localhost:${port}`));