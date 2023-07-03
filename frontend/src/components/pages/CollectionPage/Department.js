import React, {useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';


function Department() {

  const [show, setShow] = useState(false);
  const [department, setDepartment] = useState({
    "name": ""
  })

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleDelete = () => {
    window.confirm("Are you sure to delete your department");
  }

  return (
    <>
    <small className='department-box'>Books: {0}
      <h6><i className="fa-solid fa-pen-to-square" id='Edit' onClick={handleShow}>
        </i> <i className="fa-solid fa-trash-can" id='Delete' onClick={handleDelete}></i>
      </h6> <hr/>
      <a href="department/books"> This is my department</a> 
    </small>

    {/* here is modal for update department */}
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton className='modal-department'>
          <Modal.Title>Update Department's Name</Modal.Title>
        </Modal.Header>
        <Modal.Body className='modal-department'>
          <Form>
            <Form.Label> Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={department.name}
              onChange={(e)=> setDepartment(e.target.value)} />
          </Form>
        </Modal.Body>
        <Modal.Footer className='modal-department'>
          <button className='btn lightButton' onClick={handleClose}>
            Close
          </button>
          <button className='btn darkButton' onClick={handleClose}>
            update
          </button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Department;
