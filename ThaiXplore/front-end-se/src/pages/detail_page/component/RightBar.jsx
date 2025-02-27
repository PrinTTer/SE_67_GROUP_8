import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook,faUserGroup,faCalendarDays,faClock } from '@fortawesome/free-solid-svg-icons';


export  const RightSideBar = (prop) => {
    const {type} = prop
    return(
        <div className="flex flex-1 flex-col  items-center border-solid border-l-2 sticky top-0 h-screen">
                <div className='mt-7 mb-4'>
                    <FontAwesomeIcon icon={faBook} />  
                    <span className='ml-2'>Booking</span>
                </div>  
                <div>
                    <div className='border-l-3 border-[#F96868] pl-1 text-[#007CE8] font-bold mb-3'>How many people ?</div>
                    <div onClick={() => alert("Hello")} className='flex border rounded-lg p-1 justify-center items-center cursor-pointer mb-6 '>
                        <span  className='text-center mr-2'>1 Adult(s), 0 Child</span>
                        <FontAwesomeIcon icon={faUserGroup} />
                    </div>
                    <div className='border-l-3 border-[#F96868] pl-1 text-[#007CE8] font-bold mb-3'>Date</div>
                    <div onClick={() => alert("Hello")} className='flex border rounded-lg p-1 justify-center items-center cursor-pointer mb-6 '>
                        <span  className='text-center mr-3'>06 Feb - 07 Feb</span>
                        <FontAwesomeIcon icon={faCalendarDays} />
                    </div>


                    <div className={`border-l-3 border-[#F96868] pl-1 text-[#007CE8] font-bold mb-3 ${type == "food" ? 'block' : 'hidden'}`}>Time</div>
                    <div onClick={() => alert("Hello")} className={`flex  border rounded-lg p-1  justify-center items-center cursor-pointer mb-6 ${type == "food" ? 'block' : 'hidden'}`}>
                        <span  className='mr-3'>18.00</span>
                        
                        <FontAwesomeIcon icon={faClock}  />  
                    </div> 
                </div>         
        </div>
    );
}