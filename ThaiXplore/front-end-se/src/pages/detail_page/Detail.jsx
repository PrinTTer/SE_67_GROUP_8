import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useParams } from 'react-router-dom';

import {  faFileInvoice } from '@fortawesome/free-solid-svg-icons';
import { getBusiness } from '../../data';
import { faBed, faStar } from '@fortawesome/free-solid-svg-icons';
import { RightSideBar } from './component/RightBar';
import { Service } from './component/Service';
 import  {QuotationPopUp}  from './component/QuotationPopUp';
import { useState, useEffect } from 'react';
import axios from 'axios';
import LoadingSpinner from '../../components/LoadingSpinner';


function Detail() {
  const { id } = useParams()
  const business = getBusiness("Hotel A")
 
  const [show, setShow] = useState(true)
  const [showPopup, setShowPopup] = useState(false);


 

  //fetch from axios

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchData = async () => {
    try {
      setLoading(true);

      const res = await axios.get(`http://localhost:3000/businesses/${id}`, { withCredentials: true });
      const data_format = await res.data;
      console.log("Here");
      console.log(data_format);
      setData(data_format);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    
  }, []);

  const [head, setHead] = useState(data?.business?.category)
   const toggle = (prop) => {
    const { title } = prop
    if (head != title) {
      setShow(!show)
    }
    setHead(title)

  };

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

        <div className='flex-4 grid  grid-cols-3 grid-rows-2 gap-2 m-4'>
          <img className="w-full h-100  object-cover row-span-2" src={business.image.main} />
          <img className="w-full h-48 object-cover" src={business.image.second} />
          <img className="w-full h-48 object-cover" src={business.image.thrid} />
          <img className="w-full h-48 object-cover col-span-2" src={business.image.fourth} />
        </div>


        <div className='flex flex-2 m-5'>
          <div className='flex-2 '>
            <p className='font-bold text-2xl'>{data?.business?.businessName}</p>
            <p>{data?.business?.address}</p>

          </div>
          <div className='flex flex-2 justify-end'>


            <Link >
              <div className="flex  gap-2 mt-1 shadow-md  rounded-full h-8 w-auto justify-center items-center p-5 mr-2 bg-blue-400" onClick={() => setShowPopup(true)}>
                <FontAwesomeIcon icon={faFileInvoice} />
                <p>Request Quotation</p>
              </div>
            </Link>
            {showPopup && <QuotationPopUp onClose={() => setShowPopup(false)} serviceBusiness={data?.services}/>}




          </div>
        </div>
        <div className='flex-6  bg-[#F1F5F9]'>
          <div className='m-4'>
            {/* Tab */}
            <div className='flex   rounded  gap-5 ml-2'>
              <div className=' px-5 py-2 rounded-t-lg    bg-yellow-50 cursor-pointer ' onClick={() => toggle({ title: data?.business?.category })} >{data?.business?.category}</div>
              <div className=' px-5 py-2 rounded-t-lg    bg-yellow-50 cursor-pointer ' onClick={() => toggle({ title: "Package" })}>Package</div>
            </div>
            {/* Info */}
            <div className={show ? 'block' : 'hidden'}>
              {
                data?.details?.map((element, index) => {

                  return <Info key={index} infoTitle={element} />
                })
              }
              <Service title={data.services} category={data?.business?.category} id={data?.business?._id} />
            </div>



          </div>
        </div>

      </div>

      {/* Right Bar */}
      <RightSideBar type={data?.business?.category} />

    </>
  )
}



const Info = (prop) => {
  const { infoTitle } = prop
  const { title } = useParams();
  console.log(title)

  return (
    <div className="p-4 rounded-lg gap-5 mb-5 bg-yellow-50 shadow-md border border-gray-300">
      {/* map detail */}
      <div className="col-span-2 border-b-2 p-2 flex items-center font-bold">
        <FontAwesomeIcon icon={faBed} className="mr-3 text-lg" />
        <span>{infoTitle.informationName}</span>
      </div>


      <div className={`grid ${Array.isArray(infoTitle.details) ? "grid-cols-2" : "grid-cols-1"} gap-4 p-2`}>
        {infoTitle.details.map((element, index) => {
          return (
            <div key={index} className="flex items-center">
              <FontAwesomeIcon icon={faStar} className="mr-3 text-lg" />
              <span>{element}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};




export default Detail;
