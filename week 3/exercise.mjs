import dayjs from "dayjs";
import sqlite from "sqlite3";

const db = new sqlite.Database('questions.sqlite', (err) => {
  if(err) throw err;
});

// Oggetto rappresentante le domande (con le sue proprietà e metodi)
function Question(id, text, email, userId, date) {
  this.id = id;
  this.text = text;
  this.email = email;
  this.userId = userId;
  this.date = dayjs(date);

  // metodo per prendere tutte le risposte della Question instanziata (3)
  this.getAnswers = () => {
    return new Promise ((resolve, reject) => {
      const query = 'SELECT answer.*, user.email FROM answer, user WHERE answer.authorId = user.id AND answer.questionId = ?';

      db.all(query, [this.id], (err, rows) => {
        if(err) reject(err);
        else {
          const answers = rows.map((ans) => new Answer(ans.id, ans.text, ans.email, ans.authorId, ans.date, ans.score));
          resolve(answers);
        }
      });
    });
  }

  // metodo per aggiungere una nuova risposta di un autore esistente alla Question instanziata (4)
  this.addAnswer = (answer) => {
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO answer(text, authorId, date, score, questionId) VALUES(?, ?, ?, ?, ?)';

      db.run(query, [answer.text, answer.userId, answer.date.toISOString(), answer.score, this.id], function (err) {
        if(err) reject(err);
        else resolve(this.lastID);
      });
    });
  }

  // metodo per votare una risposta esistente, con up = +1 e down = -1 (5)
  this.voteAnswer = (answerId, value) => {
    return new Promise((resolve, reject) => {
      const query = 'UPDATE answer SET score = score + ? WHERE id = ?';
      const delta = value === 'up' ? 1 : -1;

      db.run(query, [delta, answerId], function(err) {
        if(err) reject(err);
        else resolve(this.changes);
      });
    });
  }
}

// Oggetto rappresentante le risposte (con le sue proprietà)
function Answer(id, text, email, userId, date, score = 0) {
  this.id = id;
  this.text = text;
  this.email = email;
  this.userId = userId;
  this.score = score;
  this.date = dayjs(date);
}

// Oggetto rappresentante la lista di domande (con i suoi metodi)
function QuestionList() {

  // metodo per recuperare una singola Question dato il suo ID (1)
  this.getQuestion = (id) => {
    return new Promise ((resolve, reject) => {
      const sql = 'SELECT question.*, user.email FROM question, user WHERE question.authorId = user.id AND question.id = ?';
      
      db.get(sql, [id], (err, row) => {
        if(err) reject(err);
        else if(row!== undefined) resolve(new Question(row.id, row.text, row.email, row.authorId, row.date));
        else resolve('Question not available, check the inserted id.');
      });
    });
  }

  // metodo per aggiungere una nuova Question di un autore esistente (2)
  this.addQuestion = (question) => {
    return new Promise((resolve, reject) => {
      const sql = 'INSERT INTO question(text, authorId, date) VALUES(?, ?, ?)';

      db.run(sql, [question.text, question.userId, question.date.toISOString()], function(err) {
        if(err) reject(err);
        else resolve(this.lastID);
      });
    });
  }
}

// funzione per il test
async function main() {
  const ql = new QuestionList();

  const firstQuestion = await ql.getQuestion(1);
  console.log(firstQuestion);
  
  console.log(await firstQuestion.getAnswers());
  const newAnswerId = await firstQuestion.addAnswer(new Answer(undefined, "test", "luigi.derussis@polito.it", 1, dayjs()));
  console.log("ID OF THE NEW ANSWER: " + newAnswerId);
  console.log("# OF CHANGES DUE TO THE VOTE: " + await firstQuestion.voteAnswer(newAnswerId, "up"));
  console.log(await firstQuestion.getAnswers());

  const newQuestionId = await ql.addQuestion(new Question(undefined, "Is 1 bigger than 10?", "luigi.derussis@polito.it", 1, dayjs()));
  const newQuestion = await ql.getQuestion(newQuestionId);
  console.log("NEWLY ADDED QUESTION: " + newQuestion.text);
  console.log(await newQuestion.getAnswers());

}

main();