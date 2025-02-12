import { faBell, faCircleUser, faHouse,faList, faMessage } from '@fortawesome/free-solid-svg-icons';
import {IconSideBar , Category , Section} from './component/home_component' ;
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

  
export default HomePage;