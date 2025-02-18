import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useParams } from 'react-router-dom';
import {NavBarWithOutText  } from '../../component/navbar' ;
import {  faPlus,faFileInvoice } from '@fortawesome/free-solid-svg-icons';
import { getBusiness,getInfo,getBusinessDescription} from '../../data';
import { faBed,faStar } from '@fortawesome/free-solid-svg-icons';
import { RightSideBar } from './component/RightBar' ;
import { Service } from './component/Service' ;
import { useState } from 'react';



function Detail() {
  const {title}  = useParams()
  const business = getBusiness(title)
  const ArrTitle = getInfo(business)
  const [show, setShow] = useState(true)
  const [head, setHead] = useState(business.type)
  const toggle = (prop) => {
    const {title} = prop
    if(head != title){
      setShow(!show)
    }
    setHead(title)
    
  };
  return (
    <div className = "flex flex-1 flex-col-reverse lg:flex-row ">
      
      <NavBarWithOutText />

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
                          <p className='font-bold text-2xl'>{title}</p> 
                          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </div>
                      <div className='flex flex-2 justify-end'>
                            
                                
                                  <Link >
                                      <div className="flex  gap-2 mt-1 shadow-md  rounded-full h-8 w-auto justify-center items-center p-5 mr-2 bg-blue-400">
                                        <FontAwesomeIcon icon={faFileInvoice} />
                                        <p>Request Quotation</p>
                                      </div>
                                  </Link>
                                
                            
                            
                                
                                <Link>
                                      <div className="flex  gap-2 mt-1 shadow-md  rounded-full h-8 w-auto justify-center items-center p-5 bg-blue-400 mr-1">
                                        <FontAwesomeIcon icon={faPlus} />
                                        <p>Follow</p>
                                      </div>
                                </Link>
                                
                            
                      </div>
                </div>
                <div className='flex-6  bg-[#F1F5F9]'>
                  <div className='m-4'>
                     {/* Tab */}
                      <div className='flex   rounded  gap-5 ml-2'>
                          <div  className=' px-5 py-2 rounded-t-lg    bg-yellow-50 cursor-pointer ' onClick={() => toggle({ title: business.type })} >{business.type}</div>
                          <div  className=' px-5 py-2 rounded-t-lg    bg-yellow-50 cursor-pointer ' onClick={() => toggle({ title: "News&Package" })}>News&Package</div>
                      </div>
                      {/* Info */}
                      <div className={show ? 'block' : 'hidden'}>
                        {
                        ArrTitle.map((element,index)=>{
  
                          return <Info key={index} infoTitle={element}/>
                        })
                       } 
                       <Service title={title} />
                      </div>
                      <div className={!show ? 'block' : 'hidden'}>
                        <Service title={title} />
                      </div>
                       
                        
                  </div>
                </div>
          
      </div>     
     
      {/* Right Bar */}
        <RightSideBar type={business.type} />
      
    </div>
  )
}



const Info = (prop) => {
  const { infoTitle } = prop
  const { title } = useParams();
  const descriptionList = getBusinessDescription({ title, infoTitle });

  return (
    <div className="p-4 rounded-lg gap-5 mb-5 bg-yellow-50 shadow-md border border-gray-300">
      
      <div className="col-span-2 border-b-2 p-2 flex items-center font-bold">
        <FontAwesomeIcon icon={faBed} className="mr-3 text-lg" />
        <span>{infoTitle}</span>
      </div>

      
      <div className={`grid ${Array.isArray(descriptionList) ? "grid-cols-2" : "grid-cols-1"} gap-4 p-2`}>
        {Array.isArray(descriptionList) ? (
          descriptionList.map((item, index) => (
            
            <div key={index} className="text-gray-700">
                  {index == 2 && infoTitle == "Hotel Information" &&(
                  <FontAwesomeIcon icon={faStar} className="mr-2" />
                )}
              {item}
            </div>
          ))
        ) : (
          <p className="text-gray-700">{descriptionList}</p>
        )}
      </div>
    </div>
  );
};




export default Detail;
