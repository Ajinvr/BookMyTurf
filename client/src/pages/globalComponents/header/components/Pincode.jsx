import React, { useEffect, useState } from 'react'
import editicon from '../../../../assets/editicon.svg';


function Pincode() {

    const [pincode, setPincode] = useState(localStorage.getItem('pincode') || '686001');
    const [isEditing, setIsEditing] = useState(false);
  
    useEffect(() => {
      localStorage.setItem('pincode', pincode);
    }, [pincode]);
  
    const handleEdit = () => {
      setIsEditing(true);
    };
  
    const handleOk = () => {
      setIsEditing(false);
      localStorage.setItem('pincode', pincode);
    };
  
    const handleChange = (e) => {
      setPincode(e.target.value);
    };



  return (
    <div className='pincode border-t-2 mt-3 border-inherit p-1'>
        {isEditing ? (
          <>
            <input
              style={{width:"70px"}}
              className='text-inherit bg-inherit border-none outline-none font-bold  text-white '
              value={pincode}
              onChange={handleChange}
              type='text' 
            />
            <button onClick={handleOk} className='ml-2  text-white'>
              OK
            </button>
          </>
        ) : (
          <div className='edit'>
               <span className='font-bold text-white'>{pincode}</span>
           
               <img onClick={handleEdit} className='h-3' src={editicon} alt="" />
           
          </div>
        )}
      </div>
  )
}

export default Pincode