import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CoursesPage from './pages/CoursesPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import Store from './pages/Store';
import ScrollToTop from './components/common/ScrollToTop';
import Login from './pages/Login';               // 👈 Added Login
import Signup from './pages/Signup';

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/store" element={<Store />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
    
  );
}

export default App;