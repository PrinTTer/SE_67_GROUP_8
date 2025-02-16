import { NavBarWithOutText } from "../../component/navbar";
import BusinessForm from "./component/BusinessForm";

const CreateBusiness = () => {
    return(
        <div className="flex flex-col-reverse lg:flex-row flex-1 ">
            <NavBarWithOutText/>
            <div className="flex flex-5 items-center justify-center flex-col">
                <BusinessForm/>
                <BusinessForm/>
            </div>
        </div>
    );
}

export default CreateBusiness;