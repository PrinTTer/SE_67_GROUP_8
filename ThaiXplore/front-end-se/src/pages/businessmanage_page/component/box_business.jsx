import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileLines, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';

const BoxBusiness = ({ data }) => {
  const {
    // userId = '-',
    businessName = '-',
    category = '-',
    address = '-',
    phoneNumber = '-',
    description = '-',
    media = [],
  } = data;

  const image = media.length > 0 ? media[0] : null;

  return (
    <div className="relative bg-white border border-gray-300 rounded-md shadow-md p-4 flex gap-4 min-h-[160px] w-full max-w-[1200px] mx-auto">
      {/* วงกลมไอคอนมุมขวาบน */}
      <div className="absolute top-2 right-2 flex gap-2">
        {[faFileLines, faCheck, faTimes].map((icon, idx) => (
          <div
            key={idx}
            className="w-8 h-8 bg-white border border-gray-300 rounded-full shadow flex items-center justify-center hover:bg-gray-100 cursor-pointer"
          >
            <FontAwesomeIcon icon={icon} className="text-black text-sm" />
          </div>
        ))}
      </div>

      {/* รูปอยู่ด้านซ้าย */}
      <div className="min-w-[150px] w-[150px] h-[120px] bg-gray-200 flex items-center justify-center text-gray-500 text-sm rounded">
        {image ? (
          <img
            src={image}
            alt="Business"
            className="object-cover w-full h-full rounded"
          />
        ) : (
          <span>No picture</span>
        )}
      </div>

      {/* รายละเอียด */}
      <div className="flex flex-col justify-center">
        {/* <p><strong>Request By UserID:</strong> {userId}</p> */}
        <p><strong>Business Name:</strong> {businessName}</p>
        <p><strong>Category:</strong> {category}</p>
        <p><strong>Address:</strong> {address}</p>
        <p><strong>Phone:</strong> {phoneNumber}</p>
        <p><strong>Description:</strong> {description}</p>
      </div>
    </div>
  );
};

export default BoxBusiness;
