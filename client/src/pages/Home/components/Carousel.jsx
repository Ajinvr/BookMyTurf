import React, { useEffect, useState } from 'react';

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const items = [
    "",
    "",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    }, 5000);

    return () => clearInterval(interval); 
  }, [items.length]);

  return (
    <div className="carousel w-full">
      {items.map((item, index) => (
        <div
          key={index}
          className={`carousel-item w-full ${index === currentIndex ? 'block' : 'hidden'} carousal`}
          
        >
          <img src={item} className="w-screen" alt={`Carousel item ${index + 1}`}/>
        
        </div>
      ))}
      <div className="flex w-full justify-center gap-2 py-2">
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`btn btn-xs ${index === currentIndex ? 'btn-active' : ''}`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
