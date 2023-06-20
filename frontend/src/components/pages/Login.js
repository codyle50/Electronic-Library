import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import '../css/form.css';
import React from 'react';

function Login() {
  return (
    <div className='form-cover'>
      <Form className='form-page login-form'>
      <h1>Login Form</h1>
      <Form.Group className="mb-3" controlId="formGroupEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formGroupPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>
      <div className='buttonDiv'>
        <Button className='darkButton' type="submit">
          Submit
        </Button>
      </div>
    </Form>
    </div>
  );
}

export default Login;