import React, { useContext, useEffect} from 'react';
import '../css/all_pages.css';
import Librarian from './Librarian/Librarian';
import Customer from './Customer/Customer';
import AuthContext from '../context/AuthContext';

function Collection() {
  const { person } = useContext(AuthContext)
  
  useEffect(()=>{
    document.title ="Collection | Library";
  },[])

  return (
    <div>
      {person.role === "librarian" || person.role === "Librarian"? <Librarian/> : <Customer/>}
    </div>
  )
}

export default Collection;