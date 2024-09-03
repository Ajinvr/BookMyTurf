import React from 'react';
import Cookies from 'js-cookie';
import NavigateLink from './NavigateLink';
import { useNavigate } from 'react-router-dom';

function Login() {
  let navigate = useNavigate()
  
  const userdata = JSON.parse(localStorage.getItem('userdata'));

  function handleClick() {
      Cookies.remove(); 
      localStorage.clear();
      navigate('/')
  }

  return (
    <div>
      {userdata && userdata.isLoggedIn === true ? (
        <NavigateLink text={'Logout'} onClick={handleClick} />
      ) : (
        <NavigateLink text={'Login'} path={'/login'} />
      )}
    </div>
  );
}

export default Login;
