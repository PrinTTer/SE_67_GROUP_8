import { NavBarWithOutText } from "../../component/navbar";
import BusinessForm from "./component/BusinessForm";

const CreateBusiness = () => {
    return(
        <div className="flex flex-1 flex-col-reverse lg:flex-row">
            <NavBarWithOutText/>
            <div className="flex flex-5 items-center justify-center">
                <BusinessForm/>
            </div>
        </div>
    );
}

export default CreateBusiness;