// This component provides a modal form to upload pdf book
import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';


function PDFBookForm(props) {

  return (
    <>
      {/* here is modal for upload a new pdf book */}
      <Modal show={props.show} onHide={props.handleClose}>
          <Modal.Header closeButton className='modal-pdfbook'>
          <Modal.Title> {props.formData.heading} </Modal.Title>
          </Modal.Header>
          <Modal.Body className='modal-pdfbook'>
          <Form>
              <Form.Group className="mb-3" controlId="formGroupTitle">
                  <Form.Label>Title:</Form.Label>
                  <Form.Control
                  type="text"
                  name="name"
                  value={props.book.title}
                  onChange={props.handleChange} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formGroupDescription">
                  <Form.Label>Description:</Form.Label>
                  <Form.Control
                  type="text"
                  name="description"
                  value={props.book.description}
                  onChange={props.handleChange} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formGroupImage">
                  <Form.Label>Book's Image:</Form.Label>
                  <Form.Control
                  type="file"
                  name="image"
                  value={props.book.title}
                  onChange={props.handleChange} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formGroupFile">
                  <Form.Label>PDF Book file:</Form.Label>
                  <Form.Control
                  type="file"
                  name="file"
                  value={props.book.title}
                  onChange={props.handleChange} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formGroupAuthorName">
                  <Form.Label>Author's name:</Form.Label>
                  <Form.Control
                  type="text"
                  name="author_name"
                  value={props.book.title}
                  onChange={props.handleChange} />
              </Form.Group> 
          </Form>
          </Modal.Body>
          <Modal.Footer className='modal-department'>
          <button className='btn lightButton' onClick={props.handleClose}>
              Close
          </button>
          <button type='submit' className='btn darkButton' onClick={props.handleClose}>
              {props.formData.button}
          </button>
          </Modal.Footer>
      </Modal>
    </>
  )
}

export default PDFBookForm;
