import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/pages/Home';
import Header from './components/layout/Header';
import About from './components/pages/About';
import Profile from './components/pages/Profile';
import Login from './components/pages/Login';
import Signup from './components/pages/Signup';
import Collection from './components/pages/Collection';
import PDFBook from './components/pages/CollectionPage/PDFBook';
import { AuthProvider } from '../src/components/context/AuthContext';
import axios from 'axios';


export const base_url ="http://127.0.0.1:8000/api/";

function App() {
  

  const decodeJWT =(token)=> {
    const parts = token.split('.');
    if (parts.length !== 3) {
      throw new Error('Invalid token format');
    }
    const payload = JSON.parse(atob(parts[1]));
    return { payload };
  }

  if (localStorage.getItem('access_token') !==null){
    var userId = decodeJWT(localStorage.getItem('access_token')).payload.user_id
  }
  
  return (
    <div className='container'>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Header />}>
              <Route index element={<Home />} />
              <Route path="collection" element={<Collection userId={userId} />} />
              <Route path="about-us" element={<About />} />
              <Route path="profile" element={<Profile />} />
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<Signup />} />
              <Route path="department/books" element={<PDFBook />} />
              
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
