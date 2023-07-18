// The component consists a modal form to create a new department, and a PDFBookForm and PDFBookForm components

import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import { base_url } from '../../../App';
import {useParams} from "react-router-dom";
import PDFBookList from '../PDFBookList';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import HideShowContext from '../../context/HideShowContext';

function LibraryCollection() {
  const {d_id, name} = useParams();
  const {show, handleClose, handleShow} = useContext(HideShowContext)
  const [book, setBook] = useState({
    title: "", description: "", image: null, file: null, author_name: ""
  })
  const [bookLists, setBookLists] = useState([])
  
  // define functions
  const submitPDFBook = async(event) => {
    event.preventDefault()
    if (localStorage.getItem('access_token')){
      const data = new FormData()
      for (let key in book){
        data.append(key, book[key])
      }
      await axios.post(base_url + `departments/${d_id}/create-book/`, data, 
      {headers: {
        'content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`}})
      .then(response => {console.log(`Your request sent. ${response.status}`)})
      .catch(error => { console.log(error)});
    }
    handleClose()
    window.location.reload(true);
  };

  const handleChange = (event) => {
      const name = event.target.name;
      if (name === "image" || name === 'file') {
          setBook(values => ({...values, [name]: event.target.files[0]}))
      }else{
          setBook(values => ({...values, [name]: event.target.value}))
      }
  };

  useEffect(()=> {
    document.title ="PDF Books | Library";
    if (localStorage.getItem('access_token') !== null){
      axios.get(base_url + `departments/${d_id}/book-list/`,{headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`}})
      .then(response => {setBookLists(response.data)})
      .catch(error => {console.log(error)});
    }
  },[d_id, handleClose])


  // This is main function's return()
  return (
    <><hr/>
      <h2 className='bookCollectHead'> {name}:
        <small className='uploadPdf'> upload a new PDF Book 
          - <button className='btn darkButton' onClick={handleShow}>Create</button> 
        </small>
      </h2> 
      <div className='booklistDiv'>
        <h6> At the Top : Latest uploaded: <i className="fa-brands fa-gripfire"></i></h6>
        {
          bookLists && bookLists.slice(0).reverse().map(list => <PDFBookList key={`pdfBook_${list.id}`} bookData={list}/>)
        }
      </div>
      <p>This is for footer</p>

      {/* here is modal for upload a new pdf book */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton className='modal-pdfbook'>
          <Modal.Title> "Create A New PDF Book" </Modal.Title>
        </Modal.Header>
        <Modal.Body className='modal-pdfbook'>
          <Form encType='multipart/form-data'>
            <Form.Group className="mb-3" controlId="formGroupTitle">
              <Form.Label>Title:</Form.Label>
              <Form.Control
              type="text"
              name="title"
              value={book.title}
              onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupDescription">
                <Form.Label>Description:</Form.Label>
                <Form.Control as="textarea" rows={8} name="description"
                value={book.description}
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

export default LibraryCollection;
