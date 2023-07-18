// This component provides a modal form to update person's profile details
import React, {useContext, useEffect, useState} from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import HideShowContext from '../context/HideShowContext';
import AuthContext from '../context/AuthContext';


function ProfileForm(props) {
    const {show, handleClose} = useContext(HideShowContext)
    const { person } = useContext(AuthContext)
    const [updatePerson ,setUpdatePerson] = useState({
        first_name : person.first_name,
        last_name: person.last_name,
        email: person.email,
        username: person.username,
        role: person.role,
        store_name: person.store_name,
        highest_qualification: person.highest_qualification
    })

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        let updateObj = person
        setUpdatePerson({...updateObj, [name]: value})
    };
    useEffect(()=>{
        console.log("Update data")
    },[])

  return (
    <>
        <Modal show={show} onHide={handleClose} >
          <Modal.Header closeButton className='modal-pdfbook'>
          <Modal.Title> Update Your Profile </Modal.Title>
          </Modal.Header>
          <Modal.Body className='modal-pdfbook'>
          <Form >
            <Form.Group controlId="formGridFirstName" className="mb-3">
                <Form.Label>First Name*</Form.Label>
                <Form.Control
                    type="text"
                    name="first_name"
                    value={updatePerson.first_name}
                    onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="updateLastName" className="mb-3">
                <Form.Label>Last Name*</Form.Label>
                <Form.Control 
                    type="text"
                    name='last_name'
                    value={updatePerson.last_name}
                    onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="updateEmail" className="mb-3">
                <Form.Label>Email*</Form.Label>
                <Form.Control
                    type="email"
                    name="email"
                    value={updatePerson.email}
                    onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="updateUsername" className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control 
                    type="text"
                    name='username'
                    value={updatePerson.username} />
            </Form.Group>
    
            <Form.Group className="mb-3" controlId="updateRole">
                <Form.Label>Account Role as*</Form.Label>
                <Form.Control
                    type="text"
                    name='role'
                    value={updatePerson.role}
                    onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-4" controlId="updateQualification">
                <Form.Label>Highest Qualification*</Form.Label>
                <Form.Control 
                    type="text"
                    name='highest_qualification'
                    value={updatePerson.highest_qualification}
                    onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="updateStore">
                <Form.Label>Library or Institute name*</Form.Label>
                <Form.Control 
                    type="text"
                    name='store_name'
                    value={updatePerson.store_name}
                    onChange={handleChange} />
            </Form.Group>
        </Form>
          
          </Modal.Body>
          <Modal.Footer className='modal-department'>
          <button className='btn lightButton' onClick={handleClose}>
              Close
          </button>
          <button type='submit' className='btn darkButton' onClick={()=> props.updateAccount(updatePerson)}>
              Update
          </button>
          </Modal.Footer>
      </Modal>
    </>
  )
}

export default ProfileForm;