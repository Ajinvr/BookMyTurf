import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Profile from './Pages/Profile/Profile';
import Header from './Globalcomponents/Header/Header';
import Footer from './Globalcomponents/Footer/Footer';
import Login from './Pages/Login/Login';
import Signup from './Pages/Signup/Signup';
import Home from './Pages/Home/Home';
import DetailsPage from './Pages/Detailspage/DetailsPage';

function App() {


  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'mydarktheme';
     document.documentElement.setAttribute('data-theme', savedTheme);
  }, [window.reload]);

  const data = {  
    token: null
  };

  localStorage.setItem('userdata', JSON.stringify(data));

  return (
    <Router>
             
                 <Header/>
                   <Toaster position="top-right" reverseOrder={false}/>
                      
                      <Routes>
                           
                          <Route path="/" element={<Home/>} />

                           <Route path="/login" element={<Login/>} />
                           <Route path="/signup" element={<Signup/>} />
                           {/* <Route path="/profile"  element={<Profile/>} /> */}
                          
                           <Route path="/details/:id" element={<DetailsPage/>} />

                      </Routes>
                  <Footer/>
    </Router>
  )
}

export default App