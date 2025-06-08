// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavigationBar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import LandingPage from './components/LandingPage/LandingPage';
import ServicesPage from './components/Services/services';
import ServiceDetailsPage from './components/Services/ServiceDetail';
import AboutUsPage from './components/AboutUsPage/AboutUsPage';
import ContactForm from './components/ContactForm/ContactForm';

const App = () => {
  return (
    <Router>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path='/services' element={<ServicesPage/>}/>
        <Route path='/services/:id' element={<ServiceDetailsPage/>}/>
        <Route path='/about' element={<AboutUsPage/>}/>
        <Route path='/contactus' element={<ContactForm/>}/>
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
