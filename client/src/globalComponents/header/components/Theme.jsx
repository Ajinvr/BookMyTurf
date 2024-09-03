import React, { useEffect } from 'react';

function Theme() {
  
  const toggleTheme = () => {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'mydarktheme';
    const newTheme = currentTheme === 'mydarktheme' ? 'mylighttheme' : 'mydarktheme';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme); 
  };

  return (
    <div className='p-2'>
      <p onClick={toggleTheme} className='cursor-pointer'>
        Switch theme
      </p>
    </div>
  );
}

export default Theme;
