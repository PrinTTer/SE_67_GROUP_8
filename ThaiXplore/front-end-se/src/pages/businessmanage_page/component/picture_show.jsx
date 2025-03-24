import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faTh } from '@fortawesome/free-solid-svg-icons';

const PictureShow = ({ images, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevImage = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="fixed inset-0 bg-gray-800/30 bg-opacity-90 z-50 flex flex-col items-center justify-center px-4 w-">
  {/* Main Image */}
<div className="relative w-full max-w-3xl h-[480px] flex items-center justify-center mx-auto">
  <img
    src={`http://localhost:3000/public/uploads/businesses/images/${images[currentIndex]}`}
    alt="preview"
    className="object-contain max-h-full max-w-full rounded-md"
  />


    {/* Navigation Arrows */}
    <button
      onClick={prevImage}
      className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white text-black rounded-full p-2 shadow hover:scale-105"
    >
      <FontAwesomeIcon icon={faChevronLeft} />
    </button>
    <button
      onClick={nextImage}
      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white text-black rounded-full p-2 shadow hover:scale-105"
    >
      <FontAwesomeIcon icon={faChevronRight} />
    </button>
  </div>

  {/* Thumbnail Gallery */}
  {/* Thumbnail Gallery */}
<div className="mt-6 w-full px-4 overflow-x-auto ">
  <div className="flex gap-3 items-center">
    
    <div className="flex gap-3">
      {images.map((img, idx) => (
        <img
          key={idx}
          src={`http://localhost:3000/public/uploads/businesses/images/${img}`}
          alt={`thumb-${idx}`}
          onClick={() => setCurrentIndex(idx)}
          className={`h-24 w-36 object-cover rounded cursor-pointer border-2 ${
            currentIndex === idx ? 'border-white' : 'border-transparent'
          }`}
        />
      ))}
    </div>
  </div>
</div>


  {/* Close Button */}
  <button
    onClick={onClose}
    className="absolute top-4 right-4 text-white text-3xl font-bold hover:text-red-400"
  >
    &times;
  </button>
</div>
  );
};

export default PictureShow;