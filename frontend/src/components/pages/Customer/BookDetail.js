import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { base_url } from '../../../App';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


function BookDetail() {
  let { state } = useLocation();
  const [book, setBook] = useState({})

  useEffect(()=> {
    document.title ="Book Detail | Library";
    if (localStorage.getItem('access_token') !== null){
      (async()=>{
        await axios.get(base_url + `update-book/${state.book_id}/`, 
          {headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`}})
        .then(response => {setBook(response.data)})
        .catch(error => { console.log(error)});
      })()
    }
    
  },[])

  return (
    <>  
    <Row className='bookDetailDiv'>
    <h3> {book.title} </h3>
      <Col md={4} className='bookImageCol'>
        <img src={book.image} alt='pdfbook'/>
      </Col>
      
      <Col md={7} className='bookInfoCol'>
        This book is written by <b>{book.author_name}</b>. &nbsp;
        
        <p className='bookDescript'><b>Description: </b> {book.description} </p>
      </Col>
      
    </Row>
    </>
  )
}

export default React.memo(BookDetail);

