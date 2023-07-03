import React, {useState} from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


function PDFBookList(props) {

  const [count, setCount] = useState(0)

  function handleStar(event){
    const star_icon = document.getElementById(event.currentTarget.id)
    if (star_icon.className === "fa-star fa-regular") {
      star_icon.classList.add("fa-solid");
      star_icon.classList.remove("fa-regular");
      if (count >=0) {
        setCount(count + 2)
      }
    }
    else {
      star_icon.classList.add("fa-regular");
      star_icon.classList.remove("fa-solid");
      if (count >=2) {
        setCount(count - 2)
      }
    }
  }
  const fiveStars = [1,2,3,4,5]
  return (
    <>
      <Row className='bookListRow'>
        <Col md={2} className='bookCoverDiv'>
            <img src='/images/book-cover.jpg' className='book-cover' alt='book-cover' /> 
        </Col>
        <Col md={9} className='book-info'>
          <ul>
            <li> <h4>Title:</h4> By <i>Author's Name.</i> Ratings:&nbsp;
              {fiveStars.map((stars) => (
                <i id={`fa-star${stars}`} className="fa-star fa-regular" onClick={handleStar}></i>)
                )} {count}/10
            </li>
            
            <li><b>Description: </b>
              <p> Removes a class from an element’s list of classes. If class does not exist in the element's list of classes, it will not throw an error or exception.</p>
            </li>
            
            <li>
              <a href='' target='_blank'><button className='btn lightButton'>Read</button></a> &nbsp;
              <button className='btn lightButton'>Download</button> &nbsp;
              <button className='btn lightButton' id="UpdatePDFBook" onClick={props.handleShow}>Update book</button>
            </li>
          </ul>
            
        </Col>
      </Row>
    </>
  )
}

export default PDFBookList
