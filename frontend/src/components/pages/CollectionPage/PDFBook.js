// The component consists a modal form to create a new department, and a PDFBookForm and PDFBookForm components

import React, {useState} from 'react';
import PDFBookList from './PDFBookList';
import PDFBookForm from './PDFBookForm';


function PDFBook() {
  
  // declare variables
  const [show, setShow] = useState(false);
  const [book, setBook] = useState({
    "title": "",
    "description": "",
    "image": null,
    "file": null,
    "author_name": ""
  })
  const [formData, setFormData] = useState({
    "heading": "",
    "button": ""
  })
  
  // define functions
  const handleClose = () => setShow(false);
  const handleShow = (event) => {
    setShow(true)
    if (event.currentTarget.id === "CreatePDFBook") { 
      setFormData({heading: "Create A New PDF Book", button: "Create"})
    }
    if (event.currentTarget.id === "UpdatePDFBook") {
      setFormData({heading: "Update The PDF Book", button: "Update"})
    }   
  };

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setBook(values => ({...values, [name]: value}))
  }
  const data ={book:book, show:show, formData: formData, handleChange:handleChange, handleClose:handleClose}
  
  // This is main function's return()
  return (
    <>
      <h3> My Department:
        <small className='uploadPdf'> upload a new PDF Book 
          - <button className='btn darkButton' onClick={handleShow} id="CreatePDFBook">Create</button> 
        </small>
      </h3>
      <PDFBookList handleShow={handleShow} />
      <PDFBookForm {...data} />
    </>
  )
}

export default PDFBook;
