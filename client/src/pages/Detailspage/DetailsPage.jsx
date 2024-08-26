import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function DetailsPage() {
  const { id } = useParams();
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await axios.get(`http://192.168.1.35:5000/api/turf/getTurf${id}`);
        setDetails(response.data.turfs);
        
      } catch (err) {
        setError(err.message || 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

  if (loading) return <p>Loading...</p>

  return (
    <>
      <div className='h-100 p-10'></div>
      <div style={{ fontFamily: "sub" }} className="flex flex-col md:flex-row p-4 md:p-8 lg:p-12">
        <div className="flex-1 md:w-1/2">
          <img
            src={details?.imgLink}
            alt="Detail"
            className="w-full h-auto object-cover rounded-lg shadow-md"
          />
        </div>
        <div className="flex-1 md:w-1/2 md:pl-8 lg:pl-12 mt-4 md:mt-0">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">{details?.name}</h1>
          <p className="text-sm md:text-base lg:text-lg mb-4">{details?.description}</p>
          <button className="w-full px-4 py-2 bg- text-base-100 rounded transition duration-300 bg-neutral">
            Book Now
          </button>
        </div>
      </div>
    </>
  );
}

export default DetailsPage;
