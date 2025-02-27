import { NavBarWithOutText } from "../../layouts/navbar";
import ProfileForm from "./component/ProfileForm";

const ProfilePage = () => {

    return (
        <>

            <div className="flex flex-5 items-center justify-center flex-col">
                <ProfileForm />
            </div>
        </>
    );
}

export default ProfilePage;
//<ProfileForm/>