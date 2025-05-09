import { Row, Col } from "react-bootstrap";
import { Link } from "react-router";

function Questions(props) {

  return (
    <>
      <Row>
        <Col>
          <h1>Welcome to HeapOverrun!</h1>
          <p className="lead">We have {props.questions.length} questions available.</p>
        </Col>
      </Row>
      <Row>
        <dl>
          {
            props.questions.map((q) => <QuestionItem question={q} key={q.id}/>)
          }
        </dl>
      </Row>
    </>
  );
}

function QuestionItem(props) {

  return (
    <>
      <dt>Question #{props.question.id}: <Link to={`/questions/${props.question.id}`}>{props.question.text}</Link></dt>
      <dd>Asked by {props.question.email} on {props.question.date.format('YYYY-MM-DD')}</dd>
    </>
  );
}

export default Questions;