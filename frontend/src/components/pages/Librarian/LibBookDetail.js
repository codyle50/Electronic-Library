import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { base_url } from '../../../App';
import HideShowContext from '../../context/HideShowContext';
import Row from 'react-bootstrap/Row';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';


function LibBookDetail() {
  let { state } = useLocation();
  const { show, handleClose, handleShow } = useContext(HideShowContext)
  
  const [bookDetail, setBookDetail] = useState([])
  const [book, setBook] = useState({
    title: "", description: "", image: "", file: "", author_name: ""
  });
  
  const submitPDFBook = async(event) => {
    event.preventDefault()
    if (localStorage.getItem('access_token') !== null){
      const data = new FormData()
      for (let key in book){
        data.append(key, book[key])
      }
      await axios.put(base_url + `update-book/${state.book_id}/`, data, 
        {headers: {
            'Content-Type': 'multipart/form-data', 
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`}})
      .then(response => {
        console.log(`Your request sent. ${response.status}`)
      })
      .catch(error => { console.log(error)});
    }
    handleClose()
  };
  

  const handleChange=(event)=>{
    const name = event.target.name;
    if (name === "image" || name === 'file') {
      setBook(values =>({...values, [name]: event.target.files[0]}))
    }else{
      setBook(values => ({...values, [name]: event.target.value}))
    }  
  };

  useEffect(()=> {
    document.title ="Book Detail | Library";
    if (localStorage.getItem('access_token') !== null){
      (async()=>{
        await axios.get(base_url + `update-book/${state.book_id}/`, 
          {headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`}})
        .then(response => {setBookDetail(response.data)})
        .catch(error => { console.log(error)});
      })()
    }
    
  },[handleClose])

  return (
    <>  
    <Row className='bookDetailDiv'>
    <h3> {bookDetail.title} </h3>
      <Col md={4} className='bookImageCol'>
        <img src={bookDetail.image} alt='pdfbook'/>
      </Col>
      
      <Col md={7} className='bookInfoCol'>
        This book is written by <b>{bookDetail.author_name}</b>. &nbsp;
        
        <button className='btn lightButton' onClick={handleShow}>Update Book</button>
        
        <p className='bookDescript'><b>Description: </b> {bookDetail.description} </p>
      </Col>
      
    </Row>
    
    {/* here is modal for upload pdf book */}
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton className='modal-pdfbook'>
          <Modal.Title> Update PDF Book </Modal.Title>
        </Modal.Header>
        <Modal.Body className='modal-pdfbook'>
          <Form encType='multipart/form-data'>
            <Form.Group className="mb-3" controlId="formGroupTitle">
              <Form.Label>Title:</Form.Label>
              <Form.Control
              type="text"
              name="title"
              placeholder={bookDetail.title}
              value={book.title}
              onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupDescription">
                <Form.Label>Description:</Form.Label>
                <Form.Control as="textarea" rows={8} name="description"
                value={book.description === ""? bookDetail.description : book.description}
                onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupImage">
                <Form.Label>Book's Image:</Form.Label>
                <Form.Control
                type="file"
                name="image"
                onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupFile">
                <Form.Label>PDF Book file:</Form.Label>
                <Form.Control
                type="file"
                name="file"
                onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupAuthorName">
                <Form.Label>Author's name:</Form.Label>
                <Form.Control
                type="text"
                name="author_name"
                placeholder={bookDetail.author_name}
                value={book.author_name}
                onChange={handleChange} />
            </Form.Group> 
          </Form>
        </Modal.Body>
        <Modal.Footer className='modal-department'>
          <button type='submit' className='btn lightButton' onClick={submitPDFBook}>
              upload
          </button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default React.memo(LibBookDetail);

