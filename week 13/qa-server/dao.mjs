/* Data Access Object (DAO) module for accessing Q&A */
/* Initial version taken from exercise 4 (week 03) */

import sqlite from 'sqlite3';
import { Question, Answer } from './QAModels.mjs';
import crypto from 'crypto';

// open the database
const db = new sqlite.Database('questions.sqlite', (err) => {
  if (err) throw err;
});

/** QUESTIONS **/
// get all the questions
export const listQuestions = () => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT question.*, user.email FROM question JOIN user ON question.authorId = user.id';
    db.all(sql, [], (err, rows) => {
      if (err)
        reject(err);
      else {
        const questions = rows.map((q) => new Question(q.id, q.text, q.email, q.authorId, q.date));
        resolve(questions);
      }
    });
  });
}

// get a question given its id
export const getQuestion = (id) => {
  return new Promise ((resolve, reject) => {
    const sql = 'SELECT question.*, user.email FROM question JOIN user ON question.authorId = user.id WHERE question.id = ?';
    db.get(sql, [id], (err, row) => {
      if (err) {
        reject(err);
      } else if (row === undefined) {
        resolve({error: "Question not available, check the inserted id."});
      } else {
        resolve(new Question(row.id, row.text, row.email, row.authorId, row.date));
      }
    });
  });
}

// add a new question
export const addQuestion = (question) => {
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO question(text, authorId, date) VALUES (?,?,?)';
    db.run(sql, [question.text, question.userId, question.date], function(err) {
      if (err)
        reject(err);
      else 
        resolve(this.lastID);
    });
  });
}

/** ANSWERS **/

// get all the answer of a given question
export const listAnswersOf = (questionId) => {
  return new Promise ((resolve, reject) => {
    const sql = 'SELECT answer.*, user.email FROM answer JOIN user ON answer.authorId = user.id WHERE answer.questionId = ?';
    db.all(sql, [questionId], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        const answers = rows.map((ans) => new Answer(ans.id, ans.text, ans.email, ans.authorId, ans.date, ans.score));
        resolve(answers);
      }
    });
  });
}

// add a new answer
export const addAnswer = (answer, questionId) => {
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO answer(text, authorId, date, score, questionId) VALUES (?, ?, ?, ?, ?)';
    db.run(sql, [answer.text, answer.userId, answer.date, answer.score, questionId], function (err) {
      if (err)
        reject(err);
      else
        resolve(this.lastID);
    });
  });
}

// update an existing answer
export const updateAnswer = (answer) => {
  return new Promise((resolve, reject) => {
    let sql = "UPDATE answer SET text = ?, authorId = ?, date = ?, score = ? WHERE id = ?"
    db.run(sql, [answer.text, answer.userId, answer.date, answer.score, answer.id], function (err) {
      if (err)
        reject(err);
      else
        resolve(this.lastID);
    });
  });
}

// vote for an answer
export const voteAnswer = (answerId, vote) => {
  return new Promise((resolve, reject) => {
    const sql = 'UPDATE answer SET score = score + ? WHERE id= ?';
    const delta = vote === 'up' ? 1 : -1;
    db.run(sql, [delta, answerId], function(err) {
      if (err)
        reject(err);
      else
        resolve(this.changes);
    });
  });
}

export const getUser = (email, password) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM user WHERE email = ?';
    db.get(sql, [email], (err, row) => {
      if (err) { 
        reject(err); 
      }
      else if (row === undefined) { 
        resolve(false); 
      }
      else {
        const user = {id: row.id, username: row.email, name: row.name};
        
        crypto.scrypt(password, row.salt, 16, function(err, hashedPassword) {
          if (err) reject(err);
          if(!crypto.timingSafeEqual(Buffer.from(row.password, 'hex'), hashedPassword))
            resolve(false);
          else
            resolve(user);
        });
      }
    });
  });
};