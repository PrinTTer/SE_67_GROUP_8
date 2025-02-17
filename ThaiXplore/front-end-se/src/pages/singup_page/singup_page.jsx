import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import ไอคอนจาก Font Awesome

const SingupPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="flex bg-white shadow-lg rounded-lg w-[900px]">
                {/* ส่วนของรูปภาพ */}
                <div className="w-1/2">
                    <img
                        src="/business.svg"
                        alt="Business"
                        className="w-full h-full object-cover rounded-l-lg"
                    />
                </div>


                {/* ส่วนของฟอร์ม */}
                <div className="w-1/2 p-8">
                    <h2 className="text-2xl font-bold text-center mb-6">ThaiXplore</h2>

                    <div className="grid grid-cols-2 gap-4">
                        {/* First Name */}
                        <div>
                            <label htmlFor="first-name" className="block text-gray-700">First Name</label>
                            <input id="first-name" type="text" placeholder="Your first name" className="border p-2 rounded w-full" />
                        </div>

                        {/* Last Name */}
                        <div>
                            <label htmlFor="last-name" className="block text-gray-700">Last Name</label>
                            <input id="last-name" type="text" placeholder="Your last name" className="border p-2 rounded w-full" />
                        </div>

                        {/* Email */}
                        <div>
                            <label htmlFor="email" className="block text-gray-700">Email</label>
                            <input id="email" type="email" placeholder="example@gmail.com" className="border p-2 rounded w-full" />
                        </div>

                        {/* Phone */}
                        <div>
                            <label htmlFor="phone" className="block text-gray-700">Phone</label>
                            <input id="phone" type="text" placeholder="Phone number" className="border p-2 rounded w-full" />
                        </div>

                        {/* Password */}
                        <div className="relative">
                            <label htmlFor="password" className="block text-gray-700">Password</label>
                            <div className="flex items-center border rounded w-full">
                                <button
                                    type="button"
                                    className="p-2"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? (
                                        <FaEyeSlash className="h-5 w-5 text-gray-500" />
                                    ) : (
                                        <FaEye className="h-5 w-5 text-gray-500" />
                                    )}
                                </button>
                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Password"
                                    className="p-2 w-full outline-none"
                                />
                            </div>
                        </div>

                        {/* Confirm Password */}
                        <div className="relative">
                            <label htmlFor="confirm-password" className="block text-gray-700">Confirm Password</label>
                            <div className="flex items-center border rounded w-full">
                                <button
                                    type="button"
                                    className="p-2"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                >
                                    {showConfirmPassword ? (
                                        <FaEyeSlash className="h-5 w-5 text-gray-500" />
                                    ) : (
                                        <FaEye className="h-5 w-5 text-gray-500" />
                                    )}
                                </button>
                                <input
                                    id="confirm-password"
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder="Confirm password"
                                    className="p-2 w-full outline-none"
                                />
                            </div>
                        </div>
                    </div>


                    <div className="flex justify-between items-center mt-6">
                        <a href="#" className="text-gray-600">Sign in</a>
                        <button className="text-blue-600">Next</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SingupPage;
