import { NavBarWithOutText } from "../../component/navbar";
import ProfileForm from "./component/ProfileForm";

const ProfilePage = () => {

   return(
    <div className="flex flex-1 flex-col-reverse lg:flex-row">
        <NavBarWithOutText/>
            <div className="flex flex-5 items-center justify-center flex-col">
                <ProfileForm/>
            </div>
    </div>
   ); 
}

export default ProfilePage;
//<ProfileForm/>