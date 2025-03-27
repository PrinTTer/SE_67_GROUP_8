import { use, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from "react-router-dom";
import { fetchData } from "../../services/apiService";

const SignupPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [user, setUser] = useState(null);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        address: "",
        password: "",
        confirmPassword: "",
    });
    
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));

        // ล้าง error ทันทีที่พิมพ์
        setErrors((prev) => ({ ...prev, [id]: "" }));
    };

    const validatePassword = (password) => {
        if (password.length < 8) {
            return "Password must be at least 8 characters.";
        }
        if (!/[A-Za-z]/.test(password)) {
            return "Password must include at least one letter.";
        }
        if (!/\d/.test(password)) {
            return "Password must include at least one number.";
        }
        return ""; // ถ้าผ่านทุกเงื่อนไข
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        let newErrors = {};
    
        if (!formData.firstName.trim()) newErrors.firstName = "Please enter first name.";
        if (!formData.lastName.trim()) newErrors.lastName = "Please enter last name.";
        if (!formData.email.trim()) {
            newErrors.email = "Please enter email.";
        } else if (!formData.email.includes('@')) {
            newErrors.email = "Please include an '@' in the email address.";
        }
        if (!formData.phoneNumber.trim()) newErrors.phoneNumber = "Please enter phone number.";
        
        // ตรวจสอบ password ทีละเงื่อนไข
        if (!formData.password.trim()) {
            newErrors.password = "Please enter password.";
        } else {
            const passwordError = validatePassword(formData.password);
            if (passwordError) newErrors.password = passwordError;
        }
    
        if (!formData.confirmPassword.trim()) {
            newErrors.confirmPassword = "Please confirm your password.";
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match.";
        }
    
        setErrors(newErrors);
        if (Object.keys(newErrors).length === 0) {
            navigate("/signup/role", { state: formData}); // ไปหน้าถัดไปถ้าข้อมูลถูกต้อง
        }
    };
    

    

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 mx-auto">
            <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg w-full max-w-[1000px] min-h-[420px] overflow-hidden">
                {/* รูปภาพ */}
                <div className="w-full md:w-1/2 md:shrink-0">
                    <img src="/business.svg" alt="Business" className="w-full h-full object-contain rounded-l-lg" />
                </div>

                {/* ฟอร์ม */}
                <div className="w-full md:w-1/2 p-8">
                    <h2 className="text-2xl font-bold text-center mb-6">ThaiXplore</h2>

                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3">
                            {/* First Name */}
                            <div>
                                <label htmlFor="firstName" className="block text-gray-700">First Name</label>
                                <input
                                    id="firstName"
                                    type="text"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    placeholder="Your first name"
                                    className={`border p-2 rounded w-full ${errors.firstName ? "border-red-500" : ""}`}
                                />
                                {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
                            </div>

                            {/* Last Name */}
                            <div>
                                <label htmlFor="lastName" className="block text-gray-700">Last Name</label>
                                <input
                                    id="lastName"
                                    type="text"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    placeholder="Your last name"
                                    className={`border p-2 rounded w-full ${errors.lastName ? "border-red-500" : ""}`}
                                />
                                {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
                            </div>

                            {/* Email */}
                            <div>
                                <label htmlFor="email" className="block text-gray-700">Email</label>
                                <input
                                    id="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="example@gmail.com"
                                    className={`border p-2 rounded w-full ${errors.email ? "border-red-500" : ""}`}
                                />
                                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                            </div>

                            {/* PhoneNumber */}
                            <div>
                                <label htmlFor="phoneNumber" className="block text-gray-700">Phone</label>
                                <input
                                    id="phoneNumber"
                                    type="text"
                                    value={formData.phoneNumber}
                                    onChange={handleChange}
                                    placeholder="Phone number"
                                    className={`border p-2 rounded w-full ${errors.phoneNumber ? "border-red-500" : ""}`}
                                />
                                {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber}</p>}
                            </div>

                            {/* Password */}
                            <div className="relative">
                                <label htmlFor="password" className="block text-gray-700">Password</label>
                                <div className={`flex items-center border rounded w-full ${errors.password ? "border-red-500" : ""}`}>
                                    <input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="Password"
                                        className="p-2 w-full outline-none"
                                    />
                                    <button type="button" className="p-2" onClick={() => setShowPassword(!showPassword)}>
                                        <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} className="h-5 w-5 text-gray-500" />
                                    </button>
                                </div>
                                {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                            </div>

                            {/* Confirm Password */}
                            <div className="relative">
                                <label htmlFor="confirmPassword" className="block text-gray-700">Confirm Password</label>
                                <div className={`flex items-center border rounded w-full ${errors.confirmPassword ? "border-red-500" : ""}`}>
                                    <input
                                        id="confirmPassword"
                                        type={showConfirmPassword ? "text" : "password"}
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        placeholder="Confirm password"
                                        className="p-2 w-full outline-none"
                                    />
                                    <button type="button" className="p-2" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                                        <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} className="h-5 w-5 text-gray-500" />
                                    </button>
                                </div>
                                {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
                            </div>
                        </div>

                        <div className="flex justify-between items-center mt-6">
                            <Link to="/login" className="text-gray-600">Sign in</Link>
                            <button type="submit" className="text-blue-600">Next</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignupPage;
