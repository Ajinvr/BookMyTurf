import React from 'react';
import Dropdown from './components/Dropdown';
import logo from '../../assets/logo.png';
import Searchbar from './components/Searchbar';
import Pincode from './components/Pincode';
import { useNavigate } from 'react-router-dom';

function Header() {

  let navigate = useNavigate()

  return (
    <div className='sticky top-0 left-0 bg-primary p-2 w-screen '>
      <div className='flex justify-between'>
        <div className='flex'>
          <img onClick={()=>{navigate('/')}} className='w-20' src={logo} alt="Logo" />
        </div>
        <div className='flex gap-5 mr-2 sb items-center'>
          <Searchbar />
          <Dropdown />
        </div>
      </div>
      <Pincode/>
    </div>
  );
}

export default Header;
