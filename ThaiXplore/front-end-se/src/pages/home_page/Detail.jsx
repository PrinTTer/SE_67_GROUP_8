import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom';
import {IconSideBar  } from './component/home_component' ;
import { faBell, faCircleUser, faHouse,faList, faMessage,faFileInvoice } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';


function Detail() {
  
  let { title } = useParams();
  return (
    <div className = "flex flex-1 flex-row">
      
      <div className="flex flex-1 flex-col  border-solid border-r-2  sticky top-0 h-screen items-center ">
        
        <h2 className=" mt-4 font-bold">ThaiXplore</h2>
        <div className="flex-col">
                <IconSideBar   iconFont={faHouse}      />
                <IconSideBar   iconFont={faList}       />
                <IconSideBar   iconFont={faMessage}    />
                <IconSideBar   iconFont={faBell}       />
                <IconSideBar   iconFont={faCircleUser} />
        </div>
      </div>

     
      <div className='flex flex-4 flex-col m-5'>
          
        <div className='flex-4  bg-amber-100'>

        </div>
        <div className='flex flex-2 m-5'>
            <div className='flex-2 '>
                  <p className='font-bold text-2xl'>Hotel A</p> 
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
              <div className=' grid grid-cols-2 grid-rows-1  '>
                    <div className='rounded-t-lg  w-2xs text-center  bg-gray-100 hover: cursor-pointer' onClick={() => alert("hello")}>Hotel</div>
                    <div className='rounded-t-lg  w-2xs text-center  bg-gray-100 hover: cursor-pointer' onClick={() => alert("hello")}>Package</div>
              </div>    
              
              <div className='grid grid-cols-1 grid-rows-1 bg-gray-100  '>
                Detail
              </div>
              
        </div>
          
            
        </div>

      <div className="flex flex-1 flex-col  items-center border-solid border-l-2 sticky top-0 h-screen">
        <input type="text" className='bg-amber-50 rounded-4xl border-1 mt-4'/>
      </div>
      
    </div>
  )
}



export default Detail;
