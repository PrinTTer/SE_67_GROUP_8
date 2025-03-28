import { useEffect, useState } from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { postDataWithFiles } from "../../../services/apiService";


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
                const response = await postDataWithFiles(
                    "users/upload-profile", [file], null, "users_images",
                );

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
        setShowPopup(true);  // ให้ popup แสดงก่อน
        setError("");  // เคลียร์ข้อผิดพลาดก่อน
        if (field === "password") {
            if (newPassword !== confirmNewPassword) {
                setError("New passwords do not match!");
                return;
            }
            if (newPassword.length < 8) {
                setError("Password must be at least 8 characters long!");
                return;
            }
            onSave(field, { currentPassword, newPassword });
        } else if (field === "name") {
            if (!firstName || !lastName) {
                setError("Both first name and last name are required!");
                return;
            }
            onSave(field, `${firstName} ${lastName}`);
        } else if (field === "email") {
            if (!newEmail || !password) {
                setError("New email and password are required!");
                return;
            }
            const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
            if (!emailPattern.test(newEmail)) {
                setError("Please enter a valid email address.");
                return;
            }
            onSave(field, { newEmail, password });
        } else if (field === "phoneNumber") {
            // Validation สำหรับ phoneNumber
            const phonePattern = /^[0-9]{10}$/;  // ตรวจสอบว่าหมายเลขโทรศัพท์มีความยาว 10 หลักและประกอบด้วยตัวเลข
            if (!phonePattern.test(inputValue)) {
                setError("Please enter a valid phone number (10 digits).");
                setShowPopup(false);
                return;
            }
            onSave(field, inputValue);
        } else {
            if (!inputValue.trim()) {
                setError("Field cannot be empty!");
                return;
            }
            onSave(field, inputValue);
        }
    
        // เมื่อ validation สำเร็จและไม่มีข้อผิดพลาด ให้ปิด popup
        setShowPopup(false);  // ปิด popup
    };
    
    
    
    return (
        <div className="flex items-center bg-white w-3xl h-[5rem] rounded-lg p-4 shadow-md border border-gray-200 hover:shadow-lg transition-all duration-300 ">
            {hasProfileImage && (
                <div 
                    onClick={() => document.getElementById("profile-image-input").click()}
                    className="cursor-pointer group"
                >
                    {profileImage === undefined ? (
                        <div className="w-14 h-14 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full flex items-center justify-center text-white group-hover:opacity-80 transition-opacity">
                            <FontAwesomeIcon icon={faUser} className="text-xl"/>
                        </div>
                    ) : (
                        <img
                            src={`http://localhost:3000/public/uploads/users/images/${profileImage}`}
                            alt="Profile"
                            className="w-14 h-14 rounded-full border-2 border-amber-500 object-cover group-hover:opacity-80 transition-opacity"
                        />
                    )}
                </div>
            )}
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
                                className="w-1/2 p-2 text-lg border rounded-md focus:ring-2 focus:ring-amber-400"
                            />
                            <input 
                                type="text" 
                                value={lastName} 
                                onChange={(e) => setLastName(e.target.value)}
                                placeholder="Last Name"
                                className="w-1/2 p-2 text-lg border rounded-md focus:ring-2 focus:ring-amber-400"
                            />
                        </div>
                    ) : (
                        <input 
                            type="text" 
                            value={inputValue} maxLength={field === 'phoneNumber' ? 10 : undefined} 
                            onChange={(e) => setInputValue(e.target.value)}
                            className="w-2/3 p-2 text-lg border rounded-md focus:ring-2 focus:ring-amber-400"
                        />
                    )
                ) : (
                    <p className="text-lg text-gray-800">
                        {field === "password" ? "••••••••" : field === "email" ? (newEmail || value) : value}
                    </p>
                )}
                {/* Display error message for phoneNumber below the input */}
                {field === "phoneNumber" && error && (
                    <p className="text-red-500 text-sm mt-2">{error}</p>
                )}
            </div>
            <div>
                {isEditing ? (
                    <button 
                        onClick={handleSave} 
                        className="text-green-500 hover:text-green-700 font-medium"
                    >
                        Save
                    </button>
                ) : (
                    <button 
                        onClick={() => { 
                            field === "password" || field === "email" ? setShowPopup(true) : setIsEditing(true); 
                        }} 
                        className="text-amber-500 hover:text-amber-700 font-medium"
                    >
                        {actionLabel}
                    </button>
                )}
            </div>
            {showPopup && (
                <div className="fixed inset-0 bg-[#00000030] bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
                        {field === "password" ? (
                            <>
                                <h2 className="text-xl font-semibold mb-4 text-gray-800">Change Password</h2>
                                <input 
                                    type="password" 
                                    value={currentPassword} 
                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                    placeholder="Current Password"
                                    className="w-full p-2 text-lg border rounded-md focus:ring-2 focus:ring-amber-400 mb-2"
                                />
                                <input 
                                    type="password" 
                                    value={newPassword} 
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    placeholder="New Password"
                                    className="w-full p-2 text-lg border rounded-md focus:ring-2 focus:ring-amber-400 mb-2"
                                />
                                <input 
                                    type="password" 
                                    value={confirmNewPassword} 
                                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                                    placeholder="Confirm New Password"
                                    className="w-full p-2 text-lg border rounded-md focus:ring-2 focus:ring-amber-400 mb-2"
                                />
                            </>
                        ) : field === "email" ? (
                            <>
                                <h2 className="text-xl font-semibold mb-4 text-gray-800">Change Email</h2>
                                <input 
                                    type="email" 
                                    value={newEmail} 
                                    onChange={(e) => setNewEmail(e.target.value)}
                                    placeholder="New Email"
                                    className="w-full p-2 text-lg border rounded-md focus:ring-2 focus:ring-amber-400 mb-2"
                                />
                                <input 
                                    type="password" 
                                    value={password} 
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Confirm Password"
                                    className="w-full p-2 text-lg border rounded-md focus:ring-2 focus:ring-amber-400 mb-2"
                                />
                            </>
                        ) : null}

                        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
                        <div className="flex justify-end space-x-2">
                            <button 
                                onClick={() => setShowPopup(false)} 
                                className="text-gray-500 hover:text-gray-700"
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={handleSave} 
                                className="text-green-500 hover:text-green-700"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};