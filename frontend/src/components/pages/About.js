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
      are created, or how many books have ratings etc. The purpose of a library management system is to provide 
      instant and accurate data regarding any type of book, thereby saving a lot of time and effort.
      </p>
      <p>
        In order to maintain E-library app, we will have the following set of components. These 
        components are efficient to manage library operations accurately.
      </p>
      <ul>
        <li> <h6><b>Login Section:</b> User create account with role as:</h6>
            <p>
                <b>Librarian:</b> the user who can access the entire functionality of the system via this 
                component. He/She can maintain e-books and update them as per necessity. Also, he/she can add or
                remove e-books into the system respectively.
            </p>
            <p>
                <b>Customer:</b> The user who want to access library materials, need to do registration first. The 
                registration allows for read and download e-books freely. After registering, they can check out and check 
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
