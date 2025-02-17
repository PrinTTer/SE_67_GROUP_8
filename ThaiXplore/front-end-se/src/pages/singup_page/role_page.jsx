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

                        
                        <h5 >How would you like to use ThaiXplore?</h5>


                        <div className="flex justify-center">
                            <input type="checkbox" class="appearance-none indeterminate:bg-gray-300" />
                        </div>
                        <div className="flex justify-center">
                            <input type="checkbox" class="appearance-none indeterminate:bg-gray-300" />
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
