import React, { useState } from 'react';
import { useQuery } from 'react-query';
import axiosInstance from '../../../axiosInstance';

function Searchbar() {
  const [query, setQuery] = useState('');

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const { data, isError, isLoading } = useQuery(
    ['searchResults', query],
    async () => {
      const response = await axiosInstance.get('/api/turf/searchturf', {
        params: { q: query },
      });
      console.log(response.data);
      
      return response.data;
    },
    {
      enabled: true, 
    }
  );

  return (
    <div>
      <input
        type="text"
        value={query}
        style={{fontFamily:"sub"}}
        onChange={handleInputChange}
        placeholder="Search..."
        className=' outline-none border-0 p-1 text-black rounded '
      />
    </div>
  );
}

export default Searchbar;
