import React, {useEffect} from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../css/profile.css';



function Profile() {

  useEffect(()=>{
    document.title ="Profile | Library";
  }, [])

  return (
    <div className='homeDiv'> 
      <Row className='profileRow'>
        <Col md={3} className='profileDiv'>
        <img src='/images/User-Profile.png' className='profile-pic' alt='user-profile' />
          <form>
            <input type='file' />
            <button type='submit' className='btn darkButton'> <i className="fa-solid fa-camera-retro"></i> upload</button>
          </form> 
        </Col>
        <Col md={8} className='profile-info'>
          <Row>Name:</Row>
          <Row>Role:</Row>
          <Row>Library Name:</Row>
          <Row>Qualification:</Row>
          <Row>Username:</Row>
          <Row>Email:</Row>
          <Row>
            {0} Departments
          </Row>
          
        </Col>
      </Row>
    </div>
  )
}

export default Profile
