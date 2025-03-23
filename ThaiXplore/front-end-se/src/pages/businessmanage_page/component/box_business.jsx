import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileLines, faCheck, faTimes, faImage } from '@fortawesome/free-solid-svg-icons';

const BoxBusiness = ({ data }) => {
  const {
    businessName = '-',
    category = '-',
    address = '-',
    phoneNumber = '-',
    description = '-',
    media = [],
  } = data;

  const image = media.length > 0 ? media[0] : null;

  // ตัดคำหากยาวเกิน
  const truncateDescription = (text, maxLength = 150) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden transition-all hover:shadow-md w-full  mx-auto">
      <div className="flex flex-col md:flex-row">
        
        {/* Image container */}
        <div className="w-full md:w-48 lg:w-56 h-40 md:h-auto bg-gray-100 flex items-center justify-center relative">
          {image ? (
            <img
              src={image}
              alt={businessName}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex flex-col items-center justify-center text-gray-400">
              <FontAwesomeIcon icon={faImage} className="text-4xl mb-2" />
              <span className="text-sm">No picture</span>
            </div>
          )}
        </div>

        {/* Content container */}
        <div className="flex-1 p-4 md:p-5 relative">
          {/* Action buttons */}
          <div className="absolute top-4 right-4 flex space-x-2">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-white border border-gray-300 text-gray-600 hover:bg-gray-100 transition">
              <FontAwesomeIcon icon={faFileLines} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-white border border-gray-300 text-green-600 hover:bg-green-100 transition">
              <FontAwesomeIcon icon={faCheck} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-white border border-gray-300 text-red-500 hover:bg-red-100 transition">
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>

          {/* Business details */}
          <div className="pr-20 md:pr-28">
            <h3 className="text-lg font-semibold text-gray-900 mb-1">{businessName}</h3>
            <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mb-3">
              {category}
            </div>
            <div className="space-y-2 text-gray-600 text-sm">
              <p><span className="font-medium">Address:</span> {address}</p>
              <p><span className="font-medium">Phone:</span> {phoneNumber}</p>
              <p className="line-clamp-2 md:line-clamp-3">
                <span className="font-medium">Description:</span> {truncateDescription(description)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoxBusiness;
