import { useEffect, useState } from "react";
import { putDataWithFiles } from "../../../services/apiService";
export const EditingField = (prop) => {
    const { label, field, value, hasProfileImage, profileImage, actionLabel, onSave } = prop;
    const [isEditing, setIsEditing] = useState(false);
    const [inputValue, setInputValue] = useState(value);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    
    const [currentPassword, setCurrentPassword] = useState("");
    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [error, setError] = useState("");
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        if (typeof value === 'string') {
            setFirstName(value.split(" ")[0]);
            setLastName(value.split(" ")[1]);
        }
    }, [value]);
    
    useEffect(() => {
        setInputValue(value);
    }, [value]);
    

    const handleImageChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            try {
                const response = await putDataWithFiles(
                    "users/upload-profile", [file], "users_images",
                );

                // ส่ง URL หรือไฟล์ที่ได้จากการตอบกลับไปยัง onSave
                onSave("profileImage", response.fileUrl || file);
            } catch (error) {
                console.error("เกิดข้อผิดพลาดในการอัพโหลดรูป:", error);
                setError("เกิดข้อผิดพลาดในการอัพโหลดรูปโปรไฟล์");
            }
        }
        window.location.reload();
    };

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
        } else if (field === "email") {
            if (!newEmail) {
                setError("New email is required!");
                return;
            }
            onSave(field, { newEmail, password });
        } else {
            onSave(field, inputValue);
        }

        // เก็บ error ใน sessionStorage ก่อนทำการรีเฟรช
        sessionStorage.setItem('profileFormError', error);

        // รีเฟรชหน้า
        window.location.reload();
    };
    
    return (
        <div className="flex items-center bg-white w-4xl h-[5rem] rounded-xs p-4 shadow-md border border-gray-300">
            {hasProfileImage && (
                <div onClick={() => document.getElementById("profile-image-input").click()}>
                    {/* รูปโปรไฟล์ที่แสดง */}
                    <img
                        src={`http://localhost:3000/public/uploads/users/images/${profileImage}`} // ใช้รูป default ถ้าไม่มี
                        alt="Profile"
                        className="w-12 h-12 bg-gray-400 rounded-full cursor-pointer"
                    />
                </div>
            )}
            {/* ซ่อน input file */}
            <input 
                id="profile-image-input" 
                type="file" 
                className="hidden" 
                accept="image/*" 
                onChange={handleImageChange} 
            />

            <div className="flex flex-col flex-1 ml-3">
                <p className="text-sm font-semibold text-gray-600">{label}</p>
                {isEditing && field !== "password" && field !== "email" ? (
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
                    ) : field === "phoneNumber" ? (
                        <input 
                            type="text" 
                            value={inputValue} 
                            onChange={(e) => setInputValue(e.target.value)} maxLength={10}
                            className="w-2/3 p-2 text-lg border rounded-md focus:ring-2 focus:ring-blue-400"
                        />
                    ) : (
                        <input 
                            type="text" 
                            value={inputValue} 
                            onChange={(e) => setInputValue(e.target.value)}
                            className="w-2/3 p-2 text-lg border rounded-md focus:ring-2 focus:ring-blue-400"
                        />
                    )
                ) : (
                    <p className="text-lg text-gray-800">{field === "password" ? "••••••••" : field === "email" ? (newEmail || value) : value}</p>
                )}
            </div>
            <div>
                {isEditing ? (
                    <button onClick={handleSave} className="text-green-500 hover:text-green-700 font-medium">
                        Save
                    </button>
                ) : (
                    <button onClick={() => { 
                        field === "password" ? setShowPopup(true) : field === "email" ? setShowPopup(true) : setIsEditing(true); 
                    }} className="text-blue-500 hover:text-blue-700 font-medium">
                        {actionLabel}
                    </button>
                )}
            </div>
            {showPopup && (
                <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-[#D9D9D950]  z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
                        {field === "password" ? (
                            <>
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
                            </>
                        ) : field === "email" ? (
                            <>
                                <h2 className="text-xl font-semibold mb-4">Change Email</h2>
                                <input 
                                    type="email" 
                                    value={newEmail} 
                                    onChange={(e) => setNewEmail(e.target.value)}
                                    placeholder="New Email"
                                    className="w-full p-2 text-lg border rounded-md focus:ring-2 focus:ring-blue-400 mb-2"
                                />
                                <input 
                                    type="password" 
                                    value={password} 
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Confirm Password"
                                    className="w-full p-2 text-lg border rounded-md focus:ring-2 focus:ring-blue-400 mb-2"
                                />
                            </>
                        ) : null}

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
