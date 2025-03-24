import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileLines, faCheck, faTimes, faImage } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios'; // ต้องแน่ใจว่า import axios ด้วย
import { putData } from '../../../services/apiService';

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
  const [showDocs, setShowDocs] = useState(false);

  // Truncate description if too long
  const truncateDescription = (text, maxLength = 150) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  const handleStatusChange = async (status) => {
    try {
      console.log(status);
      const response = await putData(`/businesses/${data._id}`, {
        verify: {
          document: data.verify.document,
          status: status,
          
        },
      });
      console.log('Status updated successfully:', response.data);
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  return (
    <>
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden transition-all hover:shadow-md">
        <div className="flex flex-col md:flex-row">
          {/* Image container */}
          <div className="w-full md:w-48 lg:w-56 h-48 md:h-auto bg-gray-100 flex items-center justify-center relative">
            {image ? (
              <img
                src={image}
                alt={businessName}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex flex-col items-center justify-center text-gray-400 h-full">
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
          <div className="flex-1 p-5 relative">
            {/* Business details */}
            <div className="pr-24">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{businessName}</h3>
              
              <div className="space-y-3 text-gray-600">
                <p className="flex items-start">
                  <svg className="h-5 w-5 text-gray-400 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>{address}</span>
                </p>
                
                <p className="flex items-start">
                  <svg className="h-5 w-5 text-gray-400 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>{phoneNumber}</span>
                </p>
                
                <p className="flex items-start">
                  <svg className="h-5 w-5 text-gray-400 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="line-clamp-2">{truncateDescription(description)}</span>
                </p>
              </div>
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
  title="Approve"
  onClick={() => handleStatusChange('approved')}
>
  <FontAwesomeIcon icon={faCheck} />
</button>
              
<button 
  className="w-10 h-10 flex items-center justify-center rounded-full bg-red-50 border border-red-200 text-red-500 hover:bg-red-100 transition-colors shadow-sm"
  title="Reject"
  onClick={() => handleStatusChange('rejected')}
>
  <FontAwesomeIcon icon={faTimes} />
</button>
            </div>
          </div>
        </div>
      </div>

      {/* Document Modal */}
      {showDocs && (
        <div className="fixed inset-0 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md relative animate-fadeIn">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-200">
              <h3 className="text-lg font-bold text-gray-800">Business Documents</h3>
              <button
                className="text-gray-500 hover:text-gray-700 focus:outline-none"
                onClick={() => setShowDocs(false)}
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {data?.verify?.document?.length > 0 ? (
              <ul className="space-y-3 max-h-80 overflow-y-auto">
                {data.verify.document.map((file, index) => (
                  <li key={index} className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <a
                      href={`http://localhost:3000/public/uploads/businesses/verifies/${file}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-blue-600 hover:text-blue-800"
                    >
                      <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                      {file}
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="py-12 text-center">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                </svg>
                <p className="mt-4 text-gray-600">No documents attached</p>
              </div>
            )}
            
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowDocs(false)}
                className="px-4 py-2 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200 focus:outline-none"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BoxBusiness;