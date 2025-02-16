import { NavBarWithOutText } from "../../component/navbar";
import BusinessForm from "./component/BusinessForm";

const CreateBusiness = () => {
    return(
        <div className="flex flex-col-reverse lg:flex-row flex-1 items-center justify-center">
            <NavBarWithOutText/>
            <div className="flex flex-5 items-center justify-center h-screen">
                <BusinessForm/>
            </div>
        </div>
    );
}

export default CreateBusiness;