import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { Container } from "react-bootstrap";

import { Question } from "./models/QAModels.mjs";
import NavHeader from "./components/NavHeader";
import QuestionDescription from "./components/QuestionDescription";
import Answers from "./components/Answers";

const fakeQuestion = new Question(1, "Is JavaScript better than Python?", "luigi.derussis@polito.it", 1, "2025-02-28");
fakeQuestion.init();
const fakeAnswers = fakeQuestion.getAnswers();

function App() {
  const [question, setQuestion] = useState(fakeQuestion);
  const [answers, setAnswers] = useState(fakeAnswers);

  return (
    <>
      <NavHeader questionNum={question.id} />
      <Container fluid className="mt-3">
        <QuestionDescription question={question} />
        <Answers answers={answers} setAnswers={setAnswers} />
      </Container>
    </>
  )

}

export default App;