import { faChevronDown, faFileLines, faLocationDot, faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { BusinessEditBtn } from "./BusinessEditBtn";
import { Link } from 'react-router-dom';


export const BusinessBlock = (prop) => {
    const { business } = prop;
    const [description, setDescription] = useState("");
    const [isShow, setIsShow] = useState(false);
    //const [isMouseEnter, setIsMouseEnter] = useState(false);

    const isTextTooLong = (text) => {
        let description = "";
        return text.split(" ").filter((value, idx) => idx < 40).map((value, idx) => idx === 39 ? description + value + " ...." : description + value + " ");
    };

    const checkIsShow = () => {
        if (isShow) {
            setDescription(isTextTooLong(business.description));
            setIsShow(false);
        } else {
            setDescription(business.description);
            setIsShow(true);
        }
    }

    useEffect(() => {
        setDescription(isTextTooLong(business.description));
    }, [])

    console.log(business);

    return (
        <div className="bg-white grid lg:grid-cols-[25%_50%_25%] w-full drop-shadow-xl rounded-xl">
            <div>
                <img className="object-cover rounded-l-xl" src="https://i.pinimg.com/736x/a1/06/c7/a106c7e0256afac9d2e4295c42bf0163.jpg" />
            </div>
            <div className="mx-5 p-5">
                <div className="text-2xl font-semibold">
                    {business.businessName}
                </div>
                <div className="flex gap-2 text-gray-500">
                    <div>
                        <FontAwesomeIcon icon={faLocationDot} />
                    </div>
                    <div className="flex">
                        {business.address}
                    </div>
                </div>
                <div className="text-sm mt-3">
                    <div>
                        {description}
                    </div>
                    <div onClick={() => checkIsShow()}
                        className="text-blue-500 flex gap-1 cursor-pointer transition-all hover:text-blue-300">
                        <div>Show more</div>
                        <div className={`${isShow ? "rotate-180" : ""} transition-all ease-in-out`}>
                            <FontAwesomeIcon icon={faChevronDown} />
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex gap-16 justify-end p-5">
            <Link to={`/profile/mainBusiness/createBusiness/adddetails/${business._id}`}>
                 <BusinessEditBtn icon={faFileLines} popup={"Information"}/>
            </Link>
               
                <BusinessEditBtn icon={faPenToSquare} popup={"Edit"}/>
                <BusinessEditBtn icon={faTrash} popup={"Delete"}/>
            </div>
        </div>
    );
}