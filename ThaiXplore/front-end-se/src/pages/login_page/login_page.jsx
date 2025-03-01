import { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../features/authSlice";
import { isAuthenticated } from "../../services/authService";

const LoginPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({ email: "", password: "" });

    const dispatch = useDispatch();
    const { isLoading, loginError , user } = useSelector((state) => state.auth);

    const login = () => {
        dispatch(loginUser({ email, password }));
    }

    useEffect(() => {
        if (isAuthenticated()) {
            navigate("/");
        }
    }, [user]);

    console.log(user);

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { id, value } = e.target;
        if (id === "email") {
            setEmail(value);
            if (value.trim()) {
                setErrors((prev) => ({ ...prev, email: "" })); // ล้าง error ของ email ทันที
            }
        } else if (id === "password") {
            setPassword(value);
            if (value.trim()) {
                setErrors((prev) => ({ ...prev, password: "" })); // ล้าง error ของ password ทันที
            }
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let newErrors = { email: "", password: "" };

        if (!email.trim()) newErrors.email = "Please enter email.";
        if (!password.trim()) newErrors.password = "Please enter password.";

        setErrors(newErrors);

        if (!newErrors.email && !newErrors.password) {
            login(); // เรียกฟังก์ชัน fetchData เมื่อกดปุ่ม login
        }
    };


    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 mx-auto">
            <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg w-full max-w-[1000px] min-h-[420px] overflow-hidden">
                <div className="w-full md:w-1/2 md:shrink-0">
                    <img src="/business.svg" alt="Business" className="w-full h-full object-contain rounded-l-lg" />
                </div>

                <div className="w-full md:w-1/2 p-8">
                    <h2 className="text-2xl font-bold text-center mb-6">ThaiXplore</h2>

                    <form onSubmit={handleSubmit}>
                        {/* Email */}
                        <div className="pb-4">
                            <label htmlFor="email" className="block text-gray-700">Email</label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={handleChange}
                                placeholder="example@gmail.com"
                                className={`border p-2 rounded w-full ${errors.email ? "border-red-500" : ""}`}
                            />
                            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                        </div>

                        {/* Password */}
                        <div className="relative pb-4">
                            <label htmlFor="password" className="block text-gray-700">Password</label>
                            <div className={`flex items-center border rounded w-full ${errors.password ? "border-red-500" : ""}`}>
                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={handleChange}
                                    placeholder="Password"
                                    className="p-2 w-full outline-none"
                                />
                                <button type="button" className="p-2" onClick={() => setShowPassword(!showPassword)}>
                                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} className="h-5 w-5 text-gray-500" />
                                </button>
                            </div>
                            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                        </div>

                        {loginError && <p className="text-red-500 text-sm mb-2">{loginError}</p>}

                        <a href="#" className="text-blue-600">Forgot password?</a>

                        <div className="flex justify-center pt-4">
                            <button type="submit" className="bg-blue-600 text-white rounded p-2 px-6">Sign in</button>
                        </div>
                    </form>

                    <div className="flex justify-between items-center mt-6">
                        <div className="flex items-center">
                            <h5 className="text-gray-700 mr-1">New to ThaiXplore?</h5>
                            <Link to="/signup" className="text-blue-600">Sign up</Link>
                        </div>

                        <Link to="/" className="text-blue-600">Visit as Guest</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
