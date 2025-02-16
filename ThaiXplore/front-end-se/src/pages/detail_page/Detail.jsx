import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useParams } from 'react-router-dom';
import {NavBarWithOutText  } from '../../component/navbar' ;
import {  faPlus,faFileInvoice } from '@fortawesome/free-solid-svg-icons';
import { getBusiness,getInfo,getBusinessDescription} from '../../data';
import { faBed,faStar } from '@fortawesome/free-solid-svg-icons';



function Detail() {
  const {title}  = useParams()
  const business = getBusiness(title)
  const ArrTitle = getInfo(business)
  
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
                                      <div className="flex  gap-2 mt-1 shadow-md  rounded-full h-8 w-auto justify-center items-center p-5 mr-2 bg-blue-500">
                                        <FontAwesomeIcon icon={faFileInvoice} />
                                        <p className=" leading-none">Quotation</p>
                                      </div>
                                  </Link>
                                
                            
                            
                                
                                <Link>
                                      <div className="flex  gap-2 mt-1 shadow-md  rounded-full h-8 w-auto justify-center items-center p-5 bg-blue-500 mr-1">
                                        <FontAwesomeIcon icon={faPlus} />
                                        <p className=" leading-none">Follow</p>
                                      </div>
                                </Link>
                                
                            
                      </div>
                </div>
                <div className='flex-6  bg-[#F1F5F9]'>
                  <div className='m-4'>
                      <Tab type={business.type}/> 
                       {
                        ArrTitle.map((element)=>{
                                  
                                  // eslint-disable-next-line react/jsx-key
                                  return <Info infoTitle={element}/>
                        })
                       }  
                        
                  </div>
                </div>
          
      </div>     
     
      {/* Right Bar */}
      <div className="flex flex-1 flex-col  items-center border-solid border-l-2 sticky top-0 h-screen">
        <input type="text" className='bg-amber-50 rounded-4xl border-1 mt-4'/>
      </div>
      
    </div>
  )
}


const Tab =(prop)=>{
  const {type} = prop
  return(
    <div className='flex   rounded  gap-5 ml-2'>
        <div  className=' p-2 rounded-t-lg   bg-yellow-50  ' >{type}</div>
        <div  className=' p-2 rounded-t-lg   bg-yellow-50  '>News&Package</div>

    </div>
  );
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
