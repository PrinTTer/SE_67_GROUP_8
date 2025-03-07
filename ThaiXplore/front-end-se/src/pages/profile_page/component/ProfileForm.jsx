import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { EditingField } from "./editingField";
import { putData } from "../../../services/apiService";

const ProfileForm = () => {
    const { user } = useSelector((state) => state.auth);
    const [data, setData] = useState("");

    useEffect(()=>{
        if(user) {
            setData(user);
        }
    },[user])

    useEffect(() => {
        if (user) {
            setData(user);
        }
    }, [user]);

    const handleFieldUpdate = async (field, value) => {
        let updatedData = { ...data, [field]: value };

        if (field === "name") {
            const nameParts = value?.trim().split(" ");
            const firstName = nameParts[0] || "";
            const lastName = nameParts.slice(1).join(" ") || "";
            updatedData = { ...data, firstName, lastName };
        }

        setData(updatedData);

        try {
            await putData("/users", updatedData); // ✅ ส่งข้อมูลทั้งหมดไปยัง API
            console.log(`Updated ${field} successfully!`);
        } catch (error) {
            console.error(`Error updating ${field}:`, error);
        }
    };
    

    return(
        <div className="flex flex-1 w-full h-full flex-col bg-gray-50">
            <h1 className="text-2xl font-bold mx-5 my-5">Profile</h1>
            <div className="flex flex-1 mx-5 justify-center items-start">
                <div className="grid grid-cols-1 gap-4">
                    <EditingField label="Name" field="name" value={data?.firstName + " " + data?.lastName} hasProfileImage={true} actionLabel="Edit" onSave={handleFieldUpdate}/>
                    <EditingField label="Email" field="email" value={data?.email} onSave={handleFieldUpdate} />
                    <EditingField label="Phone" field="phoneNumber" value={data?.phoneNumber} actionLabel="Edit" onSave={handleFieldUpdate} />
                    <EditingField label="Address" field="address" value={data?.address} actionLabel="Edit" onSave={handleFieldUpdate}/>
                    <EditingField label="Password" field="password" value={"***********"} actionLabel="Edit" />
                </div>
            </div>
        </div>
    );
};

export default ProfileForm;

