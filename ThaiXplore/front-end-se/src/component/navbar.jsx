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
                    <IconSideBarIconOnly iconFont={faHouse}/>
                    <IconSideBarIconOnly iconFont={faList}/>
                    <IconSideBarIconOnly iconFont={faMessage}/>
                    <IconSideBarIconOnly iconFont={faBell}/>
                    <IconSideBarIconOnly iconFont={faCircleUser}/>
            </div>
        </div>
    );
}
export const IconSideBar = (prop) => {
  const { iconName, iconFont } = prop
  return (
    <div className=" flex  items-center p-3 m-2 rounded-full hover:bg-gray-300 cursor-pointer">
      <FontAwesomeIcon icon={iconFont} className="mr-3 text-lg" />
      <span>{iconName}</span>
    </div>
  );
};

export const IconSideBarIconOnly = (prop) => {
  const {  iconFont } = prop
  return (
    <div className=" flex justify-center items-center w-12 h-12 m-2 rounded-full hover:bg-gray-300 cursor-pointer">
      <FontAwesomeIcon icon={iconFont} size="lg" />
    </div>
  );
};
