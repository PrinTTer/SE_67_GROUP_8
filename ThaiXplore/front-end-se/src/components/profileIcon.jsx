import { isAuthenticated } from "../services/authService";

export const ProfileIcon = (prop) => {
    const {user} = prop;
    return (
        <div className="flex">
            {
                !isAuthenticated() ? 
                <div className="w-12 h-12 rounded-full bg-yellow-500"></div> 
                : 
                <img className="w-12 h-12 rounded-full" src={`http://localhost:3000/public/uploads/users/images/${user?.media}`}/>
            }
        </div>
    );
};