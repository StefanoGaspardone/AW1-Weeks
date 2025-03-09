import dayjs from 'dayjs';
import sqlite3 from 'sqlite3';

const db = new sqlite3.Database('questions.sqlite', (err) => {
  if(err) throw err;
});

// Oggetto rappresentante le domande (con le sue proprietà e metodi)
function Question(id, text, email, date) {
  this.id = id;
  this.text = text;
  this.email = email;
  this.date = dayjs(date);

  // metodo per prendere tutte le risposte della Question instanziata (3)
  this.getAnswers = () => {
    return new Promise((resolve, reject) => {
      const query = 'SELECT answer.id, text, user.email, date, score FROM answer, user WHERE questionId = ? AND answer.authorId = user.id';
      db.all(query, [this.id], (err, rows) => {
        if(err) reject(err);
        else {
          const answers = rows.map(row => new Answer(row.id, row.text, row.email, row.date, row.score));
          resolve(answers);
        }
      });
    });
  }

  // metodo per aggiungere una nuova risposta di un autore esistente alla Question instanziata (4)
  this.addAnswer = (answer) => {
    return new Promise((resolve, reject) => {
      let query = 'SELECT id FROM user WHERE email = ?';

      db.get(query, [answer.email], (err, row) => {
        if(err) reject(err);
        else if(row !== undefined) {
          query = 'INSERT INTO answer(text, authorId, date, score, questionId) VALUES(?, ?, ?, ?, ?)';

          db.run(query, [answer.text, row.id, answer.date.toISOString(), answer.score, this.id], function(err) {
            if(err) reject(err);
            else resolve(this.lastID);
          });
        } else resolve('Author not available, check the inserted email');
      });
    });
  }

  // metodo per votare una risposta esistente, con up = +1 e down = -1 (5)
  this.voteAnswer = (answerId, value) => {
    return new Promise((resolve, reject) => {
      const query = 'UPDATE answer set SCORE = SCORE + ? WHERE id = ?';

      db.run(query, [value === 'up' ? 1 : value === 'down' ? -1 : 0, answerId], function(err) {
        if(err) reject(err);
        else resolve(this.changes);
      }); 
    });
  }
}

// Oggetto rappresentante le risposte (con le sue proprietà)
function Answer(id, text, email, date, score = 0) {
  this.id = id;
  this.text = text;
  this.email = email;
  this.score = score;
  this.date = dayjs(date);
}

// Oggetto rappresentante la lista di domande (con i suoi metodi)
function QuestionList() {

  // metodo per recuperare una singola Question dato il suo ID (1)
  this.getQuestion = (id) => {
    return new Promise((resolve, reject) => {
      const query = 'SELECT question.id, text, user.email, date FROM question, user WHERE question.id = ? AND question.authorId = user.id';

      db.get(query, [id], (err, row) => {
        if(err) reject(err);
        else {
          const question = new Question(row.id, row.text, row.email, row.date);
          resolve(question);
        }
      });
    });
  }

  // metodo per aggiungere una nuova Question di un autore esistente (2)
  this.addQuestion = (question) => {
    return new Promise((resolve, reject) => {
      let query = 'SELECT id FROM user WHERE email = ?';
      db.get(query, [question.email], (err, row) => {
        if(err) reject(err);
        else if(row !== undefined) {
          query = 'INSERT INTO question(text, authorId, date) VALUES(?, ?, ?)';

          db.run(query, [question.text, row.id, question.date.toISOString()], function(err) {
            if(err) reject(err);
            else resolve(this.lastID);
          });
        } else resolve('Author not available, check the inserted email');
      });
    });
  }
}

// funzione per il test
async function main() {
  const questionList = new QuestionList();

  // Add a new question
  const newQuestion = new Question(undefined, 'What is JavaScript?', 'luigi.derussis@polito.it', new Date());
  try {
    const questionId = await questionList.addQuestion(newQuestion);
    console.log(`New question added with ID: ${questionId}`);
  } catch (err) {
    console.error(`Error adding question: ${err}`);
  }

  // Get a question by ID
  try {
    const question = await questionList.getQuestion(1);
    console.log(`Question retrieved: ${question.text}`);
  } catch (err) {
    console.error(`Error retrieving question: ${err}`);
  }

  // Add an answer to a question
  const newAnswer = new Answer(undefined, 'JavaScript is a programming language.', 'stefano.zeta@email.it', new Date(), 0);
  try {
    const answerId = await questionList.getQuestion(1).then(question => question.addAnswer(newAnswer));
    console.log(`New answer added with ID: ${answerId}`);
  } catch (err) {
    console.error(`Error adding answer: ${err}`);
  }

  // Get answers for a question
  try {
    const answers = await questionList.getQuestion(1).then(question => question.getAnswers());
    console.log(`Answers retrieved: ${answers.map(answer => answer.text).join(', ')}`);
  } catch (err) {
    console.error(`Error retrieving answers: ${err}`);
  }

  // Vote an answer
  try {
    const changes = await questionList.getQuestion(1).then(question => question.voteAnswer(1, 'up'));
    console.log(`Answer voted, number of changes: ${changes}`);
  } catch (err) {
    console.error(`Error voting answer: ${err}`);
  }
}

main();