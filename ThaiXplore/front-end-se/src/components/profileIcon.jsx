import { isAuthenticated } from "../services/authService";

export const ProfileIcon = (prop) => {
    const {user} = prop;
    return (
        <div className="flex">
            {
                !isAuthenticated() ? 
                <div className="w-12 h-12 rounded-full bg-yellow-500"></div> 
                : 
                <img className="w-12 h-12 rounded-full" src="/src/assets/profile_img_mock_up.jpg"/>
            }
        </div>
    );
};