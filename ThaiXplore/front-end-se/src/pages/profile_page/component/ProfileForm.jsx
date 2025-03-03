import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { EditingField } from "./editingField";
import { putData } from "../../../services/apiService";

const ProfileForm = () => {
    const { isLoading , user } = useSelector((state) => state.auth);

    console.log("ProfileForm Test:", user);

    return(
        <div className="flex flex-1 w-full h-full flex-col bg-gray-50">
            <h1 className="text-2xl font-bold mx-5 my-5">Profile</h1>
            <div className="flex flex-1 mx-5 justify-center items-start">
                <div className="grid grid-cols-1 gap-4">
                    <EditingField label="Name" value={user.firstName+" "+user.lastName} hasProfileImage={true} actionLabel="Edit"/>
                    <EditingField label="Email" value={user.email}/>
                    <EditingField label="Phone" value={user.phoneNumber}/>
                    <EditingField label="Password" value={"231456897"} actionLabel="Edit"/>
                </div>
            </div>
        </div>

                        
        
    );
} 

export default ProfileForm;

