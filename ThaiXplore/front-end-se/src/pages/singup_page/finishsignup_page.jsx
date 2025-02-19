import { useState } from "react";
import { Link } from "react-router-dom";

const ThxPage = () => {
    const [selectedRole, setSelectedRole] = useState(""); // ใช้ string แทน object

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
                    {/* <h2 className="text-2xl font-bold text-center mb-6">ThaiXplore</h2> */}

                    <div className="flex flex-col gap-4 text-center pb-34 mt-20">
                        <h2 className="text-center mb-4 text-2xl font-bol">Welcome to ThaiXplore!</h2>
                        <h2 className="text-center mb-4 text-xl font-bol">Let’s get started</h2>
                    </div>
                    
                    {/* ลองแสดงค่าที่เก็บจากการกรอกสมัครสมาชิก */}
                    {/* ปุ่ม Navigation */}
                    <div className="flex justify-between items-center mt-auto">
                        <Link to="/signup/role" className="text-gray-700">Back</Link>
                        <Link to="/home" className={"text-blue-600 "}>
                            Start now
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ThxPage;