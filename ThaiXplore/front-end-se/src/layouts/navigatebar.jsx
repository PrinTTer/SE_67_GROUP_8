import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useRef, useState } from 'react';
import { faArrowRightFromBracket, faBuilding, faCarSide, faClipboardCheck, faCube, faFileLines, faHotel, faHouse, faPersonHiking, faUser, faUsers, faUtensils } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { isAuthenticated } from '../services/authService';
import { logoutUser } from '../features/authSlice';
import { ProfileBtn } from '../components/profileBtn';

export const NavigateBar = (prop) => {
    const {isNaviOpen} = prop;
    const [isOpen, setIsOpen] = useState(false);
    const popupRef = useRef(null);
    
    const { user } = useSelector((state) => state.auth);

    const dispatch = useDispatch();

    useEffect(() => {
        const handleClickOutside = (event) => {
          if (popupRef.current && !popupRef.current.contains(event.target)) {
            setIsOpen(false);
          }
        };
    
        if (isOpen) {
          document.addEventListener("mousedown", handleClickOutside);
        }
    
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, [isOpen]);
    

    const logout = () => {
        dispatch(logoutUser());
    }

    return (
            <div className={` ${isNaviOpen ? "flex" : "hidden"} lg:flex flex-1 py-4 flex-col justify-between  border-solid border-gray-300 border-r sticky top-0 h-screen items-center z-50`}>
                <p className="text-2xl font-bold hidden lg:flex">ThaiXplore</p>
                <div className="flex flex-col gap-5">
                    <IconSideBar iconName={"Home"} iconFont={faHouse} path={"/"} />
                    <IconSideBar iconName={"Hotels & Homes"} iconFont={faHotel} path={"/listpage/hotel"} />
                    <IconSideBar iconName={"Car rentals"} iconFont={faCarSide} path={"/listpage/carRental"} />
                    <IconSideBar iconName={"Restaurants"} iconFont={faUtensils} path={"/listpage/restaurant"} />
                    <IconSideBar iconName={"Activities & Events"} iconFont={faPersonHiking} path={"/listpage/event"} />
                    <IconSideBar iconName={"Packages"} iconFont={faCube} path={"#"} />
                </div>
                {
                    !isAuthenticated() ? 
                    (
                        <Link to={"/login"}>
                            <ProfileBtn setIsOpen={setIsOpen} user={user} firstName={""}/>
                        </Link>
                    ) : 
                    (
                        <ProfileBtn setIsOpen={setIsOpen} user={user} firstName={user?.firstName}/>
                    )
                }
                {
                    user?.role === "entrepreneur" ? 
                    <ToggleSideBarEntrepreneur popupRef={popupRef} logout={logout} updateOpen={isOpen} /> 
                    : 
                    user?.role === "tourist" ? 
                    <ToggleSideBarTourist popupRef={popupRef} logout={logout} updateOpen={isOpen} /> 
                    :
                    <ToggleSideBarAdmin popupRef={popupRef} logout={logout} updateOpen={isOpen} /> 
                }
            </div>
    );
}

export const IconSideBar = (prop) => {
    const { iconName, iconFont, path, logout } = prop;
    const currentPath = useSelector((state) => state.path.currentPath);

    const checkLogout = () => {
        if(logout) {
            logout();
        }
    }

    return (
            <Link className='flex gap-3' to={path}>
                <div onClick={() => checkLogout()} className={`${currentPath === path ? "bg-black" : ""} transition-all drop-shadow-2xl flex items-center p-3 gap-2 m-2 rounded-full hover:bg-gray-100 cursor-pointer w-fit h-fit`}>
                    <div>
                        <FontAwesomeIcon icon={iconFont} className={`${currentPath === path ? "text-white" : ""}`} />
                    </div>
                    <span className={`${currentPath === path ? "text-white" : ""}`}>{iconName}</span>
                </div>
            </Link>
        
    );
};

export const ToggleSideBarEntrepreneur = (prop) => {
    const { updateOpen, logout, popupRef} = prop;
    return (
        <div ref={popupRef} className={`${!updateOpen ? 'hidden' : 'w-44 h-lg'} absolute justify-center items-center text-center bg-white border border-gray-300  rounded-2xl w-44 h-lg -right-46 bottom-10 
          cursor-pointer transition-transform`}>
            <ul className='relative p-1 my-2 w-full'>
                <IconSideBar iconName={"Profile"} iconFont={faUser} path={"/profile"} />
                <IconSideBar iconName={"Quotation"} iconFont={faFileLines} path={"/quotation"} />
                <IconSideBar iconName={"Business"} iconFont={faBuilding} path={"/profile/mainbusiness"} />
                <IconSideBar logout={logout} iconName={"Logout"} iconFont={faArrowRightFromBracket} path={"/login"} />
            </ul>
        </div>
    );
}

export const ToggleSideBarTourist = (prop) => {
    const { updateOpen, logout, popupRef} = prop;
    return (
        <div ref={popupRef} className={`${!updateOpen ? 'hidden' : 'w-44 h-lg'} absolute justify-center items-center text-center bg-white border border-gray-300  rounded-2xl w-44 h-lg -right-46 bottom-10 
          cursor-pointer transition-transform`}>
            <ul className='relative p-1 my-2 w-full'>
                <IconSideBar iconName={"Profile"} iconFont={faUser} path={"/profile"} />
                <IconSideBar iconName={"Bookings"} iconFont={faClipboardCheck} path={"#"} />
                <IconSideBar iconName={"Packages"} iconFont={faCube} path={"#"} />
                <IconSideBar logout={logout} iconName={"Logout"} iconFont={faArrowRightFromBracket} path={"/login"} />
            </ul>
        </div>
    );
}

export const ToggleSideBarAdmin = (prop) => {
    const { updateOpen, logout, popupRef} = prop;
    return (
        <div ref={popupRef} className={`${!updateOpen ? 'hidden' : 'w-44 h-lg'} absolute justify-center items-center text-center bg-white border border-gray-300  rounded-2xl w-44 h-lg -right-46 bottom-10 
          cursor-pointer transition-transform`}>
            <ul className='relative p-1 my-2 w-full'>
                <IconSideBar iconName={"Profile"} iconFont={faUser} path={"/profile"} />
                <IconSideBar iconName={"Users Management"} iconFont={faUsers} path={"/users-management"} />
                <IconSideBar iconName={"Businesses Management"} iconFont={faBuilding} path={"/businesses-management"} />
                <IconSideBar logout={logout} iconName={"Logout"} iconFont={faArrowRightFromBracket} path={"/login"} />
            </ul>
        </div>
    );
}