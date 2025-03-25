import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const PictureShow = ({ images, onClose, title }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Preload the current image
  useEffect(() => {
    setIsLoading(true);
    const img = new Image();
    img.src = `http://localhost:3000/public/uploads/businesses/images/${images[currentIndex]}`;
    img.onload = () => setIsLoading(false);
  }, [currentIndex, images]);


  const prevImage = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex flex-col items-center justify-between p-4 transition-opacity duration-300">
      {/* Header */}
      <div className="w-full flex justify-between items-center text-white py-3 px-6">
        <h2 className="text-xl font-medium">{title || 'Photo Gallery'}</h2>
        <button onClick={onClose}>
          <FontAwesomeIcon icon={faTimes} className="text-xl" />
        </button>
      </div>

      {/* Main Image Container */}
      <div className="relative flex-1 w-full flex items-center justify-center">
        <div className="relative max-w-4xl w-full h-full flex items-center justify-center">
          {isLoading ? (
            <div className="animate-pulse bg-gray-700 rounded-lg w-full h-[70vh] max-h-[70vh]"></div>
          ) : (
            <img
              key={currentIndex} // ให้ React รู้ว่า index เปลี่ยน
              src={`http://localhost:3000/public/uploads/businesses/images/${images[currentIndex]}`}
              alt="Gallery preview"
              className={`object-contain max-h-[70vh] w-auto mx-auto rounded-lg shadow-2xl transition-opacity duration-500 ease-in-out ${isLoading ? 'opacity-0' : 'opacity-100'
                }`}
            />

          )}

          {/* Counter */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/60 text-white px-4 py-1 rounded-full text-sm">
            {currentIndex + 1} / {images.length}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/60 text-white rounded-full p-3 transition-all"
          >
            <FontAwesomeIcon icon={faChevronLeft} className="text-xl" />
          </button>


          <button onClick={nextImage} aria-label="Next image"
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/60 text-white rounded-full p-3 transition-all"
          >
            <FontAwesomeIcon icon={faChevronRight} className="text-xl" />
          </button>
        </div>
      </div>

      {/* Thumbnails */}
      <div className="w-full bg-black/60 backdrop-blur-sm p-3 mt-4 rounded-lg">
        <div className="flex gap-2 overflow-x-auto pb-2 px-1 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent">
          {images.map((img, idx) => (
            <div
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`relative flex-shrink-0 cursor-pointer rounded-md overflow-hidden transition-all duration-200 ${currentIndex === idx
                ? 'ring-2 ring-blue-500 transform scale-105'
                : 'opacity-70 hover:opacity-100'
                }`}
            >
              <img
                src={`http://localhost:3000/public/uploads/businesses/images/${img}`}
                alt={`Thumbnail ${idx + 1}`}
                className="h-16 w-24 object-cover"
              />
              {currentIndex === idx && (
                <div className="absolute inset-0 border-2 border-white/80 rounded-md"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PictureShow;