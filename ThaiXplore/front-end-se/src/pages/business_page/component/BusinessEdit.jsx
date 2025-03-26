import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import {  useState  } from 'react';
import { ModalEditBusiness , ModalEditImage } from './ModalBusinessEdit';



export const BusinessEdit = (prop) => {
  const { business , fetchBusiness } = prop;
  const [isModalOpen, setIsModalOpen] = useState(false); // สถานะของ pop-up
  const [isImageOpen, setIsImageOpen] = useState(false); // สถานะของ pop-up

  const [showMore, setShowMore] = useState(false);
  
  const maxLength = 200;

  const isLong = business?.business?.description.length > maxLength;
  const openImage = () => {
    console.log("Opening modal");
    setIsImageOpen(true); // เปิด modal
  };
  
  const closeImage = () => {
    console.log("Closing modal");
    setIsImageOpen(false); // ปิด modal
  };
    


  const openModal = () => {
    console.log("Opening modal");
    setIsModalOpen(true); // เปิด modal
  };
  
  const closeModal = () => {
    console.log("Closing modal");
    setIsModalOpen(false); // ปิด modal
  };
  
  // ตรวจสอบค่าของ business ก่อนแสดงผล
  if (!business?.business) {
    return <div>Error: No business data available</div>;
  }
  

  return (
    <div className="m-9">
      {/* 1 Image */}
      <div className={`grid grid-cols-1 ${business?.business?.media?.length === 1 ? 'block' : 'hidden'}`}>
        <img
          src={`http://localhost:3000/public/uploads/businesses/images/${business?.business?.media[0]}`}
          alt="Business Image"
          className="w-full h-[400px] object-cover"
        />
      </div>

      {/* No Image */}
      <div className={`col-span-2 ${business?.business?.media?.length === 0 ? 'block' : 'hidden'}`}>
        <img
          src="https://st2.depositphotos.com/1561359/12101/v/950/depositphotos_121012076-stock-illustration-blank-photo-icon.jpg"
          alt="Business Image"
          className="w-full h-[400px] object-cover"
        />
      </div>

      {/* Image Gallery if there are 3 images */}
      <div className={`${business?.business?.media?.length > 2 ? 'block' : 'hidden'}`}>
        <ImageGallery images={business?.business?.media} />
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
                {showMore ? 'See less' : 'See more'}
              </span>
            )}
          </div>
        </div>
        <div className=" justify-end flex   items-start gap-5 ">
          <button
            onClick={openModal} // เมื่อกดปุ่มเปิด modal
            className="bg-[#ffab2edc] text-white  w-40 h-15 rounded-full font-bold flex flex-row justify-center items-center gap-3 "
          >
            <FontAwesomeIcon icon={faPenToSquare} />
            <div>Edit Business</div>
          </button>
          <button
            onClick={openImage} // เมื่อกดปุ่มเปิด modal
            className="text-[#ffab2edc]   w-40 h-15 rounded-full font-bold flex flex-row justify-center items-center gap-3 border-2"
          >
            <FontAwesomeIcon icon={faPenToSquare}  />
            <div >Edit Image</div>
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
    </div>
  );
};

const ImageGallery = (prop) => {
  const { images  } = prop;
  const [showAll, setShowAll] = useState(false);

  // ตรวจสอบว่า images ไม่เป็น undefined และเป็น Array ก่อนใช้งาน
  const displayedImages = showAll 
    ? images 
    : (Array.isArray(images) ? images.slice(0, 3) : []);
  const totalImages = Array.isArray(images) ? images.length : 0;

 

  return (
    <div>
      <div className="grid grid-cols-3 gap-4 m-9">
        {displayedImages.map((image, index) => (
          <div key={index} className="relative">
            <img
              src={`http://localhost:3000/public/uploads/businesses/images/${image}`}
              alt={`Business Image ${index + 1}`}
              className="w-full h-[200px] object-cover rounded-lg"
            />
          </div>
        ))}
      </div>

      {totalImages > 3 && (
        <div className="text-center mt-4">
          <button
            onClick={() => setShowAll(!showAll)}
            className="text-blue-500 font-medium"
          >
            {showAll ? 'ดูน้อยลง' : `See All ${totalImages} Images`}
          </button>
        </div>
      )}
    </div>
  );
};













