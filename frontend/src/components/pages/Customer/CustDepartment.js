import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import { base_url } from '../../../App';


function CustDepartment(props) {
  const {id, name} = props.departmentData
  const [countBook, setCountBook] = useState(0)

  useEffect(()=>{
    if (localStorage.getItem('access_token') !== null){
        (async()=>{
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
       <hr/>
      <Link to={`/departments/${id}/${name}/books/`}> {name} </Link>
    </Col>
    </>
  )
}

export default CustDepartment;
