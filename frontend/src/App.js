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


function App() {

  return (
    <div className='container'>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Header />}>
            <Route index element={<Home />} />
            <Route path="collection" element={<Collection />} />
            <Route path="about-us" element={<About />} />
            <Route path="profile" element={<Profile />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
