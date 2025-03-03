import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ProfileIcon } from "./ProfileIcon";
import { faEllipsisVertical, faRightLeft, faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { isAuthenticated } from "../services/authService";

export const ProfileBtn = (prop) => {
    const { updateIsOpen, firstName, user } = prop;

    return (
        <div onClick={updateIsOpen} className="flex hover:bg-gray-100 cursor-pointer justify-between gap-10 w-fit h-fit px-5 py-3 rounded-full">
            <div className="flex lg:gap-3">
                {
                    !isAuthenticated() ?
                        (<div className="flex items-center justify-center">
                            <FontAwesomeIcon icon={faRightToBracket}/>
                        </div>)
                        :
                        <>
                        <ProfileIcon user={user} />
                        <div className="flex items-center justify-center text-lg font-semibold">
                            {firstName + " " + user.lastName}
                        </div>
                        </>
                }
            </div>
            <div className="flex items-center">
                <FontAwesomeIcon icon={faEllipsisVertical} />
            </div>
        </div>
    );
};