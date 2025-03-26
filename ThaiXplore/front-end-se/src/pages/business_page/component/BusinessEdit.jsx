import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import {  useState  } from 'react';
import { ModalEditBusiness , ModalEditImage } from './ModalBusinessEdit';
import PictureShow from '../../businessmanage_page/component/picture_show';


export const BusinessEdit = (prop) => {
  const { business, fetchBusiness } = prop;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isImageOpen, setIsImageOpen] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const [showMore, setShowMore] = useState(false);

  const maxLength = 200;
  const media = business?.business?.media || [];
  const isLong = business?.business?.description.length > maxLength;

  const openImage = () => {
    console.log("Opening modal");
    setIsImageOpen(true);
  };

  const closeImage = () => {
    console.log("Closing modal");
    setIsImageOpen(false);
  };

  const openModal = () => {
    console.log("Opening modal");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    console.log("Closing modal");
    setIsModalOpen(false);
  };

  // ตรวจสอบค่าของ business ก่อนแสดงผล
  if (!business?.business) {
    return <div>Error: No business data available</div>;
  }

  return (
    <div className="m-9">
      {/* 1 Image */}
      <div
        className={`grid grid-cols-1 ${business?.business?.media?.length === 1 ? "block" : "hidden"}`}
      >
        <img
          src={`http://localhost:3000/public/uploads/businesses/images/${business?.business?.media[0]}`}
          alt="Business Image"
          className="w-full h-[400px] object-cover"
          onClick={() => setShowGallery(true)}
        />
      </div>

      {/* No Image */}
      <div
        className={`col-span-2 ${business?.business?.media?.length === 0 ? "block" : "hidden"}`}
      >
        <img
          src="https://st2.depositphotos.com/1561359/12101/v/950/depositphotos_121012076-stock-illustration-blank-photo-icon.jpg"
          alt="Business Image"
          className="w-full h-[400px] object-cover"
          onClick={() => setShowGallery(true)}
        />
      </div>

      {/* Image Gallery if there are 2 images */}
      <div className={`${business?.business?.media?.length === 2 ? "block" : "hidden"}`}>
        <div className="grid grid-cols-2 gap-2">
          {media.slice(0, 2).map((img, idx) => (
            <div key={idx} className="w-full h-[400px] overflow-hidden rounded">
              <img
                src={`http://localhost:3000/public/uploads/businesses/images/${img}`}
                alt={`img-${idx}`}
                className="w-full h-full object-cover"
                onClick={() => setShowGallery(true)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Image Gallery if there are 3 or more images */}
      <div className={`${business?.business?.media?.length >= 3 ? "block" : "hidden"}`}>
      <div className="flex h-full w-full">
        {/* รูปซ้ายใหญ่ (ภาพแรก) */}
        <div className="w-2/3 h-full overflow-hidden rounded-l-lg">
          {media[0] && (
            <img
              src={`http://localhost:3000/public/uploads/businesses/images/${media[0]}`}
              alt="main-img"
              className="w-full h-full object-cover" // เพิ่ม object-cover เพื่อให้รูปภาพไม่ผิดสัดส่วน
              onClick={() => setShowGallery(true)}
            />
          )}
        </div>

        {/* รูปขวา 2 ช่องซ้อน */}
        <div className="w-1/3 h-full flex flex-col gap-1 pl-1">
          {media.slice(1, 3).map((img, idx) => (
            <div key={idx} className="relative h-1/2 w-full overflow-hidden rounded">
              <img
                src={`http://localhost:3000/public/uploads/businesses/images/${img}`}
                alt={`side-img-${idx}`}
                className="w-full h-full object-cover" // เพิ่ม object-cover เพื่อให้รูปภาพไม่ผิดสัดส่วน
                onClick={() => setShowGallery(true)}
              />
              {/* Overlay ถ้ามีรูปเหลือ */}
              {idx === 1 && media.length > 3 && (
                <div
                  className="absolute inset-0 bg-gray-900/50 flex items-center justify-center text-white font-semibold text-xl rounded"
                  onClick={() => setShowGallery(true)}
                >
                  +{media.length - 3}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      </div>

      <div className="grid grid-cols-2 mt-3">
        <div>
          <div className="font-bold text-2xl">{business?.business?.businessName}</div>
          <div className="font-semibold">{business?.business?.address}</div>
          <div className="text-gray-500">
            {isLong && !showMore
              ? `${business?.business?.description.substring(0, maxLength)}...`
              : business?.business?.description}
            {isLong && (
              <span
                onClick={() => setShowMore(!showMore)}
                className="text-blue-500 cursor-pointer ml-1"
              >
                {showMore ? "See less" : "See more"}
              </span>
            )}
          </div>
        </div>
        <div className="justify-end flex items-start gap-5">
          <button
            onClick={openModal}
            className="bg-[#ffab2edc] text-white w-40 h-15 rounded-full font-bold flex flex-row justify-center items-center gap-3"
          >
            <FontAwesomeIcon icon={faPenToSquare} />
            <div>Edit Business</div>
          </button>
          <button
            onClick={openImage}
            className="text-[#ffab2edc] w-40 h-15 rounded-full font-bold flex flex-row justify-center items-center gap-3 border-2"
          >
            <FontAwesomeIcon icon={faPenToSquare} />
            <div>Edit Image</div>
          </button>
        </div>
      </div>

      {/* Modal Popup */}
      {isModalOpen && (
        <ModalEditBusiness
          closeModal={closeModal}
          business={business?.business}
          fetchBusiness={fetchBusiness}
        />
      )}
      {isImageOpen && (
        <ModalEditImage
          closeModal={closeImage}
          business={business?.business}
          fetchBusiness={fetchBusiness}
        />
      )}

      {showGallery && (
        <PictureShow
          images={media}
          onClose={() => setShowGallery(false)}
        />
      )}
    </div>
  );
};













