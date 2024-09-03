import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../../../Utils/axiosInstance';

function Slots() {
  const today = new Date().toISOString().split('T')[0];
  const [selectedDate, setSelectedDate] = useState(today);
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [slots, setSlots] = useState([]);
  const [noSlots, setNoSlots] = useState(false);
  const { id } = useParams();
  const turfId = id;

  const getslot = async () => {
    try {
      const response = await axiosInstance.get(`/api/turf/getTurfSlots/${turfId}?date=${selectedDate}`);
      if (response.status === 204 || !response.data.length) {
        setNoSlots(true);
        setSlots([]);
      } else {
        setNoSlots(false);
        setSlots(response.data);
      }
    } catch (error) {
      console.log(error);
      setNoSlots(true);
    }
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
    setNoSlots(false); 
  };

  const toggleSlotSelection = (slot) => {
    if (selectedSlots.includes(slot)) {
      setSelectedSlots(selectedSlots.filter((s) => s !== slot));
    } else {
      setSelectedSlots([...selectedSlots, slot]);
    }
  };

  useEffect(() => {
    getslot();
  }, [selectedDate]);

  return (
    <div className='font-bold text-accent'>
      <div className='flex justify-between px-4 md:px-6'>
        <h1 className='text-2xl'>Available Slots</h1>
        <input
          type="date"
          className="bg-white text-black rounded border-2 border-black px-1"
          value={selectedDate}
          onChange={handleDateChange}
          min={today}
        />
      </div>

      <div className='flex flex-wrap p-4 mt-10'>
        {noSlots ? (
          <h1>No slots available ....</h1>
        ) : (
          slots
            .filter(slot => slot.status === 'available')
            .map((slot, index) => (
              <div
                key={index}
                className={`mr-2 w-32 rounded-2xl p-2 flex justify-center text-center mb-2 cursor-pointer ${
                  selectedSlots.includes(slot) ? 'bg-gray-400 text-black' : 'bg-accent text-secondary'
                }`}
                onClick={() => toggleSlotSelection(slot)}
              >
                {slot.timeRange}
              </div>
            ))
        )}
      </div>
    </div>
  );
}

export default Slots;
