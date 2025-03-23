import { useEffect, useState } from "react";

export const EditingField = (prop) => {
    const { label, field, value, hasProfileImage, actionLabel, onSave } = prop;
    const [isEditing, setIsEditing] = useState(false);
    const [inputValue, setInputValue] = useState(value);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [error, setError] = useState("");
    const [showPopup, setShowPopup] = useState(false);
    
    useEffect(() => {
        setFirstName(value?.split(" ")[0]);
        setLastName(value?.split(" ")[1]);
    }, [value]);
    
    useEffect(() => {
        setInputValue(value);
    }, [value]);
    
    const handleSave = () => {
        setIsEditing(false);
        setShowPopup(false);

        if (field === "password") {
            if (newPassword !== confirmNewPassword) {
                setError("New passwords do not match!");
                return;
            }
            onSave(field, { currentPassword, newPassword });
        } else if (field === "name") {
            onSave(field, `${firstName} ${lastName}`);
        } else {
            onSave(field, inputValue);
        }
    };
    
    return (
        <div className="flex items-center bg-white w-4xl h-[5rem] rounded-xs p-4 shadow-md border border-gray-300">
            {hasProfileImage && (
                <div className="w-12 h-12 bg-gray-400 rounded-full flex items-center justify-center text-white text-lg">
                    👤
                </div>
            )}
            <div className="flex flex-col flex-1 ml-3">
                <p className="text-sm font-semibold text-gray-600">{label}</p>
                {isEditing && field !== "password" ? (
                    field === "name" ? (
                        <div className="flex space-x-2">
                            <input 
                                type="text" 
                                value={firstName} 
                                onChange={(e) => setFirstName(e.target.value)}
                                placeholder="First Name"
                                className="w-1/2 p-2 text-lg border rounded-md focus:ring-2 focus:ring-blue-400"
                            />
                            <input 
                                type="text" 
                                value={lastName} 
                                onChange={(e) => setLastName(e.target.value)}
                                placeholder="Last Name"
                                className="w-1/2 p-2 text-lg border rounded-md focus:ring-2 focus:ring-blue-400"
                            />
                        </div>
                    ) : (
                        <input 
                            type="text" 
                            value={inputValue} 
                            onChange={(e) => setInputValue(e.target.value)}
                            className="w-2/3 p-2 text-lg border rounded-md focus:ring-2 focus:ring-blue-400"
                        />
                    )
                ) : (
                    <p className="text-lg text-gray-800">{field === "password" ? "••••••••" : value}</p>
                )}
            </div>
            <div>
                {isEditing ? (
                    <button onClick={handleSave} className="text-green-500 hover:text-green-700 font-medium">
                        Save
                    </button>
                ) : (
                    <button onClick={() => { field === "password" ? setShowPopup(true) : setIsEditing(true); }} className="text-blue-500 hover:text-blue-700 font-medium">
                        {actionLabel}
                    </button>
                )} 
            </div>
            {showPopup && (
                <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-[#D9D9D950]  z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
                        <h2 className="text-xl font-semibold mb-4">Change Password</h2>
                        <input 
                            type="password" 
                            value={currentPassword} 
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            placeholder="Current Password"
                            className="w-full p-2 text-lg border rounded-md focus:ring-2 focus:ring-blue-400 mb-2"
                        />
                        <input 
                            type="password" 
                            value={newPassword} 
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="New Password"
                            className="w-full p-2 text-lg border rounded-md focus:ring-2 focus:ring-blue-400 mb-2"
                        />
                        <input 
                            type="password" 
                            value={confirmNewPassword} 
                            onChange={(e) => setConfirmNewPassword(e.target.value)}
                            placeholder="Confirm New Password"
                            className="w-full p-2 text-lg border rounded-md focus:ring-2 focus:ring-blue-400 mb-2"
                        />
                        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
                        <div className="flex justify-end space-x-2">
                            <button onClick={() => setShowPopup(false)} className="text-gray-500 hover:text-gray-700">Cancel</button>
                            <button onClick={handleSave} className="text-green-500 hover:text-green-700">Save</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
