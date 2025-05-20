import { useActionState } from "react";
import { Form, Button, Alert, Row, Col } from "react-bootstrap";
import dayjs from "dayjs";
import { useNavigate, useParams, useLocation, Link } from "react-router";
import API from "../API/API.mjs";

export function EditAnswerForm(props) {
  /*
  // 1. metodo con i useParams
  const params = useParams();
  const aId = params.answerId;

  // trovo la risposta da modificare
  const answer = props.answers.filter(ans => ans.id == aId)[0];
  */
  
  // 2. metodo con useLocation
  const location = useLocation();
  const answer = location.state;
  // back to dayjs
  answer.date = dayjs(answer.date);
 
  if(answer)
    return <AnswerForm answer={answer} editAnswer={props.editAnswer} />
  else {
    return (
      <Row>
        <Col as="p" className="lead">Impossible to edit an non-existent answer!</Col>
      </Row> 
    );
  }
  
}

export function AnswerForm(props) {

  const navigate = useNavigate();
  const { questionId } = useParams();
  
  const initialState = {
    text: props.answer?.text,
    email: props.answer?.email,
    date: props.answer?.date.format("YYYY-MM-DD") ?? dayjs().format("YYYY-MM-DD")
  };
  
  const handleSubmit = async (prevState, formData) => {
    // creo un oggetto {} dal FormData
    const answer = Object.fromEntries(formData.entries());

    // esempio di validazione
    if(answer.text.trim() === "") {
      answer.error = "The answer can't be empty, please fix it!";
      return answer;
    }
    
    if(props.addAnswer)
      // aggiungo la risposta
      try {
        await API.addAnswer({...answer, userId: 1}, questionId);
      }
      catch(serverError) {
        answer.error = serverError;
        return answer;
      }
    else
      await API.updateAnswer({id: props.answer.id, ...answer, userId: props.answer.userId, score: props.answer.score});

    navigate(`/questions/${questionId}`);
  }

  const [state, formAction, isPending] = useActionState(handleSubmit, initialState);

  return(
    <>
      <Row>
        <Col as="p" className="mt-3"><strong>Your Answer:</strong></Col>
      </Row>
      { state.error && <Alert variant="secondary">{state.error}</Alert> }
      { isPending && <Alert variant="warning">Please, wait for the server's response...</Alert> }
      <Form action={formAction}>
        <Form.Group className="mb-3">
          <Form.Label>Text</Form.Label>
          <Form.Control name="text" type="text" required={true} minLength={2} defaultValue={state.text}></Form.Control>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>email</Form.Label>
          <Form.Control name="email" type="email" required={true} defaultValue={state.email}></Form.Control>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Date</Form.Label>
          <Form.Control name="date" type="date" required={true} min={dayjs().format("YYYY-MM-DD")} defaultValue={state.date}></Form.Control>
        </Form.Group>
        { props.addAnswer && <Button variant="primary" type="submit" disabled={isPending}>Add</Button> }
        { props.editAnswer && <Button variant="success" type="submit" disabled={isPending}>Update</Button> }
        {" "}
        <Link className="btn btn-danger" to={`/questions/${questionId}`}>Cancel</Link>
      </Form>
    </>
  );
}