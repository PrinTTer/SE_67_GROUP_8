import { faChevronDown, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

export const BusinessBlock = (prop) => {
    const { business } = prop;
    const [description, setDescription] = useState("");
    const [isShow, setIsShow] = useState(false);

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
        <div className="bg-white grid grid-cols-[25%_50%_25%] px-10 py-5 w-full drop-shadow-lg rounded-md">
            <div>
                <img className="object-cover rounded-xl" src="https://i.pinimg.com/736x/a1/06/c7/a106c7e0256afac9d2e4295c42bf0163.jpg" />
            </div>
            <div className="mx-5">
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
                        <div>
                            <FontAwesomeIcon icon={faChevronDown} />
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex gap-5 justify-end">
                <div className="w-fit h-fit text-white bg-blue-400 rounded-2xl px-2 py-1 cursor-pointer transition-all hover:bg-blue-300">
                    Details
                </div>
                <div className="w-fit h-fit text-white bg-green-400 rounded-2xl px-2 py-1 cursor-pointer transition-all hover:bg-green-300">
                    Edit
                </div>
                <div className="w-fit h-fit text-white bg-red-400 rounded-2xl px-2 py-1 cursor-pointer transition-all hover:bg-red-300">
                    Delete
                </div>
            </div>
        </div>
    );
}