import React from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../../axiosInstance'; 
import { useQuery } from 'react-query';
import Loader from '../../../globalComponents/loader/Loader';
import Errorpage from '../../../globalComponents/error/Errorpage';

function Turf() {
  const navigate = useNavigate();

 
  const { data, isLoading, isError, error } = useQuery('turfs', async () => {
    const response = await axiosInstance.get('/api/turf/getAllTurf');
    return response.data.turfs;
  });

  const handleButtonClick = (id) => {
    navigate(`/details/${id}`);
  };

  if (isLoading) return <Loader/> ;

  if (isError) return <Errorpage/>

  return (
    <div className="flex flex-wrap justify-center">
      {data.map((turf) => (
        <div 
          key={turf._id} 
          style={{ fontFamily: "sub" }} 
          className="w-80 card bg-base-100 shadow-xl m-5"
          onClick={() => handleButtonClick(turf._id)}
        >
          <figure>
            <img className='h-60 rounded-xl'
              src={turf.imgLink}
              alt={turf.name}
            />
          </figure>
          <div className="mt-5">
            <h2 className="card-title text-2xl">{turf.name}</h2>
            <p className='text-sm mt-2'>{turf.description}</p> 
            <div className='flex justify-between mt-3'>
              <p>{turf.rent}/hour</p>
              <p>kottayam</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Turf;
