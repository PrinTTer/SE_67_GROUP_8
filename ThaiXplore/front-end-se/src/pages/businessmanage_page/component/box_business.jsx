import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileLines, faCheck, faTimes, faImage } from '@fortawesome/free-solid-svg-icons';
import { putData } from '../../../services/apiService';
import PictureShow from './picture_show';

const BoxBusiness = ({ data }) => {
  const {
    businessName = '-',
    category = '-',
    address = '-',
    phoneNumber = '-',
    description = '-',
    media = [],
  } = data;

  const [showDocs, setShowDocs] = useState(false);
  const [showGallery, setShowGallery] = useState(false);

  const truncateDescription = (text, maxLength = 150) => {
    return text.length <= maxLength ? text : text.substring(0, maxLength) + '...';
  };

  const handleStatusChange = async (status) => {
    try {
      await putData(`/businesses/${data._id}`, {
        verify: {
          document: data.verify.document,
          status: status,
        },
      });
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  

  return (
    <>
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden transition-all hover:shadow-md max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row h-[200px]">
          {/* Image container */}
          <div className="w-full md:w-56 h-full bg-gray-100 flex items-center justify-center relative overflow-hidden">
          {media.length > 0 ? (
  <div className="flex h-full w-full">
    {/* รูปซ้ายใหญ่ (ภาพแรก) */}
    <div className="w-2/3 h-full overflow-hidden rounded-l-lg">
      <img
        src={`http://localhost:3000/public/uploads/businesses/images/${media[0]}`}
        alt="main-img"
        className="w-full h-full object-cover"
        onClick={() => setShowGallery(true)}
      />
    </div>

    {/* รูปขวา 2 ช่องซ้อน */}
    <div className="w-1/3 h-full flex flex-col gap-1 pl-1">
      {media.slice(1, 3).map((img, idx) => (
        <div key={idx} className="relative h-1/2 w-full overflow-hidden rounded">
          <img
            src={`http://localhost:3000/public/uploads/businesses/images/${img}`}
            alt={`side-img-${idx}`}
            className="w-full h-full object-cover"
            onClick={() => setShowGallery(true)}
          />
          {/* Overlay ถ้ามีรูปเหลือ */}
          {idx === 1 && media.length > 3 && (
            <div className="absolute inset-0 bg-gray-900/50 flex items-center justify-center text-white font-semibold text-xl rounded"
              onClick={() => setShowGallery(true)}>
            +{media.length - 3}
          </div>
          
          )}
        </div>
      ))}
    </div>
  </div>
) : (
  <div className="flex flex-col items-center justify-center text-gray-400 h-full w-full">
    <FontAwesomeIcon icon={faImage} className="text-4xl mb-2" />
    <span className="text-sm">No picture</span>
  </div>
)}

            {category && (
              <div className="absolute top-3 left-3">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                  {category}
                </span>
              </div>
            )}
          </div>

          {/* Content container */}
          <div className="flex-1 p-5 relative overflow-hidden">
            <div className="pr-24 space-y-3 text-gray-600 text-sm">
              <h3 className="text-lg font-semibold text-gray-900">{businessName}</h3>
              <p className="flex items-start">
                <svg className="h-5 w-5 text-gray-400 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {address}
              </p>
              <p className="flex items-start">
                <svg className="h-5 w-5 text-gray-400 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {phoneNumber}
              </p>
              <p className="flex items-start">
                <svg className="h-5 w-5 text-gray-400 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {truncateDescription(description)}
              </p>
            </div>

            {/* Action buttons */}
            <div className="absolute top-5 right-5 flex flex-col space-y-2">
              <button
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-50 border border-gray-200 text-gray-600 hover:bg-gray-100 transition-colors shadow-sm"
                onClick={() => setShowDocs(true)}
                title="View Documents"
              >
                <FontAwesomeIcon icon={faFileLines} />
              </button>
              <button
                className="w-10 h-10 flex items-center justify-center rounded-full bg-green-50 border border-green-200 text-green-600 hover:bg-green-100 transition-colors shadow-sm"
                onClick={() => handleStatusChange('approved')}
                title="Approve"
              >
                <FontAwesomeIcon icon={faCheck} />
              </button>
              <button
                className="w-10 h-10 flex items-center justify-center rounded-full bg-red-50 border border-red-200 text-red-500 hover:bg-red-100 transition-colors shadow-sm"
                onClick={() => handleStatusChange('rejected')}
                title="Reject"
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
          </div>
        </div>
      </div>


      {showGallery && (
    <PictureShow
      images={media}
      onClose={() => setShowGallery(false)}
    />
  )}
    </>
  );
};

export default BoxBusiness;
