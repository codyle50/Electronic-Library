import React, {useEffect, useState, useContext} from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Department from './CollectionPage/Department';
import '../css/all_pages.css';


function Collection(props) {
  console.log(props.userId)
  
  useEffect(()=>{
    document.title ="Collection | Library";
  },[])

  const [show, setShow] = useState(false);
  const [department, setDepartment] = useState({
    "name": ""
  })

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  

  return (
    <div>
     <h5 className='departmentName'>Create your collection of departments - <button className='btn darkButton' onClick={handleShow}>Create</button> </h5>
     
     {/* here is modal for create a new department */}
     <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton className='modal-department'>
          <Modal.Title>Create a New Department</Modal.Title>
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
            create
          </button>
        </Modal.Footer>
      </Modal>

      <div className='departmentDiv'>
        <Department/>
      </div>
    </div>
  )
}

export default Collection;
