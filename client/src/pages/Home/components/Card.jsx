import React from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../../Utils/axiosInstance'; 
import { useQuery } from 'react-query';

function Turf() {
  const navigate = useNavigate();

  const { data, isLoading, isError, error } = useQuery('turfs', async () => {
    let pincode = localStorage.getItem('pincode') || '';
    const response = await axiosInstance.get(`/api/turf/searchturf?q=${pincode}`);
    return response.data;
  });

  const handleButtonClick = (id) => {
    navigate(`/details/${id}`);
  };

  if (isLoading) return <h1>loading...</h1>;

  if (isError) return <h1>error occurred</h1>;

  return (
    <div className='flex flex-wrap justify-center md:justify-evenly gap-5 p-10 text-accent font-bold mb-20 h-max'>
      {data.map((turf) => (
        <div className='w-80 h-100 mb-5 p-1 overflow-hidden' key={turf._id} onClick={() => handleButtonClick(turf._id)}>
          <img className='rounded-xl h-60 ' src={turf.imgLink} alt={turf.name} />
          <div>
            <h2 className='text-2xl mt-3'>{turf.name}</h2>
            <p className='font-normal text-sm'>{turf.description}</p>
            <div className='flex justify-between items-center'>
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
