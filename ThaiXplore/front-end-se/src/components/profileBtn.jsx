import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ProfileIcon } from "./ProfileIcon";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";

export const ProfileBtn = (prop) => {
    const {updateIsOpen , firstName} = prop;

    return (
        <div onClick={updateIsOpen} className="flex hover:bg-gray-100 cursor-pointer justify-between gap-10 w-fit h-fit px-5 py-3 rounded-full">
            <div className="flex lg:gap-3">
                <ProfileIcon />
                <div>
                    <div className="flex">
                        <div>
                            {firstName}
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex items-center">
                <FontAwesomeIcon icon={faEllipsisVertical}/>
            </div>
        </div>
    );
};