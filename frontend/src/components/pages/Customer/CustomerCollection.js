import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { base_url } from '../../../App';
import {useParams} from "react-router-dom";
import PDFBookList from '../PDFBookList';


function CustomerCollection() {
  const {d_id, name} = useParams();
  const [bookLists, setBookLists] = useState([])
  
  useEffect(()=> {
    document.title ="PDF Books | Library";
    if (localStorage.getItem('access_token') !== null){
      axios.get(base_url + `departments/${d_id}/book-list/`,{headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`}})
      .then(response => {setBookLists(response.data)})
      .catch(error => {console.log(error)});
    }
  },[d_id])

  // This is main function's return()
  return (
    <><hr/>
      <h2 className='bookCollectHead'> {name}:</h2> 
      <div className='booklistDiv'>
        <h6> At the Top : Latest uploaded: <i className="fa-brands fa-gripfire"></i></h6>
        {
          bookLists && bookLists.slice(0).reverse().map(list => <PDFBookList key={`pdfBook_${list.id}`} bookData={list}/>)
        }
      </div>
      <p>This is for footer</p>
    </>
  )
}

export default CustomerCollection;
