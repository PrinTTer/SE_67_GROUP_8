import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const SignupPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 mx-auto ">
            <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg w-full max-w-[1000px] h-[500] overflow-hidden">
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

                    <div className="">

                        {/* Email */}
                        <div className="pb-4">
                            <label htmlFor="email" className="block text-gray-700">Email</label>
                            <input id="email" type="email" placeholder="example@gmail.com" className="border p-2 rounded w-full" />
                        </div>

                        {/* Password */}
                        <div className="relative pb-4">
                            <label htmlFor="password" className="block text-gray-700">Password</label>
                            <div className="flex items-center border rounded w-full">
                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Password"
                                    className="p-2 w-full outline-none"
                                />
                                <button
                                    type="button"
                                    className="p-2"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    <FontAwesomeIcon
                                        icon={showPassword ? faEyeSlash : faEye}
                                        className="h-5 w-5 text-gray-500"
                                    />
                                </button>
                            </div>
                        </div>

                        <a href="#" className="text-blue-600">Forgot password?</a>

                        <div className="flex justify-center pt-4">
                            <button type="button" className="bg-blue-600 text-white rounded p-2 px-6">Sign in</button>
                        </div>
                    </div>

                    <div className="flex justify-between items-center mt-6">
                        <div>
                            <a href="#" className="text-gray-700">New to ThaiXplore? </a>
                            <a href="#" className="text-blue-600">Sign up</a>
                        </div>
                        
                        <button href="#" className="text-blue-600">visit in Guest</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignupPage;
