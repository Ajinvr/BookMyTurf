import React from 'react';
import Dropdown from './components/Dropdown';
import logo from '../../assets/logo.png';
import Searchbar from './components/Searchbar';
import Pincode from './components/Pincode';
import { useNavigate } from 'react-router-dom';

function Header() {

  let navigate = useNavigate()

  return (
    <div className='fixed top-0 left-0 w-full bg-primary pt-3 px-3 z-50'>
      <div className='flex justify-between'>
        <div className='flex'>
          <img onClick={()=>{navigate('/')}} className='w-20' src={logo} alt="Logo" />
        </div>
        <div className='flex gap-5 mr-2 sb'>
          <Searchbar />
          <Dropdown />
        </div>
      </div>
      <Pincode/>
    </div>
  );
}

export default Header;
