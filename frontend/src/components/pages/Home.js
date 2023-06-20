import React from 'react';
import Button from 'react-bootstrap/Button';
import { Outlet, Link } from "react-router-dom";

function Home() {
  return (
    <div className='row homeDiv'>
      <div className='col-6'>
        <h1>Library Management System</h1>
        <p className='center-text'>A library management system is used to maintain library records. It tracks the records of the 
          number of books in the library, how many books are issued, or how many books have been returned 
          or renewed or late fine charges, etc.<br/>
          You can find books in an instant, issue/reissue books quickly, and manage all the data efficiently 
          and orderly using this system. The purpose of a library management system is to provide instant and 
          accurate data regarding any type of book, thereby saving a lot of time and effort.
        </p>
        <p>
          <Button className='darkButton'>See More</Button> &nbsp;
          <Link to="/login"><Button className='darkButton'>Log In</Button></Link>
        </p>
      </div>
      <div className='col-6'>
      
      </div>
      <Outlet/>
    </div> 
  )
}

export default Home;
