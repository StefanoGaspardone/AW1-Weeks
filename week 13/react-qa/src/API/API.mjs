import { Answer, Question } from "../models/QAModels.mjs";

const SERVER_URL = "http://localhost:3001";

// tutte le domande
// GET /api/questions
const getQuestions = async () => {
  const response = await fetch(SERVER_URL + "/api/questions");
  if(response.ok) {
    const questionsJson = await response.json();
    return questionsJson.map(q => new Question(q.id, q.text, q.email, q.userId, q.date));
  }
  else
    throw new Error("Internal server error");
}

// tutte le risposte di una certa domanda
// GET /api/questions/<id>/answers
const getAnswers = async (questionId) => {
  const response = await fetch(`${SERVER_URL}/api/questions/${questionId}/answers`);
  if(response.ok) {
    const answersJson = await response.json();
    return answersJson.map(ans => new Answer(ans.id, ans.text, ans.email, ans.userId, ans.date, ans.score));
  }
  else
    throw new Error("Ops, there is an error on the server.");
}

// vota una certa risposta
// POST /api/answers/<id>/vote
const voteUp = async (answerId) => {
  const response = await fetch(`${SERVER_URL}/api/answers/${answerId}/vote`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({vote: "up"}),
    credentials: 'include'
  });

  // TODO: migliorare gestione errori
  if(!response.ok) {
    const errMessage = await response.json();
    throw errMessage;
  }
  else return null;
}

// aggiungi una nuova risposta
// POST /api/questions/<id>/answers
const addAnswer = async (answer, questionId) => {
  const response = await fetch(`${SERVER_URL}/api/questions/${questionId}/answers`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({text: answer.text, email: answer.email, userId: answer.userId, score: 0, date: answer.date}),
    credentials: 'include'
  });

  // TODO: migliorare gestione errori
  if(!response.ok) {
    let errMessage = await response.json();
    if(response.status === 422)
      errMessage = `${errMessage.errors[0].msg} for ${errMessage.errors[0].path}.`
    else
      errMessage = errMessage.error;
    throw errMessage;
  }
  else return null;
}

// modifica una risposta esistente
// PUT /api/answers/<id>
const updateAnswer = async (answer) => {
  const response = await fetch(`${SERVER_URL}/api/answers/${answer.id}`, {
    method: "PUT",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({text: answer.text, email: answer.email, userId: answer.userId, score: answer.score, date: answer.date}),
    credentials: 'include'
  });

  // TODO: migliorare gestione errori
  if(!response.ok) {
    let errMessage = await response.json();
    if(response.status === 422)
      errMessage = `${errMessage.errors[0].msg} for ${errMessage.errors[0].path}.`
    else
      errMessage = errMessage.error;
    throw errMessage;
  }
  else return null;
}

const logIn = async (credentials) => {
  const response = await fetch(SERVER_URL + '/api/sessions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(credentials),
  });
  if(response.ok) {
    const user = await response.json();
    return user;
  }
  else {
    const errDetails = await response.text();
    throw errDetails;
  }
};

const getUserInfo = async () => {
  const response = await fetch(SERVER_URL + '/api/sessions/current', {
    credentials: 'include',
  });
  const user = await response.json();
  if (response.ok) {
    return user;
  } else {
    throw user;  // an object with the error coming from the server
  }
};

const logOut = async() => {
  const response = await fetch(SERVER_URL + '/api/sessions/current', {
    method: 'DELETE',
    credentials: 'include'
  });
  if (response.ok)
    return null;
}

const API = { getAnswers, getQuestions, voteUp, addAnswer, updateAnswer, logIn, getUserInfo, logOut };
export default API;