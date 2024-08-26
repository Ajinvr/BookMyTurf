import React from 'react';
import NavigateLink from './NavigateLink';

function Theme() {
  const toggleTheme = () => {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'DarkTheme';
    const newTheme = currentTheme === 'DarkTheme' ? 'LightTheme' : 'DarkTheme';
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  return (
    <div className='p-2'>
    <p onClick={toggleTheme} className='cursor-pointer'>
      Switch theme
    </p></div>
  );
}

export default Theme;
 
