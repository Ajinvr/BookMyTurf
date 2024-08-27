import React, { useState } from 'react';
import profileicon from '../../../../assets/profileIcon.svg';
import Theme from './Theme';
import NavigateLink from './NavigateLink';
import Login from './Login';

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative text-accent">
      <button  onClick={toggleDropdown} className="w-5">
        <img src={profileicon} alt="profile" />
      </button>

      {isOpen && (
        <div onMouseLeave={toggleDropdown} className="absolute right-0 w-max bg-primary p-2 rounded shadow-lg overflow-hidden mt-5 -mr-2"> 
          <Theme />
          <hr/>
          <NavigateLink text="Profile" path="/profile" />
          <hr />
          <Login/>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
