import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useParams } from "react-router-dom";

import {  faFileInvoice } from '@fortawesome/free-solid-svg-icons';
import { getBusiness } from '../../data';
import { faBed, faStar } from '@fortawesome/free-solid-svg-icons';
import { RightSideBar } from './component/RightBar';
import { Service } from './component/Service';
 import  {QuotationPopUp}  from './component/QuotationPopUp';
import { useState, useEffect } from 'react';
import axios from 'axios';
import LoadingSpinner from '../../components/LoadingSpinner';
import { fetchData } from '../../services/apiService';


function Detail(prop) {
  const {socketRef} = prop;
  const maxLength = 200;
  const { id } = useParams()
  // const business = getBusiness("Hotel A")
  const { user } = useSelector((state) => state.auth);
  // const socketRef = useSocket(user);
  const [show, setShow] = useState(true)
function Detail() {
  const { id } = useParams();
  const business = getBusiness("Hotel A");

  const [show, setShow] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [showMore, setShowMore] = useState(false);


  const safeDateGMT7 = (dateString) => {
    const date = new Date(dateString);

    date.setHours(date.getHours() + 7);
    return date.toISOString().slice(0, 16); // รูปแบบ "yyyy-MM-ddTHH:mm"
  };




  //fetch from axios

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [media, setMedia] = useState([])
  const [packages, setPackages] = useState([]);

  const fetch = async () => {
    try {
      setLoading(true);
      const data_format = await fetchData(`/businesses/${id}`);
      const pkgData = await fetchData(`/packages/business/${id}`);
      setPackages(pkgData);

      setData(data_format);

      setMedia(data_format?.business?.media)
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const PackageCard = ({ item }) => {
    const imageUrl = item.media?.[0]
      ? `http://localhost:3000/public/uploads/services/packages/${item.media[0]}`
      : null;
  
    return (
      <div className="p-4 rounded-lg gap-5 mb-5 bg-yellow-50 shadow-md border border-gray-300">
        {imageUrl && (
          <div className="mb-4 rounded-lg overflow-hidden">
            <img
              src={imageUrl}
              alt={item.title}
              className="w-full h-48 object-cover"
            />
          </div>
        )}
  
        <div className="border-b-2 p-2 flex items-center font-bold mb-4">
          <FontAwesomeIcon icon={faBed} className="mr-3 text-lg" />
          <span>{item.title}</span>
        </div>
  
        <div className="grid grid-cols-2 gap-4 p-2">
          <div className="flex items-center">
            <FontAwesomeIcon icon={faStar} className="mr-3 text-lg" />
            <strong>Price:</strong> ฿{item.price}
          </div>
          <div className="flex items-center">
            <FontAwesomeIcon icon={faStar} className="mr-3 text-lg" />
            <strong>Quantity:</strong> {item.totalPackage}
          </div>
          <div className="flex items-center">
            <FontAwesomeIcon icon={faStar} className="mr-3 text-lg" />
            <strong>Valid:</strong> {item.totalExpirationDate} days
          </div>
          <div className="flex items-center">
            <FontAwesomeIcon icon={faStar} className="mr-3 text-lg" />
            <strong>Period:</strong> {new Date(item.startDate).toLocaleDateString()} - {new Date(item.endDate).toLocaleDateString()}
          </div>
        </div>
  
        <div className="mt-4">
          <p className="text-gray-600 mb-4">{item.description}</p>
        </div>
  
        <div className="flex justify-end">
          <Link
            to={`/detailpackage/${item._id}`}
            className="flex gap-2 mt-1 shadow-md rounded-full h-8 w-auto justify-center items-center p-5 mr-2 bg-blue-400 text-white font-bold"
          >
            <FontAwesomeIcon icon={faFileInvoice} />
            <span>View Details</span>
          </Link>
        </div>
      </div>
    );
  };
  
  
  

  const [showGallery, setShowGallery] = useState(false);


  const [bookingDetail, setBookingDetail] = useState({
    adult: 1,
    child: 0,
    bookingAmount: 1,
    AmountDay: 1,
    startDate: safeDateGMT7(new Date()),  // ปรับเวลาที่นี่ให้ตรงกับ GMT+7
    endDate: safeDateGMT7(new Date()),    // ปรับเวลาที่นี่ให้ตรงกับ GMT+7
    time: "",
    Business: data
  });



  useEffect(() => {
    fetch();
  }, []); // fetch จะถูกเรียกเมื่อคอมโพเนนต์แรกเริ่มทำงาน

  useEffect(() => {
    // อัปเดต bookingDetail เมื่อ data ถูกดึงมาแล้ว
    if (data) {
      setBookingDetail((prevState) => ({
        ...prevState,
        Business: data, // อัปเดต Business ด้วย data ที่ได้รับ
      }));
    }
  }, [data]);

  const [head, setHead] = useState(data?.business?.category)
  const toggle = (prop) => {
    const { title } = prop
  const [head, setHead] = useState(data?.business?.category);
  const toggle = (prop) => {
    const { title } = prop;
    if (head != title) {
      setShow(!show);
    }
    setHead(title);
  };

  // const descriptions = {
  //   informationName: "description",
  //   details: [data?.business?.description]
  // }


  console.log("this->", data);
  const isLong = data?.business?.description.length > maxLength;

  console.log("this->", data);

  if (loading) {
    return (
      <div className="flex flex-col flex-4 p-4 min-h-[300px] bg-white rounded-lg shadow-md">
        <LoadingSpinner />
      </div>
    );
  }



  if (error) return <p className="text-red-500">Error: {error}</p>;




  return (
    <>
      {/* Mid Bar */}
      <div className='flex flex-4 flex-col '>

        {/* 1 Image */}
        <div
          className={`grid grid-cols-1 ${data?.business?.media?.length === 1 ? "block" : "hidden"}`}
        >
          <img
            src={`http://localhost:3000/public/uploads/businesses/images/${data?.business?.media[0]}`}
            alt="Business Image"
            className="w-full h-[400px] object-cover"
            onClick={() => setShowGallery(true)}
          />
        </div>

        {/* No Image */}
        <div
          className={`col-span-2 ${data?.business?.media?.length === 0 ? "block" : "hidden"}`}
        >
          <img
            src="https://st2.depositphotos.com/1561359/12101/v/950/depositphotos_121012076-stock-illustration-blank-photo-icon.jpg"
            alt="Business Image"
            className="w-full h-[400px] object-cover"
            onClick={() => setShowGallery(true)}
          />
        </div>

        {/* Image Gallery if there are 2 images */}
        <div className={`${data?.business?.media?.length === 2 ? "block" : "hidden"}`}>
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
        <div className={`${data?.business?.media?.length >= 3 ? "block" : "hidden"}`}>
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

      <div className="flex flex-4 flex-col ">
        <div className="flex-4 grid  grid-cols-3 grid-rows-2 gap-2 m-4">
          <img
            className="w-full h-100  object-cover row-span-2"
            src={business.image.main}
          />
          <img
            className="w-full h-48 object-cover"
            src={business.image.second}
          />
          <img
            className="w-full h-48 object-cover"
            src={business.image.thrid}
          />
          <img
            className="w-full h-48 object-cover col-span-2"
            src={business.image.fourth}
          />
        </div>

        {showGallery && (
          <PictureShow
            images={media}
            onClose={() => setShowGallery(false)}
          />
        )}



        <div className='flex flex-2 m-5'>
          <div className='flex-2 '>
            <p className='font-bold text-2xl'>{data?.business?.businessName}</p>
            <p>{data?.business?.address.replace(/,/g, " ")}</p>
            <div>
              <div className="text-gray-500">
                {isLong && !showMore
                  ? `${data?.business?.description.substring(0, maxLength)}...`
                  : data?.business?.description}
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
        <div className="flex flex-2 m-5">
          <div className="flex-2 ">
            <p className="font-bold text-2xl">{data?.business?.businessName}</p>
            <p>{data?.business?.address}</p>
          </div>
          <div className='flex flex-2 justify-end'>

            {
              user?.role !== "tourist" ?
                (
                  <div className="flex cursor-pointer  gap-2 mt-1 shadow-md  rounded-full h-8 w-auto justify-center items-center p-5 mr-2 bg-blue-400 text-white font-bold" onClick={() => setShowPopup(true)}>
                    <FontAwesomeIcon icon={faFileInvoice} />
                    <p>Request Quotation</p>
                  </div>
                )
                :
                (<></>)
            }

            {showPopup && <QuotationPopUp socketRef={socketRef} onClose={() => setShowPopup(false)} business={data} serviceBusiness={data?.services} />}




          <div className="flex flex-2 justify-end">
            <Link>
              <div
                className="flex  gap-2 mt-1 shadow-md  rounded-full h-8 w-auto justify-center items-center p-5 mr-2 bg-blue-400 text-white font-bold"
                onClick={() => setShowPopup(true)}
              >
                <FontAwesomeIcon icon={faFileInvoice} />
                <p>Request Quotation</p>
              </div>
            </Link>
            {showPopup && (
              <QuotationPopUp
                onClose={() => setShowPopup(false)}
                serviceBusiness={data?.services}
              />
            )}
          </div>
        </div>
        <div className="flex-6  bg-[#F1F5F9]">
          <div className="m-4">
            {/* Tab */}
            <div className="flex   rounded  gap-5 ml-2">
              <div
                className=" px-5 py-2 rounded-t-lg    bg-yellow-50 cursor-pointer "
                onClick={() => toggle({ title: data?.business?.category })}
              >
                {data?.business?.category}
              </div>
              <div
                className=" px-5 py-2 rounded-t-lg    bg-yellow-50 cursor-pointer "
                onClick={() => toggle({ title: "Package" })}
              >
                Package
              </div>
            </div>
            {/* Info & Service */}

            <div className={show ? 'block' : 'hidden'}>
              {
                data?.details?.map((element, index) => {
                  return <Info key={index} infoTitle={element} category={data?.business?.category} />
                })
              }
              <Service title={data.services} category={data?.business?.category} id={data?.business?._id} bookingDetail={bookingDetail} />
            <div className={show ? "block" : "hidden"}>
              {data?.details?.map((element, index) => (
                <Info key={index} infoTitle={element} />
              ))}
              <Service
                title={data.services}
                category={data?.business?.category}
                id={data?.business?._id}
              />
            </div>

            <div className={!show ? "block" : "hidden"}>
              {packages.length > 0 ? (
                packages.map((pkg, idx) => <PackageCard key={idx} item={pkg} />)
              ) : (
                <p className="text-gray-500 p-4">No packages available.</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Right Bar */}
      <RightSideBar type={data?.business?.category} bookingDetail={bookingDetail} />

      <RightSideBar type={data?.business?.category} />
    </>
  );
}

const Info = (prop) => {
  const { infoTitle, category } = prop;
  const { infoTitle } = prop;
  const { title } = useParams();
  console.log("param=>", category);

  const checkCategory = () => {
    switch (category) {
      case "hotel":
        return faBed;
      case "event":
        return faCalendar;
      case "restaurant":
        return faBowlFood;
      case "carRental":
        return faCar;
      default:
        return null; // หากไม่ตรงกับ category ใดๆ
    }
  };

  const isValidArray = Array.isArray(infoTitle.details) && infoTitle.details.length > 0;
  console.log(title);

  return (
    <div className="p-4 rounded-lg gap-5 mb-5 bg-[#FAFAD2] shadow-md ">
      <div className="col-span-2 border-b-2 border-[#D2691E] p-2 flex items-center font-bold text-[#6B4423]">
        <FontAwesomeIcon icon={checkCategory()} className="mr-3 text-lg text-[#D2691E]" />
        <span>{infoTitle.informationName}</span>
      </div>

      <div className={`grid ${isValidArray ? "grid-cols-2" : "grid-cols-1"} gap-4 p-2`}>
        {isValidArray ? (
          infoTitle.details.map((element, index) => (
            <div key={index} className="flex items-center text-[#6B4423]">
            {infoTitle.informationName.includes('Working') ? (
              <div className='grid grid-cols-2 gap-3 bg-white p-3 px-5 rounded-full shadow-md'>
                <div className="text-[#8B4513]">
                  {element && typeof element === 'string' ? element.replace(",", " ").split(" ")[0] : ""}
                </div>
                <div className="text-[#8B4513]">
                  {element && typeof element === 'string' ? element.replace(",", " ").replace(",", "-").split(" ")[1] : ""}
                </div>
              </div>
            ) : (
              <div className="text-[#8B4513]">{element}</div>
            )}

      <div
        className={`grid ${
          Array.isArray(infoTitle.details) ? "grid-cols-2" : "grid-cols-1"
        } gap-4 p-2`}
      >
        {infoTitle.details.map((element, index) => {
          return (
            <div key={index} className="flex items-center">
              <FontAwesomeIcon icon={faStar} className="mr-3 text-lg" />
              <span>{element}</span>
            </div>
          ))
        ) : (
          <div className="text-[#8B4513]">Not Found Information</div>
        )}
      </div>
    </div>
  );
};





export default Detail;
