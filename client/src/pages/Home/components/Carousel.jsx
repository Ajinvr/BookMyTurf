import React, { useEffect, useState } from 'react';

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const items = [
    "https://res.cloudinary.com/dibkjqtbx/image/upload/v1724998456/staticimages/rbzq6pjkqgs2hmkqjh62.png",
    "https://res.cloudinary.com/dibkjqtbx/image/upload/v1724998443/staticimages/s3nikgziz9w3gslzqndo.png",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    }, 5000);

    return () => clearInterval(interval); 
  }, [items.length]);

  return (
    <div className="carousel w-full h-80">
      {items.map((item, index) => (
        <div key={index} className={`carousel-item w-full ${index === currentIndex ? 'block' : 'hidden'} `}>
          
             <img src={item} className="w-screen carousal h-60 " alt={`Carousel item ${index + 1}`}/>
        
        </div>
      ))}
    </div>
  );
};

export default Carousel;
