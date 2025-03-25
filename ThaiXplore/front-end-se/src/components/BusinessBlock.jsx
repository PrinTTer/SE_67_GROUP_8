import { faChevronDown, faFileLines, faLocationDot, faPenToSquare, faTrash, faImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { BusinessEditBtn } from "./BusinessEditBtn";
import { Link } from 'react-router-dom';
import { deleteData } from "../services/apiService";


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

    const handleDelete = async () => {
        // try {
        //     const response = await deleteData(`/business/${business.id}`);
        //     console.log(response);
        //     window.location.reload();
        // } catch (error) {
        //     console.error(error);
        // }
        console.log(business.id);
    }

    console.log(business);

    return (
        <div className="bg-white grid lg:grid-cols-[25%_50%_25%] w-full drop-shadow-xl rounded-xl">
            <div className="w-full aspect-[3/2] bg-gray-100 flex items-center justify-center relative overflow-hidden rounded-lg">
                {business.media.length > 0 ? (

                    <div className="w-full h-full overflow-hidden rounded-l-lg">
                        <img
                            src={`http://localhost:3000/public/uploads/businesses/images/${business.media[0]}`}
                            alt="main-img"
                            className="w-full h-full object-cover"

                        />
                    </div>

                ) : (
                    <div className="flex flex-col items-center justify-center text-gray-400 h-full w-full">
                        <FontAwesomeIcon icon={faImage} className="text-4xl mb-2" />
                        <span className="text-sm">No picture</span>
                    </div>
                )}

                {/* {category && (
                                <div className="absolute top-3 left-3">
                                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                                    {category}
                                  </span>
                                </div>
                              )} */}
            </div>
            <div className="mx-5 p-5">
                {/* <div className="flex text-2xl items-start justify-between font-semibold"> */}
                <div className="flex items-start justify-between mb-2 text-2xl font-semibold">
                    {business.businessName}
                    <span className="bg-amber-50 text-amber-700 text-xs px-2 py-1 rounded-full uppercase tracking-wider">{business.category}</span>
                </div>
                <div className="flex gap-2 text-gray-600">
                    <div>
                        <FontAwesomeIcon icon={faLocationDot} />
                    </div>
                    <div className="flex">
                        {business.address}
                    </div>
                </div>
                <div className=" mt-3">
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

                <BusinessEditBtn icon={faFileLines} popup={"Information"} />

                <Link to={`/profile/mainBusiness/createBusiness/adddetails/${business._id}`}>
                    <BusinessEditBtn icon={faPenToSquare} popup={"Edit"} onClick={() => handleDelete(business._id)} />
                </Link>
                <BusinessEditBtn icon={faTrash} popup={"Delete"} />
            </div>
        </div>
    );
}