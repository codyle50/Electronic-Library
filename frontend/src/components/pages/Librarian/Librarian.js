import React, {useContext, useEffect, useState} from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { base_url } from '../../../App';
import HideShowContext from '../../context/HideShowContext';
import Row from 'react-bootstrap/Row';
import LibDepartment from './LibDepartment';


function Librarian() {
  const {show, handleClose, handleShow} = useContext(HideShowContext)
  const [departName, setDepartName] = useState('')
  const [departModal, setDepartModal] = useState({})
  const [departList, setDepartList] = useState([])

  const handlesubmit = () => {
    if (localStorage.getItem('access_token') !== null){
      if (departName !== '') {
        axios.post(base_url + 'create-department/', {name:departName}, 
        {headers: {
          'Content-Type': 'application/json', 
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`}})
        .then(response => {console.log(`Your department is created. ${response.status}`)})
        .catch(error => { console.log(error)});
      } else {
        alert("Name should not be blank. Please enter the department name.")
      }
    }
    handleClose()
    window.location.reload(true);
  };

  const updateDepartment =async(event)=> {
    if (localStorage.getItem('access_token') !== null){
      if (departName !== '') {
        await axios.put(base_url + `update-department/${event.currentTarget.id}/`, {name: departName},
        {headers: {
          'Content-Type': 'application/json', 
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`}})
        .then(response => {console.log(`Your department is updated. ${response.status}`)})
        .catch(error => {console.log(error)});
      } else {
        alert("Name should not be blank. Please update your department name.")
      }
    }
    handleClose()
    
  };

  const handleDepartModal =(event) =>{
    if (event.currentTarget.id === 'CreateDepartmentID'){
      setDepartModal({modalBtn: 'Create', headTitle: "Create a New Department"})
    } else{
      setDepartModal({modalBtn: 'update', 
        headTitle: "Update Your Department", 
        editName: departList[(event.currentTarget.id - 1)].name,
        btn_ID: departList[(event.currentTarget.id - 1)].id})
    }
    handleShow()
  };

  useEffect(()=>{
    console.log("librarian effect")
    if (localStorage.getItem('access_token') !== null){
        axios.get(base_url + 'librarian-departments/',
          {headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`}})
        .then(response => { setDepartList(response.data)})
        .catch(error => {console.log(error)});
      }
  },[handleClose])

  return (
    <>
     <h5 className='departmentName'>
      Create your collection of departments - <button id='CreateDepartmentID' className='btn darkButton' onClick={handleDepartModal}>Create</button> 
      </h5>

      <Row className='departmentDiv'>
        {
          departList? departList.slice(0).reverse().map(list => <LibDepartment key = {`depart_${list.id}`} 
          departmentData={list}
          handleClose={handleClose}
          handleDepartModal={handleDepartModal} />) : ""
        } 
      </Row>
     
     {/* here is modal for create a new department */}
     <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton className='modal-department'>
          <Modal.Title>{departModal.headTitle} </Modal.Title>
        </Modal.Header>
        <Modal.Body className='modal-department'>
          <Form>
            <Form.Label> Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              placeholder={departModal.modalBtn === "Create"? "" : departModal.editName}
              value={departName}
              onChange={(e)=> setDepartName(e.target.value)} />
          </Form>
        </Modal.Body>
        <Modal.Footer className='modal-department'>
          <button className='btn lightButton' onClick={handleClose}>
            Close
          </button>
          <button className='btn darkButton' 
            id={departModal.modalBtn === "Create"? "CreateBtnID" : departModal.btn_ID}
            onClick={departModal.modalBtn === "Create"? handlesubmit : updateDepartment}>
            {departModal.modalBtn}
          </button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default React.memo(Librarian);
