
import {IconSideBar  } from './component/home_component' ;
import { faBell, faCircleUser, faHouse,faList, faMessage } from '@fortawesome/free-solid-svg-icons';



function Detail() {
  

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

     
      <div className='flex flex-4 flex-col'>
          
          
          
          
      </div>

      <div className="flex flex-1 flex-col  items-center border-solid border-l-2 sticky top-0 h-screen">
        <input type="text" className='bg-amber-50 rounded-4xl border-1 mt-4'/>
      </div>
      
    </div>
  )
}



export default Detail;
