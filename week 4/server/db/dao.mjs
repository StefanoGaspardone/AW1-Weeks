import sqlite3 from 'sqlite3';

import Answer from '../models/Answer.mjs';
import Question from '../models/Question.mjs';

const db = new sqlite3.Database('./db/questions.sqlite', (err) => {
    if(err) throw err;
});

const getQuestions = () => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT question.*, user.email FROM question, user WHERE question.authorId = user.id';

        db.all(query, [], (err, rows) => {
            if(err) reject(err);
            else resolve(rows.map(row => new Question(row.id, row.text, row.email, row.date)));
        });
    });
}

const getQuestion = (id) => {

}

const addQuestion = (question) => {

}

const getAnswersByQuestion = (questionId) => {

}

const addAnswer = (answer) => {

}

const updateAnswer = (answer) => {

}

const voteAnwser = (answerId, vote) => {

}

export const dao = {
    getQuestions,
    getQuestion,
    addQuestion,
    getAnswersByQuestion,
    addAnswer,
    updateAnswer,
    voteAnwser,
};