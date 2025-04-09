import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { Container } from "react-bootstrap";

import { Question, Answer } from "./models/QAModels.mjs";
import NavHeader from "./components/NavHeader";
import QuestionDescription from "./components/QuestionDescription";
import Answers from "./components/Answers";

const fakeQuestion = new Question(1, "Is JavaScript better than Python?", "luigi.derussis@polito.it", 1, "2025-02-28");
fakeQuestion.init();
const fakeAnswers = fakeQuestion.getAnswers();

function App() {
  const [question, setQuestion] = useState(fakeQuestion);
  const [answers, setAnswers] = useState(fakeAnswers);

  const voteUp = (answerId) => {
    setAnswers(oldAnswers => {
      return oldAnswers.map(ans => {
        if(ans.id === answerId)
          return new Answer(ans.id, ans.text, ans.email, ans.userId, ans.date, ans.score +1);
        else
          return ans;
      });
    });
  }

  const addAnswer = (answer) => {
    setAnswers(oldAnswers => {
      // temporaneo
      const newId = Math.max(... oldAnswers.map(ans => ans.id)) + 1;
      const newAnswer = new Answer(newId, answer.text, answer.email, undefined, answer.date);
      return [...oldAnswers, newAnswer];
    });
  }

  const updateAnswer = (answer) => {
    setAnswers(oldAnswers => {
      return oldAnswers.map(ans => {
        if(ans.id === answer.id)
          return new Answer(answer.id, answer.text, answer.email, ans.userId, answer.date, ans.score);
        else
          return ans;
      });
    });
  }

  const deleteAnswer = (answerId) => {
    setAnswers(oldAnswers => {
      return oldAnswers.filter((answer) => answer.id !== answerId); 
    });
  }

  return (
    <>
      <NavHeader questionNum={question.id} />
      <Container fluid className="mt-3">
        <QuestionDescription question={question} />
        <Answers answers={answers} voteUp={voteUp} addAnswer={addAnswer} editAnswer={updateAnswer} deleteAnswer={deleteAnswer} />
      </Container>
    </>
  )

}

export default App;