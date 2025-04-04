import { useState } from "react";
import { Form, Button } from "react-bootstrap";

const FormAnswer = () => {
    const [text, setText] = useState('');
    const [email, setEmail] = useState('');
    const [date, setDate] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <Form onSubmit = {() => onSubmit()}>
            <Form.Group className = 'mb-3'>
                <Form.Label>Testo</Form.Label>
                <Form.Control type = 'text' required = {true} minLength = {2} value = {text} onChange = {(e) => setText(e.target.value)}/>
            </Form.Group>
            <Form.Group className = 'mb-3'>
                <Form.Label>Email</Form.Label>
                <Form.Control type = 'email' required = {true} value = {email} onChange = {(e) => setEmail(e.target.value)}/>
            </Form.Group>
            <Form.Group className = 'mb-3'>
                <Form.Label>Data</Form.Label>
                <Form.Control type = 'date' value = {date} onChange = {(e) => setDate(e.target.value)}/>
            </Form.Group>
            <Button variant = 'primary' type = 'submit' className = 'me-2'>Add</Button>
            <Button variant = 'danger'>Cancel</Button>
        </Form>
    );
}

export default FormAnswer;