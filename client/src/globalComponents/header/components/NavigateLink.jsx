import React from 'react';
import { Link } from 'react-router-dom';

function NavigateLink({ text, path }) {
  return (
    <div className='p-2' >
      <Link to={path}>
        <h1>{text}</h1>
      </Link>
    </div>
  );
}

export default NavigateLink;
