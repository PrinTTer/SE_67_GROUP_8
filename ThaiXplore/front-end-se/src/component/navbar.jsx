import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell, faCircleUser, faHouse,faList } from '@fortawesome/free-solid-svg-icons';
import { faCircleUser as faCircleUserRegular } from '@fortawesome/free-regular-svg-icons';
import { useState } from 'react';


export const NavBarWithText = () =>{
    return(
         <div className="flex flex-1 flex-col  border-solid border-r-2  sticky top-0 h-screen items-center z-50">
                            
                            <p className=" mt-4 text-2xl font-bold ">ThaiXplore</p>
                            <div className="flex-col">
                              <IconSideBar iconName={"Home"}          iconFont={faHouse}      />
                              <IconSideBar iconName={"Category"}      iconFont={faList}       />
                              <IconSideBar iconName={"Notification"}  iconFont={faBell}       />
                              <IconSideBar iconName={"Profile"}       iconFont={faCircleUser} />
                            </div>
                        </div>
    );
}


export const NavBarWithOutText = () =>{
    
    const [isOpen, setIsOpen] = useState(false);
    const updateIsOpen = () => {
      setIsOpen(!isOpen)
    }

    return(
      <div className="flex flex-1 flex-col  border-solid lg:border-r-2  sticky top-0 h-screen items-center z-50">

        
        <h2 className="mt-4 text-2xl font-bold hidden lg:block">ThaiXplore</h2>

            <div className="flex lg:flex-col  ">
                              <IconSideBarIconOnly iconName={"Home"}          iconFont={faHouse}      />
                              <IconSideBarIconOnly iconName={"Category"}      iconFont={faList}       />
                              <IconSideBarIconOnly iconName={"Notification"}  iconFont={faBell}       />
                              
                    <div onClick={updateIsOpen}>
                      <IconSideBarIconOnly iconName={"Profile"} iconFont={faCircleUser}/>
                    </div>
                    <ToggleSideBar updateOpen={isOpen}/>
            </div>
        </div>
    );
}

export const ToggleSideBar = (prop) => {
  const {updateOpen, } = prop;
  return(
    <div className={`${!updateOpen ? 'hidden' : 'w-40 h-lg'} absolute justify-center items-center text-center bg-white border-2 border-l-0 rounded-r-lg w-40 h-lg -right-40 top-70 
        cursor-pointer transition-transform`}>
        <ul className='relative p-1 my-2 w-full'>
          <li href='#' className=" p-1.5 hover:bg-gray-300 rounded-full">
            <FontAwesomeIcon icon={faCircleUserRegular} size="lg"/>
            <span className="text-lg"> Profile</span>
          </li>
        </ul>
      </div>
  );
}


export const IconSideBar = (prop) => {
  const { iconName, iconFont } = prop ;
  return (
    <div className=" flex items-center p-3 m-2 rounded-full hover:bg-gray-300 cursor-pointer">
      <FontAwesomeIcon icon={iconFont} className="mr-3 text-lg" />
      <span>{iconName}</span>
    </div>
  );
};

export const IconSideBarIconOnly = (prop) => {
  const {  iconFont } = prop ;
  return (
    <div className="flex justify-center mx-7 lg:justify-center items-center w-12 h-12 m-2 rounded-full hover:bg-gray-300 cursor-pointer">
      <FontAwesomeIcon icon={iconFont} size="lg" />
    </div>
  );
};