import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { base_url } from '../../../App';
import Row from 'react-bootstrap/Row';
import CustDepartment from './CustDepartment';


function Customer() {

  const [departList, setDepartList] = useState([])
  
  useEffect(()=>{
    console.log("customer effects")
    if (localStorage.getItem('access_token') !== null){
      (async()=> {
        await axios.get(base_url + 'department-list/',
            {headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('access_token')}`
            }})
          .then(response => {setDepartList(response.data)})
          .catch(error => {console.log(error)});
      }) ()
    }
  },[])
  
  return (
    <>
      <Row className='departmentDiv'>
        {
          departList && departList.slice(0).reverse().map(list => <CustDepartment key = {`depart_${list.id}`} 
          departmentData={list} />)
        } 
      </Row>
    </>
  )
}

export default React.memo(Customer);
