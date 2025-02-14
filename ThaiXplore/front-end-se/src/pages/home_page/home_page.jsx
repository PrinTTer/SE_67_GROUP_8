import { Category , Section} from './component/home_component' ;
// import {NavBarWithText} from '../../component/navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell, faCircleUser, faHouse,faList, faMessage } from '@fortawesome/free-solid-svg-icons';
const HomePage = () => {
    return (
        <div className = "flex flex-1 flex-row ">
      
        <div className="flex flex-1 flex-col  border-solid border-r-2  sticky top-0 h-screen items-center ">
                            
                            <p className=" mt-4 font-bold ">ThaiXplore</p>
                            <div className="flex-col">
                              <IconSideBar iconName={"Home"}          iconFont={faHouse}      />
                              <IconSideBar iconName={"Category"}      iconFont={faList}       />
                              <IconSideBar iconName={"Message"}       iconFont={faMessage}    />
                              <IconSideBar iconName={"Notification"}  iconFont={faBell}       />
                              <IconSideBar iconName={"Profile"}       iconFont={faCircleUser} />
                            </div>
                        </div>

                
                <div className='flex flex-4 flex-col'>
                    <Category />
                    <Section title= "Recommended"/>
                    <Section title= "News"/>
                    <Section title= "Package"/>
                </div>

                <div className="flex flex-1 flex-col  items-center border-solid border-l-2 sticky top-0 h-screen">
                    <input type="text" className='bg-amber-50 rounded-4xl border-1 mt-4'/>
                </div>
      
    </div>
      
    );
}


const IconSideBar = ({ iconName, iconFont }) => {
  return (
    <div className=" flex items-center p-3 m-2 rounded-full hover:bg-gray-300 cursor-pointer">
      <FontAwesomeIcon icon={iconFont} className="mr-3 text-lg" />
      <span>{iconName}</span>
    </div>
  );
};
  
export default HomePage;