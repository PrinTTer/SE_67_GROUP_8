import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { EditingField } from "./editingField";
import { putData } from "../../../services/apiService";

const ProfileForm = () => {
    const { user } = useSelector((state) => state.auth);
    const [data, setData] = useState("");
    const [error, setError] = useState("");

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
            if (field === "password") {
                await putData("/users/change-password", value);
            } else if (field === "email") {
                await putData("/users/change-email", value);
            } else {
                await putData("/users", updatedData);
            }
            console.log(`Updated ${field} successfully!`);
            window.location.reload();
        } catch (error) {
            console.error(`Error updating ${field}:`, error);
            setError(`Failed to update ${field}`);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="container mx-auto max-w-4xl">
                <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-amber-500 to-amber-600 bg-clip-text text-transparent">
                    Profile Settings
                </h1>

                <div className="space-y-4">
                    <EditingField 
                        label="Name" 
                        field="name" 
                        value={data?.firstName + " " + data?.lastName} 
                        hasProfileImage={true} 
                        profileImage={data?.media} 
                        actionLabel="Edit" 
                        onSave={handleFieldUpdate} 
                    />
                    <EditingField 
                        label="Email" 
                        field="email" 
                        value={data?.email} 
                        actionLabel="Edit" 
                        onSave={handleFieldUpdate} 
                    />
                    <EditingField 
                        label="Phone" 
                        field="phoneNumber" 
                        value={data?.phoneNumber} 
                        actionLabel="Edit" 
                        onSave={handleFieldUpdate} 
                    />
                    <EditingField 
                        label="Address" 
                        field="address" 
                        value={data?.address} 
                        actionLabel="Edit" 
                        onSave={handleFieldUpdate} 
                    />
                    <EditingField 
                        label="Password" 
                        field="password" 
                        actionLabel="Edit" 
                        onSave={handleFieldUpdate} 
                    />
                </div>

                {error && (
                    <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center">
                        <svg 
                            className="w-6 h-6 text-red-500 mr-3" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24" 
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth={2} 
                                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                            />
                        </svg>
                        <span className="text-red-700">{error}</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProfileForm;