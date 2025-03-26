import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export const BusinessEditBtn = (prop) => {
    const {icon , popup, onClick} = prop;
    const [isMouseEnter, setIsMouseEnter] = useState(false);
    

    return (
        <div onMouseEnter={() => setIsMouseEnter(true)} 
        onClick={onClick}
        onMouseLeave={() => setIsMouseEnter(false)} 
        className="flex justify-center w-fit h-fit items-center drop-shadow-2xl cursor-pointer">
            <div className="z-10 text-xl">
                <FontAwesomeIcon icon={icon} />
            </div>
            <div className={` ${isMouseEnter ? "bg-gray-100" : "bg-white"}  p-6 rounded-full flex justify-center items-center absolute z-0`}></div>
            <div
                className={`${isMouseEnter ? "flex" : "hidden"} transition-all
                absolute bg-gray-50 top-10 p-2 drop-shadow-2xl rounded-full`}>
                <div className="text-gray-500">
                    {popup}
                </div>
            </div>
        </div>
    );
};