import { useState } from "react";
import { Link,useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const RolePage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { firstName, lastName, email, phoneNumber, password, address } = location.state; // รับข้อมูลที่ส่งมาจาก SignupPage
    const [selectedRole, setSelectedRole] = useState("");
    
    console.log(location.state);
    console.log(selectedRole);

    const handleRoleSubmit = async () => {
        if (!selectedRole) {
            console.error("Error: Role is not selected.");
            return;
        }
    
        const requestData = {
            email,
            password,
            firstName,
            lastName,
            phoneNumber, // ✅ ใช้ phoneNumber ให้ตรงกับ Backend
            address,
            role: selectedRole, 
        };
    
        console.log("Sending request data:", requestData); // ✅ Log ข้อมูลที่ส่งไป
    
        try {
            const response = await axios.post("http://localhost:3000/auth/register", requestData, {
                headers: { "Content-Type": "application/json" },
            });
    
            console.log("User registered successfully:", response.data);
            navigate("/signup/finishsignup" , {state : requestData});
        } catch (error) {
            console.error("Error registering user:", error.response?.data || error.message);
        }
    };
    

    

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 mx-auto">
            <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg w-full max-w-[1000px] min-h-[420px] overflow-hidden">
                {/* ส่วนของรูปภาพ */}
                <div className="w-full md:w-1/2 md:shrink-0">
                    <img
                        src="/business.svg"
                        alt="Business"
                        className="w-full h-full object-contain rounded-l-lg"
                    />
                </div>

                {/* ส่วนของฟอร์ม */}
                <div className="w-full md:w-1/2 p-8">
                    <h2 className="text-2xl font-bold text-center mb-6">ThaiXplore</h2>

                    <h5 className="text-center mb-4">How would you like to use ThaiXplore?</h5>

                    {/* Radio Button สำหรับ Role */}
                    <div className="flex flex-col gap-4 pb-35">
                        <label className="flex items-center gap-2 pl-30">
                            <input
                                type="radio"
                                name="role"
                                value="tourist"
                                className="form-radio h-5 w-5 text-blue-600"
                                checked={selectedRole === "tourist"}
                                onChange={() => setSelectedRole("tourist")}
                            />
                            <span className="text-gray-700">Tourist</span>
                        </label>

                        <label className="flex items-center gap-2 pl-30">
                            <input
                                type="radio"
                                name="role"
                                value="entrepreneur"
                                className="form-radio h-5 w-5 text-blue-600"
                                checked={selectedRole === "entrepreneur"}
                                onChange={() => setSelectedRole("entrepreneur")}
                            />
                            <span className="text-gray-700">Entrepreneur</span>
                        </label>
                        
                    </div>
                    {/* ปุ่ม Navigation */}
                    <div className="flex justify-between items-center mt-6">
                        <Link to="/signup" className="text-gray-700">Back</Link>
                        <button
                            onClick={handleRoleSubmit}
                            className={`text-blue-600 ${selectedRole ? "" : "opacity-50 pointer-events-none"}`}
                            disabled={!selectedRole}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RolePage;