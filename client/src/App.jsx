// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './pages/globalComponents/header/Header';
import Home from './pages/Home/Home';
import DetailsPage from './pages/Detailspage/DetailsPage';
import Profile from './pages/profile/profile';
import Footer from './pages/globalComponents/footer/Footer';


function App() {
  return (
        <Router>
              <Header/>
                      <Routes>
                           <Route path="/" element={<Home/>} />
                           <Route path="/profile" element={<Profile/>} />
                           <Route path="/details/:id" element={<DetailsPage/>} />
                      </Routes>
              <Footer/>
    </Router>
  );
}

export default App;
