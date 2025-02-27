import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell, faCircleUser, faHouse, faList, faCaretRight, faCaretLeft } from '@fortawesome/free-solid-svg-icons';
import { faCircleUser as faCircleUserRegular } from '@fortawesome/free-regular-svg-icons';
import { useState } from 'react';
import { Link } from 'react-router-dom';


export const NavBarWithText = () =>{
  const [isOpen, setIsOpen] = useState(false);
  const updateIsOpen = () => {
    setIsOpen(!isOpen)
  }

    return(
         <div className="flex flex-1 flex-col  border-solid border-r-2  sticky top-0 h-screen items-center z-50">
                            
                            <p className=" mt-4 text-2xl font-bold ">ThaiXplore</p>
                            <div className="flex-col">
                              <IconSideBar iconName={"Home"}          iconFont={faHouse}      />
                              <IconSideBar iconName={"Category"}      iconFont={faList}       />
                              <IconSideBar iconName={"Notification"}  iconFont={faBell}       />
                              <div className="flex flex-col">
                                <div onClick={updateIsOpen}>
                                  <IconSideBar iconName={"Profile"}       iconFont={faCircleUser} />
                                </div>
                              </div>
                              
                              <ToggleSideBar updateOpen={isOpen}/>
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
                            <IconSideBarIconOnly iconFont={faHouse}     />
                            <IconSideBarIconOnly iconFont={faList}      />
                            <IconSideBarIconOnly iconFont={faBell}      />
                            <div onClick={updateIsOpen} className='flex  m-2 items-center rounded-full hover:bg-gray-300 cursor-pointer'>
                                <div className="flex justify-center items-center w-14 h-14">
                                  <FontAwesomeIcon icon={faCircleUser} size="lg"/> 
                                </div>
                            </div>
                            <div className="absolute flex justify-center items-center top-68 -right-2 w-14 h-14">
                                  <FontAwesomeIcon icon={isOpen ? faCaretLeft : faCaretRight}
                                   size="md"
                                   className={`transition-transform duration-400 ${isOpen ? "translate-x-[-5px]" : "translate-x-[-5px]"}`}/>
                            </div>
                            <ToggleSideBar updateOpen={isOpen}/>
            </div>
        </div>
    );
}

export const ToggleSideBar = (prop) => {
  const {updateOpen, } = prop;
  return(
    <div className={`${!updateOpen ? 'hidden' : 'w-40 h-lg'} absolute justify-center items-center text-center bg-white border-2 border-l-0 rounded-r-lg w-40 h-lg -right-40 top-68 
        cursor-pointer transition-transform`}>
        <ul className='relative p-1 my-2 w-full'>
          <Link to={"/profile"} className=" p-1.5 hover:bg-gray-300 rounded-full">
            <FontAwesomeIcon icon={faCircleUserRegular} size="lg"/>
            <span className="text-lg"> Profile</span>
          </Link>
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
    <div className="flex justify-center m-2 lg:justify-center items-center w-14 h-14 rounded-full hover:bg-gray-300 cursor-pointer">
      <FontAwesomeIcon icon={iconFont} size="lg" />
    </div>
  );
};