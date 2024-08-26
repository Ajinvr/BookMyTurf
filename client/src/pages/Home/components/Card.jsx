import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Card() {
  const [cards, setCards] = useState([]);
  const navigate = useNavigate();

  const handleButtonClick = (id) => {
    navigate(`/details/${id}`);
  };

  useEffect(() => {
    axios.get('http://192.168.1.35:5000/api/turf/getAllTurf')
      .then(response => {
        setCards(response.data.turfs);
        console.log(response.data.turfs);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div className="flex flex-wrap justify-center">
      {cards.map((card) => (
        <div 
          key={card._id} 
          style={{ fontFamily: "sub" }} 
          className="w-60 card bg-base-100 shadow-xl m-5"
          onClick={() => handleButtonClick(card._id)}
        >
          <figure>
            <img className='h-60'
              src={card.imgLink}
              alt={card.name}
            />
          </figure>
          <div className="mt-5">
            <h2 className="card-title text-2xl">{card.name}</h2>
            <p className='text-sm mt-2'>{card.description}</p> 
            <div className='flex justify-between mt-3'>
              <p>{card.rent}/hour</p>
              <p>kottayam</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Card;
