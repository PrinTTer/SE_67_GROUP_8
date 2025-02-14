import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell, faCircleUser, faHouse,faList, faMessage } from '@fortawesome/free-solid-svg-icons';

export const NavBarWithText = () =>{
    return(
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
    );
}


export const NavBarWithOutText = () =>{
    return(
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

