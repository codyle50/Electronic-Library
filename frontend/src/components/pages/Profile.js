import React, {useContext, useEffect, useState} from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../css/profile.css';
import axios from 'axios';
import { base_url } from '../../App';
import ProfileForm from './ProfileForm';
import HideShowContext from '../context/HideShowContext';
import AuthContext from '../context/AuthContext';

function Profile() {
  const { person } = useContext(AuthContext)
  const {show, handleClose, handleShow} = useContext(HideShowContext)
  const [successMsg, setSuccessMsg] = useState('')
  const [selectFile, setSelectFile] =useState()
  const [proFile, setProFile] = useState()
  const [totalDepart, setTotalDepart] =useState(0)
  const [totalBooks, setTotalBooks] = useState(0)
  
  const hideSuccessMsg=(msg)=>{
      msg.style.display = "none";
  };

  const getProfileImage =() => {
    if (localStorage.getItem('access_token') !== null){
      axios.get(base_url + `profile-image/`, 
      {headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`}})
      .then(response => {
        console.log(`Your request is sent. ${response.status}`)
        setProFile(response.data.image)
      })
      .catch(error => { console.log(error)});
    }
  }

  let success_msg = document.getElementById("SuccessProfile");

  const handleupdateAccount = async(newData) =>{
    // update your account detail
    if (localStorage.getItem('access_token') !== null){
      await axios.put(base_url + `update-account/${person.id}/`, newData, 
      {headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`}})
      .then(response => {
        console.log(`Your request sent. ${response.status}`)
        if (response.status === 200) {
          setSuccessMsg("Your profile updated successfully.")
          success_msg.style.display = "block";
        }
      })
      .catch(error => { console.log(error)});
      handleClose()
    }
  };

  if (success_msg !== null && success_msg.style.display === "block") {
    window.location.reload(true);
    setTimeout(()=>hideSuccessMsg(success_msg), 5000)
  };
  
  const handleProfileImage = async()=>{
    // Create profile image
    if (localStorage.getItem("access_token") !== null){
      await axios.post(base_url + `create-profile-image/`, {image: selectFile}, 
      {headers: {
        'content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`}})
      .then(response => {
        console.log(`Your profile image is saved. ${response.status}`)
        if (response.status === 200) {
          setSuccessMsg("Your profile image created successfully.")
          success_msg.style.display = "block";
        }
      })
      .catch(error => { console.log(error)})
      getProfileImage()
    }
  };
  
  useEffect(()=>{
    document.title ="Profile | Library";
    if (localStorage.getItem('access_token') !== null){
      (async() =>{
        // get all pdf books
        await axios.get(base_url + `librarian-books/`,
          {headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('access_token')}`}})
        .then(response => {setTotalBooks(response.data.length)})
        .catch(error => {console.log(error)});  
      
        // Get all departments
        await axios.get(base_url + `librarian-departments/`,
          {headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('access_token')}`}})
        .then(response => {setTotalDepart(response.data.length)})
        .catch(error => {console.log(error)}); 
      })()
    }
  }, [success_msg])

  return (
    <div className='homeDiv'>
    <h5 id="SuccessProfile"> {successMsg} </h5>
      <Row className='profileRow'>
        <Col md={3} className='profileDiv'>
          <img src={proFile? proFile : '/images/User-Profile.png'} className='profile-pic' alt='user-profile' />
          <form>
            <input type='file' id='ProfileFile' onChange={(e) => setSelectFile(e.target.files[0])} />
            <button type='submit' className='btn darkButton' onClick={handleProfileImage}>Upload</button>
          </form> 
        </Col>
        <Col md={8} className='profile-info'>
          <h4><b>Name:</b> {person.first_name} {person.last_name} </h4> <hr/>
          <p><b>Role:</b> {person.role} </p>
          <p><b>Library Name:</b> {person.store_name} </p>
          <p><b>Qualification:</b> {person.highest_qualification} </p>
          <p><b>Username:</b> {person.username} </p>
          <p><b>Email:</b> {person.email} </p>
          {
            person.role === 'librarian' || person.role === 'Librarian'?
              <div>
                <h6><b>Total</b> Departments created- {totalDepart}</h6>
                <h6><b>Total</b> PDF Books uploaded - {totalBooks}</h6>
              </div>
            :
            ""
          }
          <button className='btn lightButton' onClick={handleShow} >Update Profile</button>
        </Col>
      </Row>
      {show? <ProfileForm updateAccount={handleupdateAccount}  /> : <></>}
    </div>
  )
}

export default Profile;
