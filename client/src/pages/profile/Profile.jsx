import React, { useEffect } from 'react'
import Sub from '../globalComponents/sub heading/Sub'
import logo from "../../assets/logo.png"
import Orders from './Orders';

function Profile() {
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  return (
          <div  className="mt-20">
               <Sub text={'Profile'}/>
                <div style={{fontFamily:"sub"}} className='h-28 w-screen justify-center align-middle'>
                      <div className='w-screen flex justify-center'>
                          <img className='text-center' style={{height:"100px",width:"100px",borderRadius:"50%",border:"1px solid "}} src={logo} alt="" />
                   </div>
                     <h1  className='text-2xl capitalize text-center'>perrin</h1>
                    <h1  className='text-l capitalize text-center'>perrin@exmple.com</h1>
               </div>

             <Sub text={'Your orders'}/>
                   <Orders/>
         </div>
  )
}

export default Profile