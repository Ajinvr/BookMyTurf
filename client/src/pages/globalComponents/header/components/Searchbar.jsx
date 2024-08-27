import React, { useState } from 'react';
import { useQuery } from 'react-query';
import axiosInstance from '../../../../axiosInstance';

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
      enabled: !!query,
    }
  );

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search..."
      />
      <button onClick={() => {}}>Search</button>
    </div>
  );
}

export default Searchbar;
