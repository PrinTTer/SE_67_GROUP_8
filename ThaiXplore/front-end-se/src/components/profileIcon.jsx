import { isAuthenticated } from "../services/authService";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faUser } from '@fortawesome/free-solid-svg-icons';

export const ProfileIcon = (prop) => {
    const {user} = prop;
    return (
        <div className="flex">
            {
                !isAuthenticated() ? (
                    <div className="w-12 h-12 rounded-full bg-yellow-500"></div>
                ) : user?.media === undefined ? (
                    <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full flex items-center justify-center text-white group-hover:opacity-80 transition-opacity">
                        <FontAwesomeIcon icon={faUser} className="text-xl"/>
                    </div>
                ) : (
                    <img
                        src={`http://localhost:3000/public/uploads/users/images/${user?.media}`}
                        alt="Profile"
                        className="w-12 h-12 rounded-full border-2 border-amber-500 object-cover group-hover:opacity-80 transition-opacity"
                    />
                )
                
            }
        </div>
    );
};