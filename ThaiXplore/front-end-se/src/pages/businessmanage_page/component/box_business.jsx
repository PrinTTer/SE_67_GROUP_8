import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileLines, faCheck, faTimes, faImage } from '@fortawesome/free-solid-svg-icons';
import { putData } from '../../../services/apiService';
import PictureShow from './picture_show';


// ✅ ถูก
const BoxBusiness = ({ data, setData }) => {
  // const {
  //   businessName = '-',
  //   category = '-',
  //   address = '-',
  //   phoneNumber = '-',
  //   description = '-',
  //   media = [],
  // } = data;

  const [showDocs, setShowDocs] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [pendingStatus, setPendingStatus] = useState(null);
  const [rejectDescription, setRejectDescription] = useState(""); // NEW
  const [rejectError, setRejectError] = useState(""); // 🔴 Error message


  const fetchData = async () => {
    await setData(); // ดึงข้อมูลใหม่
    setShowDocs(false);
  };

  const truncateDescription = (text, maxLength = 180) => {
    return text.length <= maxLength ? text : text.substring(0, maxLength) + '...';
  };

  const handleStatusChange = async (status) => {
    console.log('Status:', status);
    console.log('Reject Description:', rejectDescription); // NEW
    try {
      await putData(`/businesses/${data._id}`, {
        verify: {
          document: data.verify.document,
          status: status,
          description: status === "rejected" ? rejectDescription : " ", // NEW
        },
      });
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  // ✅ เปิดป๊อปอัปยืนยันการเปลี่ยนสถานะ */
  const confirmChangeStatus = (status) => {
    setPendingStatus(status);
    setShowConfirm(true);
  };





  return (
    <>
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden transition-all hover:shadow-md max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row md:h-[200px]">
          {/* Image container */}
          <div className="w-full md:w-56 aspect-[3/2] md:aspect-auto bg-gray-100 flex items-center justify-center relative overflow-hidden">
            {(!data.media || data.media.length === 0) && (
              <div className="flex flex-col items-center justify-center text-gray-400 h-full w-full">
                <FontAwesomeIcon icon={faImage} className="text-4xl mb-2" />
                <span className="text-sm">No picture</span>
              </div>
            )}

            {data.media.length === 1 && (
              <div className="w-full h-full overflow-hidden rounded-lg">
                <img
                  src={`http://localhost:3000/public/uploads/businesses/images/${data.media[0]}`}
                  alt="main-img"
                  className="w-full h-full object-cover"
                  onClick={() => setShowGallery(true)}
                />
              </div>
            )}

            {data.media.length === 2 && (
              <div className="grid grid-cols-2 w-full h-full gap-1">
                {data.media.map((img, idx) => (
                  <div key={idx} className="h-full w-full overflow-hidden rounded">
                    <img
                      src={`http://localhost:3000/public/uploads/businesses/images/${img}`}
                      alt={`img-${idx}`}
                      className="w-full h-full object-cover"
                      onClick={() => setShowGallery(true)}
                    />
                  </div>
                ))}
              </div>
            )}

            {data.media.length >= 3 && (
              <div className="flex h-full w-full">
                {/* รูปซ้ายใหญ่ (ภาพแรก) */}
                <div className="w-2/3 h-full overflow-hidden rounded-l-lg">
                  <img
                    src={`http://localhost:3000/public/uploads/businesses/images/${data.media[0]}`}
                    alt="main-img"
                    className="w-full h-full object-cover"
                    onClick={() => setShowGallery(true)}
                  />
                </div>

                {/* รูปขวา 2 ช่องซ้อน */}
                <div className="w-1/3 h-full flex flex-col gap-1 pl-1">
                  {data.media.slice(1, 3).map((img, idx) => (
                    <div key={idx} className="relative h-1/2 w-full overflow-hidden rounded">
                      <img
                        src={`http://localhost:3000/public/uploads/businesses/images/${img}`}
                        alt={`side-img-${idx}`}
                        className="w-full h-full object-cover"
                        onClick={() => setShowGallery(true)}
                      />
                      {idx === 1 && data.media.length > 3 && (
                        <div
                          className="absolute inset-0 bg-gray-900/50 flex items-center justify-center text-white font-semibold text-xl rounded"
                          onClick={() => setShowGallery(true)}
                        >
                          +{data.media.length - 3}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>


          {/* Content container */}
          <div className="flex-1 p-5 relative overflow-hidden">
            <div className="pr-24 space-y-3 text-gray-600 text-sm">
              <div className="flex items-start justify-between mb-2">

                <h3 className="text-lg font-semibold text-gray-900">{data.businessName}</h3>
                <span className="bg-amber-50 text-amber-700 text-xs px-2 py-1 rounded-full uppercase tracking-wider">{data.category}</span>
              </div>
              <p className="flex items-start">
                <svg className="h-5 w-5 text-gray-400 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {data.address}
              </p>
              <p className="flex items-start">
                <svg className="h-5 w-5 text-gray-400 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {data.phoneNumber}
              </p>
              <p className="flex items-start">
                <svg className="h-5 w-5 text-gray-400 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="flex items-start text-sm text-gray-600 break-words">
                  {truncateDescription(data.description)}
                </p>

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

              {data.verify?.status === "pending" && (
                <button
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-green-50 border border-green-200 text-green-600 hover:bg-green-100 transition-colors shadow-sm"
                  onClick={() => confirmChangeStatus('approved')}
                  title="Approve"
                >
                  <FontAwesomeIcon icon={faCheck} />
                </button>
              )}

              <button
                className="w-10 h-10 flex items-center justify-center rounded-full bg-red-50 border border-red-200 text-red-500 hover:bg-red-100 transition-colors shadow-sm"
                onClick={() => confirmChangeStatus('rejected')}
                title="Reject"
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
          </div>
        </div>
      </div>



      {/* Document Modal */}
      {showDocs && (
        <div className="fixed inset-0 flex justify-center items-center z-50 p-4 bg-black/30 ">
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

      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-[350px]">
            <div className='flex items-center justify-between mb-4 pb-3 border-b border-gray-200'>
              <h2 className="text-lg font-bold text-gray-800">Confirm Status Change</h2>
            </div>

            <p className="text-gray-600 mt-2">
              Are you sure you want to{" "}
              <span className={`font-semibold ${pendingStatus === 'approved' ? 'text-green-600' : 'text-red-500'}`}>
                {pendingStatus}
              </span>{" "}
              this business?
            </p>


            {pendingStatus === 'rejected' && (
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Reason for rejection
                </label>
                <textarea
                  rows={3}
                  className={`w-full border rounded-md p-2 text-sm text-gray-800 focus:ring-amber-500 focus:border-amber-500 ${rejectError ? 'border-red-500' : ''}`}
                  placeholder="Please provide reason..."
                  value={rejectDescription}
                  onChange={(e) => {
                    setRejectDescription(e.target.value);
                    setRejectError(""); // เคลียร์ error เมื่อผู้ใช้เริ่มพิมพ์
                  }}
                />
                {rejectError && <p className="text-red-500 text-sm mt-1">{rejectError}</p>}

              </div>
            )}

            <div className="mt-4 flex justify-end space-x-3">
              <button
                className="bg-gray-300 text-white px-4 py-2 rounded"
                onClick={() => {
                  setShowConfirm(false);
                  setPendingStatus(null);
                  setRejectDescription(""); // reset
                }}
              >
                Cancel
              </button>
              <button
                className={`px-4 py-2 rounded text-white ${pendingStatus === 'approved' ? 'bg-green-600' : 'bg-red-600'}`}
                onClick={async () => {
                  if (pendingStatus === 'rejected' && rejectDescription.trim() === "") {
                    setRejectError("Please provide a reason for rejection.");
                    return; // ❌ ไม่ให้ดำเนินการต่อถ้าไม่ได้กรอก
                  }

                  try {
                    await handleStatusChange(pendingStatus);
                    await fetchData();
                    setShowConfirm(false);
                    setPendingStatus(null);
                    setRejectDescription("");
                    setRejectError(""); // reset error
                  } catch (error) {
                    console.error('Failed to update status', error);
                  }
                }}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}



      {showGallery && (
        <PictureShow
          images={data.media}
          onClose={() => setShowGallery(false)}
        />
      )}
    </>
  );
};

export default BoxBusiness;