import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useParams } from 'react-router-dom';
import {NavBarWithOutText  } from '../../component/navbar' ;
import {  faMessage,faFileInvoice } from '@fortawesome/free-solid-svg-icons';
import { useState } from "react";

import { faBed, faStar } from "@fortawesome/free-solid-svg-icons";


function Detail() {
  const {title}  = useParams()
  
  return (
    <div className = "flex flex-1 flex-row">
      
      <NavBarWithOutText />

     
      <div className='flex flex-4 flex-col m-5'>
          
        <div className='flex-4  bg-amber-100'>

        </div>
        <div className='flex flex-2 m-5'>
            <div className='flex-2 '>
                  <p className='font-bold text-2xl'>{title}</p> 
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
            <div className='flex flex-2 justify-end'>
                  
                      
                        <Link >
                            <div className="flex  gap-2 mt-1 shadow-md  rounded-full h-8 w-auto justify-center items-center p-5 mr-2 bg-blue-500">
                              <FontAwesomeIcon icon={faFileInvoice} />
                              <p className=" leading-none">Quotation</p>
                            </div>
                        </Link>
                      
                  
                  
                      
                      <Link>
                            <div className="flex  gap-2 mt-1 shadow-md  rounded-full h-8 w-auto justify-center items-center p-5 bg-blue-500 mr-1">
                              <FontAwesomeIcon icon={faMessage} />
                              <p className=" leading-none">Chat</p>
                            </div>
                      </Link>
                      
                  
            </div>
        </div>
        <div className='flex-6  m-5'>
              <DetailTabs />
              
        </div>
          
            
        </div>

      <div className="flex flex-1 flex-col  items-center border-solid border-l-2 sticky top-0 h-screen">
        <input type="text" className='bg-amber-50 rounded-4xl border-1 mt-4'/>
      </div>
      
    </div>
  )
}

const Info =({title})=>{
  return(
    <div className='border m-4 rounded p-2'>
        <h1>{title}</h1>
      

    </div>
  );
}

const DetailTabs = () => {
  const [activeTab, setActiveTab] = useState("Accommodation");

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Tabs */}
      <div className="flex  justify-start gap-4 ">
        {["Accommodation", "News & Package"].map((tab) => (
          <button className='py-2 px-6 text-sm font-medium rounded-t-lg bg-gray-300' onClick={() => setActiveTab(tab)}>
            {tab}
          </button>
        ))}
      </div>

      {/* Content Box */}
      <div className="bg-gray-300 p-4 rounded-b-lg">
        <div className="flex items-center border-b pb-2 font-semibold">
          <FontAwesomeIcon icon={faBed} className="mr-2 text-lg" />
          Hotel Information
        </div>

        <div className="grid grid-cols-2 gap-4 mt-2 text-sm">
          <div className="flex items-center">
            <FontAwesomeIcon icon={faStar} className="mr-2 text-lg" />
            <span>Hotel Standard</span>
          </div>
          <div className="text-right">Total number of rooms</div>

          <div className="ml-6">⭐ 3 Stars</div>
          <div className="text-right">60 Units</div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
