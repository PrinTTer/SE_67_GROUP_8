import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react';
import { ProfileBtn } from '../components/profileBtn';
import { faArrowRightFromBracket, faBuilding, faCarSide, faFileLines, faHotel, faHouse, faPersonHiking, faUser, faUtensils } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const NavigateBar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const updateIsOpen = () => {
        setIsOpen(!isOpen)
    }

    return (
            <div className="flex flex-1 py-4 flex-col justify-between border-solid border-gray-300 border-r  sticky top-0 h-screen items-center z-50">
                <p className="text-2xl font-bold ">ThaiXplore</p>
                <div className="flex flex-col gap-5">
                    <IconSideBar iconName={"Home"} iconFont={faHouse} path={"/"} />
                    <IconSideBar iconName={"Hotels & Homes"} iconFont={faHotel} path={"/ListPage/hotel"} />
                    <IconSideBar iconName={"Car rentals"} iconFont={faCarSide} path={"/ListPage/carRental"} />
                    <IconSideBar iconName={"Restaurants"} iconFont={faUtensils} path={"/ListPage/restaurant"} />
                    <IconSideBar iconName={"Activities & Events"} iconFont={faPersonHiking} path={"/ListPage/event"} />
                </div>
                <ProfileBtn updateIsOpen={updateIsOpen} />
                <ToggleSideBar updateOpen={isOpen} />
            </div>
    );
}

export const IconSideBar = (prop) => {
    const { iconName, iconFont, path } = prop;
    const currentPath = useSelector((state) => state.path.currentPath);

    return (
        <div className={`${currentPath === path ? "bg-black" : ""}  flex items-center p-3 m-2 rounded-full hover:bg-gray-100 cursor-pointer w-fit h-fit`}>
            <Link className='flex gap-3' to={path}>
                <div>
                    <FontAwesomeIcon icon={iconFont} className={`${currentPath === path ? "text-white" : ""}`} />
                </div>
                <span className={`${currentPath === path ? "text-white" : ""}`}>{iconName}</span>
            </Link>
        </div>
    );
};

export const ToggleSideBar = (prop) => {
    const { updateOpen, } = prop;
    return (
        <div className={`${!updateOpen ? 'hidden' : 'w-44 h-lg'} absolute justify-center items-center text-center bg-white border border-gray-300  rounded-2xl w-44 h-lg -right-46 bottom-10 
          cursor-pointer transition-transform`}>
            <ul className='relative p-1 my-2 w-full'>
                <IconSideBar iconName={"Profile"} iconFont={faUser} path={"/profile"} />
                <IconSideBar iconName={"Quotation"} iconFont={faFileLines} path={"/profile"} />
                <IconSideBar iconName={"Business"} iconFont={faBuilding} path={"profile/mainBusiness"} />
                <IconSideBar iconName={"Logout"} iconFont={faArrowRightFromBracket} path={"/profile"} />
            </ul>
        </div>
    );
}