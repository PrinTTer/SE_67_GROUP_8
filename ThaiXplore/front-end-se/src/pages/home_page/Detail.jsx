import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useParams } from 'react-router-dom';
import {NavBarWithOutText  } from '../../component/navbar' ;
import {  faMessage,faFileInvoice } from '@fortawesome/free-solid-svg-icons';



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
                    <Info />  
                      
                </div>
          
            
      </div>

      <div className="flex flex-1 flex-col  items-center border-solid border-l-2 sticky top-0 h-screen">
        <input type="text" className='bg-amber-50 rounded-4xl border-1 mt-4'/>
      </div>
      
    </div>
  )
}


const Info =(prop)=>{
  const {title} = prop
  return(
    <div className='border m-4 rounded p-2'>
        <h1>{title}</h1>
      

    </div>
  );
}

export default Detail;
