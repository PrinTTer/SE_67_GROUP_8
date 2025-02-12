import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faCircleUser, faHouse, faComments, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const ProfilePage = () => {
   return(
    <div className="flex flex-1 items-center justify-center">
        <nav className="flex flex-1 flex-col bg-white h-screen border-r-2 items-center p-4">
            <h1 className="text-4xl text-black font-bold my-5">ThaiXplore</h1>
            <button  className="w-16 h-16 rounded-full hover:bg-gray-400 hover:shadow-lg active:shadow-inner transition duration-400">
                <FontAwesomeIcon icon={faHouse} size="2x"/>
            </button>
            <button  className="w-16 h-16 rounded-full hover:bg-gray-400 hover:shadow-lg active:shadow-inner transition duration-400">
                <FontAwesomeIcon icon={faMagnifyingGlass} size="2x"/>
            </button>
            <button  className="w-16 h-16 rounded-full hover:bg-gray-400 hover:shadow-lg active:shadow-inner transition duration-400">
                <FontAwesomeIcon icon={faComments} size="2x"/>
            </button>
            <button  className="w-16 h-16 rounded-full hover:bg-gray-400 hover:shadow-lg active:shadow-inner transition duration-400">
                <FontAwesomeIcon icon={faBell} size="2x"/>
            </button>
            <button  className="w-16 h-16 rounded-full hover:bg-gray-400 hover:shadow-lg active:shadow-inner transition duration-400">
                <FontAwesomeIcon icon={faCircleUser} size="2x"/>
            </button>
        </nav>
        <div className="flex flex-5 flex-col bg-amber-50 h-screen">
            <h1 className="text-2xl font-bold mx-5 my-5">Profile</h1>
            <div className="flex flex-1 bg-white mx-5 my-20 gap-10 relative border-1 shadow-black">
                <div className="absolute -top-18 left-8 w-36 h-36 bg-gray-200 rounded-full border-1 items-center text-center"></div>
                <button className="absolute -top-9 right-18 w-36 h-18 bg-gray-200 rounded-2xl shadow-2xs hover:bg-gray-500 active:shadow-inner transition duration-400">
                    <h1 className="text-2xl text-black font-bold">Edit Profile</h1>
                </button>
            </div>
        </div>
        
    </div>
   ); 
}

export default ProfilePage;