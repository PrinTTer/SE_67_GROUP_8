import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useRef, useState } from 'react';
import { 
  faArrowRightFromBracket, 
  faBuilding, 
  faCarSide, 
  faClipboardCheck, 
  faCube, 
  faFileLines, 
  faHotel, 
  faHouse, 
  faPersonHiking, 
  faUser, 
  faUsers, 
  faUtensils 
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { isAuthenticated } from '../services/authService';
import { logoutUser } from '../features/authSlice';
import { ProfileBtn } from '../components/profileBtn';

export const NavigateBar = (prop) => {
    const { isNaviOpen } = prop;
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
        <div className={`${isNaviOpen ? "flex" : "hidden"} lg:flex flex-col justify-between 
                         h-screen sticky top-0 z-50 
                         bg-white border-r border-gray-200 shadow-sm
                         transition-all duration-300 ease-in-out
                         w-72`}>
            
            {/* Logo Section */}
            <div className="px-6 pt-8 pb-6 border-b border-gray-100">
                <div className="flex items-center justify-center">
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-amber-600 bg-clip-text text-transparent hidden lg:block">
                        ThaiXplore
                    </h1>
                </div>
            </div>
            
            {/* Navigation Links */}
            <div className="flex-1 overflow-y-auto py-6 px-4">
                <div className="flex flex-col space-y-1">
                    <IconSideBar iconName="Home" iconFont={faHouse} path="/" />
                    <IconSideBar iconName="Hotels & Resorts" iconFont={faHotel} path="/listpage/hotel" />
                    <IconSideBar iconName="Car Rental" iconFont={faCarSide} path="/listpage/carRental" />
                    <IconSideBar iconName="Restaurant" iconFont={faUtensils} path="/listpage/restaurant" />
                    <IconSideBar iconName="Activities & Events" iconFont={faPersonHiking} path="/listpage/event" />
                    <IconSideBar iconName="Packages" iconFont={faCube} path="#" />
                </div>
            </div>
            
            {/* Profile Section */}
            <div className="border-t border-gray-100 px-4 py-6">
                <div className="mb-4">
                    {!isAuthenticated() ? (
                        <Link to="/login" className="block w-full">
                            <ProfileBtn setIsOpen={setIsOpen} user={user} firstName={""} />
                        </Link>
                    ) : (
                        <ProfileBtn setIsOpen={setIsOpen} user={user} firstName={user?.firstName} />
                    )}
                </div>
                
                {/* Popup Menu based on Role */}
                {user?.role === "entrepreneur" ? 
                    <ToggleSideBarEntrepreneur popupRef={popupRef} logout={logout} updateOpen={isOpen} /> : 
                 user?.role === "tourist" ? 
                    <ToggleSideBarTourist popupRef={popupRef} logout={logout} updateOpen={isOpen} /> :
                    <ToggleSideBarAdmin popupRef={popupRef} logout={logout} updateOpen={isOpen} /> 
                }
            </div>
        </div>
    );
}

export const IconSideBar = (prop) => {
    const { iconName, iconFont, path, logout } = prop;
    const currentPath = useSelector((state) => state.path.currentPath);
    const isActive = currentPath === path;

    const checkLogout = () => {
        if(logout) {
            logout();
        }
    }

    return (
        <Link className="block w-full" to={path}>
            <div 
                onClick={() => checkLogout()} 
                className={`flex items-center gap-3 px-4 py-3 rounded-lg
                          transition-all duration-200
                          ${isActive 
                              ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-md" 
                              : "text-gray-700 hover:bg-gray-50"}`}
            >
                <div className="flex items-center justify-center w-8 h-8">
                    <FontAwesomeIcon 
                        icon={iconFont} 
                        className={`${isActive ? "text-white" : "text-amber-600"}`} 
                    />
                </div>
                <span className={`font-medium ${isActive ? "text-white" : ""}`}>
                    {iconName}
                </span>
            </div>
        </Link>
    );
};

export const ToggleSideBarEntrepreneur = (prop) => {
    const { updateOpen, logout, popupRef } = prop;
    return (
        <div 
            ref={popupRef} 
            className={`${!updateOpen ? 'hidden' : 'block'} 
                       absolute bg-white border border-gray-200
                       rounded-xl shadow-lg overflow-hidden
                       w-60 py-2 right-0 bottom-20 z-50
                       transform translate-x-full -translate-x-4
                       transition-all duration-200`}
        >
            <div className="py-2">
                <div className="px-4 py-2 text-xs uppercase tracking-wider text-gray-500 font-semibold border-b border-gray-100 mb-2">
                    Business Tools
                </div>
                <IconSideBar iconName="My Profile" iconFont={faUser} path="/profile" />
                <IconSideBar iconName="Quotation" iconFont={faFileLines} path="/quotation" />
                <IconSideBar iconName="Business Management" iconFont={faBuilding} path="/profile/mainbusiness" />
                <div className="mx-4 my-2 border-t border-gray-100"></div>
                <IconSideBar logout={logout} iconName="Logout" iconFont={faArrowRightFromBracket} path="/login" />
            </div>
        </div>
    );
}

export const ToggleSideBarTourist = (prop) => {
    const { updateOpen, logout, popupRef } = prop;
    return (
        <div 
            ref={popupRef} 
            className={`${!updateOpen ? 'hidden' : 'block'} 
                       absolute bg-white border border-gray-200
                       rounded-xl shadow-lg overflow-hidden
                       w-60 py-2 right-0 bottom-20 z-50
                       transform translate-x-full -translate-x-4
                       transition-all duration-200`}
        >
            <div className="py-2">
                <div className="px-4 py-2 text-xs uppercase tracking-wider text-gray-500 font-semibold border-b border-gray-100 mb-2">
                    Tourist Account
                </div>
                <IconSideBar iconName="My Profile" iconFont={faUser} path="/profile" />
                <IconSideBar iconName="My Bookings" iconFont={faClipboardCheck} path="#" />
                <IconSideBar iconName="Travel Packages" iconFont={faCube} path="#" />
                <div className="mx-4 my-2 border-t border-gray-100"></div>
                <IconSideBar logout={logout} iconName="Logout" iconFont={faArrowRightFromBracket} path="/login" />
            </div>
        </div>
    );
}

export const ToggleSideBarAdmin = (prop) => {
    const { updateOpen, logout, popupRef } = prop;
    return (
        <div 
            ref={popupRef} 
            className={`${!updateOpen ? 'hidden' : 'block'} 
                       absolute bg-white border border-gray-200
                       rounded-xl shadow-lg overflow-hidden
                       w-60 py-2 right-0 bottom-20 z-50
                       transform translate-x-full -translate-x-4
                       transition-all duration-200`}
        >
            <div className="py-2">
                <div className="px-4 py-2 text-xs uppercase tracking-wider text-gray-500 font-semibold border-b border-gray-100 mb-2">
                    Admin Controls
                </div>
                <IconSideBar iconName="My Profile" iconFont={faUser} path="/profile" />
                <IconSideBar iconName="Users Management" iconFont={faUsers} path="/test" />
                <IconSideBar iconName="Businesses Management" iconFont={faBuilding} path="/verifyBusiness" />
                <div className="mx-4 my-2 border-t border-gray-100"></div>
                <IconSideBar logout={logout} iconName="Logout" iconFont={faArrowRightFromBracket} path="/login" />
            </div>
        </div>
    );
}