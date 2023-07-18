import React, { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import { Outlet, Link } from "react-router-dom";
import '../css/all_pages.css'
import AuthContext from '../context/AuthContext';

function Home() {
  const {isAuth} = useContext(AuthContext)
  
  return (
    <div className='row homeDiv'>
      <div className="col-6 introduction">
        <h1>E-Library</h1>
        <p className='center-text'>A digital library, also known as an e-library, is a collection of documents in 
        an organized digital form, available on the internet or on disks. The purpose of an e-library is to store, 
        access and update departments and related digital books in PDF format. Here, various books can be created 
        or update easily, which helps keep information up-to-date. <br/>
        E-libraries offer free copies of books to customers.Instant availability of these resources helps users save 
        time, prioritize other tasks, and store the found resources for future use. This E-library is an advantage for 
        making a free-public library and can also read and store books freely.
        </p>
        <p>
          {!isAuth? <Link to="/login"><Button className='darkButton'>Log In</Button></Link> : ""}
        </p>
      </div>
      <div className='col-6 e-librayPic'>
        <img src={'/images/e-library.png'} alt='E-Library' className='homeImage' />
      </div>
      <Outlet/>
    </div> 
  )
}

export default Home;
