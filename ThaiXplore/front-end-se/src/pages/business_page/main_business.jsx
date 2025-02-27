import { NavBarWithOutText } from "../../layouts/navbar";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; 
import { Link } from "react-router-dom";

const MainBusiness = () => {
    return(
        <div className="flex flex-1">
            <NavBarWithOutText/>
            <div className="flex flex-5">
                <div className="flex flex-1  flex-col p-5 m-8">
                    <h1 className="">Your Business</h1>
                    <Link to={"/profile/mainBusiness/createBusiness"}>
                        <div className="flex w-full h-32 items-center justify-center border-1 rounded-lg my-4 hover:bg-gray-300">
                            <FontAwesomeIcon icon={faCirclePlus} size="lg" className="mx-4"/>
                            <h1 className="text-xl font-medium">Add Business</h1>
                        </div>
                    </Link>    
                </div>
            </div>
        </div>
    );
}

export default MainBusiness;