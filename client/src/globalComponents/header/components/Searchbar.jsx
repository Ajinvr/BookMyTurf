import React, { useState } from 'react';
import axiosInstance from '../../../Utils/axiosInstance';
import Seachicon from '../../../assets/searchicon.svg'
function Searchbar() {
  
  const handleclick = () => {
   
  };


  return (
    <div className='flex items-center bg-white px-2 rounded-lg'>
      <input
        type="text"
        placeholder="Search"
        className=' outline-none border-0 p-1 text-black rounded w-40 '
      />

      <img  onClick={handleclick} className='h-5' src={Seachicon} alt="" />

    </div>
  );
}

export default Searchbar;
