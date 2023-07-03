import React, {useEffect} from 'react';
import '../css/all_pages.css';

function About() {

  useEffect(()=>{
    document.title ="About Us | Library"
  }, [])

  return (
    <div className='about-cover'>
      <hr/>
      <p>
      This platform is designed to manage all the functions of a library. It helps 
      librarian to maintain the database of new books and the books that are borrowed by members along with their 
      due dates. This system completely automates all your library’s activities. A library management system is 
      used to maintain library records. It tracks the records of the number of books in the library, how many books 
      are issued, or how many books have been returned or renewed or late fine charges, etc. You can find books in 
      an instant, issue/reissue books quickly, and manage all the data efficiently and orderly using this system. 
      The purpose of a library management system is to provide instant and accurate data regarding any type of book, 
      thereby saving a lot of time and effort.
      </p>
      <p>
        In order to maintain library management software, we will have the following set of components. These 
        components are efficient to manage library operations accurately.
      </p>
      <ul>
        <li> <h6><b>Login Section:</b> User create account with role as:</h6>
            <p>
                <b>Librarian:</b> the administrators can access the entire functionality of the system via this 
                component. The admin can maintain the records and track them as per necessity. Also, the admin can add or
                remove entries into the system respectively.
            </p>
            <p>
                <b>Customer:</b> The students who want to access library materials, need to do registration first. The 
                registration allows for maintaining records accurately. After registering, they can check out and check 
                in the library material.
            </p>
        </li>
        <li>
            <p>
                <b>Add and update books:</b> The librarian can add new PDF books to the system with the essential details and 
                can maintain the system effectively.
            </p>
        </li>
        <li>
            <b>Search option:</b> all Customers of the system, including librarian can search for library materials.
        </li>
        <li>
            <p>
                <b>View order status:</b> the librarian can view issued PDF books and their due date. Also, the other 
                details like customer’s details who has issued a book will be available in this module.
            </p>
        </li>
      </ul>
      
    </div>
  )
}

export default About;
