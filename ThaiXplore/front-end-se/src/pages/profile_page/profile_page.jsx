import { NavBarWithOutText } from "../../component/navbar";
import ProfileForm from "./component/ProfileForm";

const ProfilePage = () => {
   return(
    <div className="flex flex-col-reverse lg:flex-row flex-1 items-center justify-center">
        <NavBarWithOutText/>
        <div className="flex flex-5 flex-col bg-amber-50 h-screen">
            <h1 className="text-2xl font-bold mx-5 my-5">Profile</h1>
            <div className="flex flex-1 bg-white mx-5 my-20 gap-10 relative border-1 shadow-black shadow-md">
                <div className="absolute -top-10 left-4 w-18 h-18
                lg:-top-18 lg:left-8 lg:w-36 lg:h-36 
                bg-gray-200 rounded-full border-1 items-center text-center ">

                </div>
                <button className="absolute -top-6 right-10 w-24 h-12 
                lg:-top-8 lg:right-18 lg:w-36 lg:h-16 
                bg-gray-200 rounded-2xl shadow-2xs hover:bg-gray-300 active:shadow-inner transition duration-400">
                    <h1 className="text-md lg:text-2xl text-black font-bold">Edit Profile</h1>
                </button>

                <ProfileForm/>
            </div>
        </div>
        
    </div>
   ); 
}

export default ProfilePage;
//<ProfileForm/>