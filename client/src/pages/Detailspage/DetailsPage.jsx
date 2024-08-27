import React, { useEffect } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import axiosInstance from '../../axiosInstance';
import Loader from '../globalComponents/loader/Loader';

function DetailsPage() {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { id } = useParams();

  const fetchDetails = async () => {
    const response = await axiosInstance.get(`/api/turf/getTurf/${id}`);
    return response.data.turfs;
  };

  const { data: details, isLoading, isError, error } = useQuery(['turfDetails', id], fetchDetails);

  if (isLoading) return <Loader/>
  if (isError) return <p>{error.message || 'An error occurred'}</p>;

  return (
    <>
      <div style={{ fontFamily: "sub" }} className="flex flex-col md:flex-row p-6 md:p-8 lg:p-12 mt-20 ">
        <div className="flex-1 md:w-1/2">
          <img
            src={details?.imgLink}
            alt="Detail"
            className="w-full h-auto object-cover rounded-lg shadow-md"
          />
        </div>
        <div className="flex-1 md:w-1/2 md:pl-8 lg:pl-12 mt-4 md:mt-0">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-accent">{details?.name}</h1>
          <p className="text-sm md:text-base lg:text-lg mb-4">{details?.description}</p>
          <p className="text-sm md:text-base lg:text-lg mb-4">₹{details?.rent}/hour</p>
          <button className="w-full px-4 py-2 rounded  bg-accent text-secondary">
            Book Now
          </button>
        </div>
      </div>
    </>
  );
}

export default DetailsPage;
