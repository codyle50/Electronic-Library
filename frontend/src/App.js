import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/pages/Home';
import Header from './components/layout/Header';
import About from './components/pages/About';
import Profile from './components/pages/Profile';
import Login from './components/pages/Login';
import Signup from './components/pages/Signup';
import Collection from './components/pages/Collection';
import { AuthProvider } from '../src/components/context/AuthContext';
import PDFView from './components/pages/PDFView';
import { HideShowProvider } from './components/context/HideShowContext';
import CustomerCollection from './components/pages/Customer/CustomerCollection';
import LibraryCollection from './components/pages/Librarian/LibraryCollection';
import LibBookDetail from './components/pages/Librarian/LibBookDetail';
import BookDetail from './components/pages/Customer/BookDetail';



export const base_url ="http://127.0.0.1:8000/api/";

function App() {
  
  return (
    <div className='container'>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Header />} >
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="about-us" element={<About />} />
            <Route path="collection" element={<HideShowProvider> <Collection /> </HideShowProvider>} />
            <Route path="profile" element={<HideShowProvider> <Profile /> </HideShowProvider>} />
            <Route path={`departments/:d_id/:name/books`} element={<HideShowProvider> <CustomerCollection /> </HideShowProvider>} />
            <Route path={`departments/:d_id/:name/library-books`} element={<HideShowProvider> <LibraryCollection /> </HideShowProvider>} />
            <Route path={`books/:id/library-book`} element={<HideShowProvider> <LibBookDetail /> </HideShowProvider>} />
            <Route path={`books/:id/book-detail`} element={<HideShowProvider> <BookDetail /> </HideShowProvider>} />
            <Route path={`books/:book_id/pdf-view`} element={<PDFView />} />
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
