import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import '../css/form.css';
import React from 'react';
import { useState } from "react";


function Signup() {
    const [data, setData] = useState({
        "first_name":"",
        "last_name": "",
        "email": "",
        "username": "",
        "password1": "",
        "password2": "",
        "role": "",
        "highest_qualification": "",
        "store_name": ""
    })

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(values => ({...values, [name]: value}))
      }

  return (
    <div className='form-cover'>
      <Form className='form-page' method='post'>
      <h1>Join Us</h1>
      <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridFirstName" className="mb-3">
                <Form.Label>First Name*</Form.Label>
                <Form.Control
                    type="text"
                    name="first_name"
                    value={data.first_name}
                    onChange={handleChange} />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridLastName" className="mb-3">
                <Form.Label>Last Name*</Form.Label>
                <Form.Control 
                    type="text"
                    name='last_name'
                    value={data.last_name}
                    onChange={handleChange} />
            </Form.Group>
        </Row>
        <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridEmail" className="mb-3">
                <Form.Label>Email*</Form.Label>
                <Form.Control
                    type="email"
                    name="email"
                    value={data.email}
                    placeholder="Enter email"
                    onChange={handleChange} />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridUsername" className="mb-3">
                <Form.Label>Username*</Form.Label>
                <Form.Control 
                    type="text"
                    name='username'
                    value={data.username}
                    placeholder="Enter username"
                    onChange={handleChange} />
            </Form.Group>
        </Row>
        
        <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridPassword1" className="mb-3">
                <Form.Label>Password*</Form.Label>
                <Form.Control
                    type="password"
                    name='password1'
                    value={data.password1}
                    placeholder="Password"
                    onChange={handleChange} />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridPassword2" className="mb-3">
                <Form.Label>Confirm Password*</Form.Label>
                <Form.Control 
                    type="password"
                    name='password2'
                    value={data.password2}
                    placeholder="re-password"
                    onChange={handleChange} />
            </Form.Group>
        </Row>
      
        <Row className="mb-3">
            <Form.Group as={Col} className="mb-3" controlId="formGridRole">
                <Form.Label>Account Role as*</Form.Label>
                <Form.Control
                    type="text"
                    name='role'
                    value={data.role}
                    placeholder="Type Librarian or Customer"
                    onChange={handleChange} />
            </Form.Group>

            <Form.Group as={Col} className="mb-4" controlId="formGridQualification">
                <Form.Label>Highest Qualification*</Form.Label>
                <Form.Control 
                    type="text"
                    name='highest_qualification'
                    value={data.highest_qualification}
                    placeholder="Eg: 12th, BSc etc.."
                    onChange={handleChange} />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridStore">
                <Form.Label>Library or Institute name*</Form.Label>
                <Form.Control 
                    type="text"
                    name='store_name'
                    value={data.store_name}
                    onChange={handleChange} />
            </Form.Group>
        </Row>

      <div className='buttonDiv'>
        <Button className='darkButton' type="submit">
            Submit
        </Button>
      </div>
    </Form>

    </div>
    
  );
}

export default Signup;