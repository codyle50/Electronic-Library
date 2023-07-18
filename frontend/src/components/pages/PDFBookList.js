import React, {useContext, useEffect, useState} from 'react'
import Col from 'react-bootstrap/Col';
import {Link} from "react-router-dom";
import Row from 'react-bootstrap/Row';
import AuthContext from '../context/AuthContext';


function PDFBookList(props) {
  const { person } = useContext(AuthContext)
  const {id, title, image, file, author_name} = props.bookData
  const [count, setCount] = useState(0);

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
  };
  const fiveStars = [1,2,3,4,5]
  
  useEffect(() => {
    console.log("PDF book lists components effects")
  },[])

  return (
    <Row className="bookRow">
      <Col md={2} className='bookCoverDiv'>
          <img src={image} className='book-cover' alt='book-cover' /> 
      </Col>
      <Col md={9} className='book-info'>
        <h4>{title}:</h4> 
        By <i>{author_name}</i> Ratings:&nbsp;
        {fiveStars.map((stars) => (
          <i id={`${id}-star${stars}`} key={`stars${stars}_${id}`} className="fa-star fa-regular" onClick={handleStar}></i>)
          )} {count}/10
          <p className='buttonsDiv'>
            <Link className='btn lightButton' 
              to={`/books/${id}/pdf-view/`} 
              state={{file: file}}>Read
            </Link> &nbsp;
            {
              person.role === "librarian" || person.role === "Librarian"? 
                <Link className='btn lightButton' 
                  to={`/books/${id}/library-book/`} 
                  state={{book_id: id}}> Book Details
                </Link> 
              :
                <Link className='btn lightButton' 
                  to={`/books/${id}/book-detail/`} 
                  state={{book_id: id}}> Book Details
                </Link>
            }
          </p>
      </Col>
    </Row>
  )
}

export default React.memo(PDFBookList);
