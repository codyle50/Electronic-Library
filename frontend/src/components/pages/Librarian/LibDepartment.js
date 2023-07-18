import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import { base_url } from '../../../App';


function LibDepartment(props) {
  const {id, name} = props.departmentData
  const [countBook, setCountBook] = useState(0)
  
  const handleDelete = async() => {
    if (localStorage.getItem('access_token') !== null){
      if (window.confirm("Are you sure to delete your department") === true){
        await axios.delete(base_url +  `delete-department/${id}/`,
        {headers: {'Authorization': `Bearer ${localStorage.getItem('access_token')}`}})
        .then(response => {console.log(`Your department is deleted. ${response.status}`)})
        .catch(error => {console.log(error)});
      }
    }
  };

  useEffect(()=>{
    if (localStorage.getItem('access_token') !== null){
        (async() =>{
            await axios.get(base_url + `departments/${id}/book-list/`,
                {headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`}})
            .then(response => {setCountBook(response.data.length)})
            .catch(error => {console.log(error)});   
        })()
      }
  },[id])

  return (
    <>
    <Col md={3} className='department-box'>Books: {countBook}
      <h6><i className="fa-solid fa-pen-to-square" onClick={props.handleDepartModal} id={id}>
        </i> <i className="fa-solid fa-trash-can" id={id} onClick={handleDelete}></i>
      </h6>
       <hr/>
      <Link to={`/departments/${id}/${name}/library-books/`}> {name} </Link>
    </Col>
    </>
  )
}

export default LibDepartment;
