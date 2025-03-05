import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ProfileIcon } from "./ProfileIcon";
import { faArrowRightToBracket, faEllipsisVertical, faRightLeft, faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { isAuthenticated } from "../services/authService";
import { useState } from "react";

export const ProfileBtn = (prop) => {
    const { setIsOpen, firstName, user } = prop;
    const [isMouseEnter , setIsMouesEnter] = useState(false);

    return (
        <div onClick={() => setIsOpen(true)} className="flex cursor-pointer justify-between gap-10 w-fit h-fit px-5 py-3 rounded-full hover:bg-gray-50 bg-gray-100 drop-shadow-2xl">
            <div className="flex lg:gap-3 ">
                {
                    !isAuthenticated() ?
                        (
                            <div className="flex gap-4 items-center transition-all justify-center text-gray-500">
                                <div>
                                <FontAwesomeIcon icon={faArrowRightToBracket}/>
                                </div>
                                <div>
                                    Sign in / Sign up
                                </div>
                            </div>
                        )
                        :
                        <>
                            <div className="hidden lg:flex">
                                <ProfileIcon user={user} />
                            </div>
                            <div className="flex flex-col justify-center">
                                <div className="font-semibold capitalize">
                                    {user?.firstName + " " + user?.lastName}
                                </div>
                                <div className="text-sm text-gray-500">
                                    {user?.email}
                                </div>
                            </div>
                        </>
                }
            </div>
            {
                !isAuthenticated() ? 
                <></> 
                : 
                <div className="flex items-center">
                    <FontAwesomeIcon icon={faEllipsisVertical} />
                </div>
            }
        </div>
    );
};