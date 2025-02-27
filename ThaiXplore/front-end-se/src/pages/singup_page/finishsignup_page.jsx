import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const ThxPage = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [errors, setErrors] = useState(null);
    const [loginError, setLoginError] = useState(""); // เพิ่ม state นี้

    const fetchData = async () => {
        try {
            setIsLoading(true);
            const resAuth = await axios.post(`http://localhost:3000/auth/login`, {
                email: email,
                password: password
            }, { withCredentials: true });
            
            console.log("Response from API:", resAuth); 

            if (resAuth.data && resAuth.data.authentication && resAuth.data.authentication.sessionToken) {
                localStorage.setItem("token", resAuth.data.authentication.sessionToken);
                navigate("/");
            } else {
                setLoginError("Invalid email or password.");
            }

        } catch (error) {
            setLoginError("Invalid email or password.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (errors) {
        return <div>Error fetching data: {errors.message}</div>;
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 mx-auto">
            <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg w-full max-w-[1000px] min-h-[420px] overflow-hidden">
                <div className="w-full md:w-1/2 md:shrink-0">
                    <img src="/business.svg" alt="Business" className="w-full h-full object-contain rounded-l-lg" />
                </div>

                <div className="w-full md:w-1/2 p-8">
                    <div className="flex flex-col gap-4 text-center pb-34 mt-20">
                        <h2 className="text-center mb-4 text-2xl font-bold">Welcome to ThaiXplore!</h2>
                        <h2 className="text-center mb-4 text-xl font-bold">Let’s get started</h2>
                    </div>
                    
                    <div className="flex justify-between items-center mt-auto">
                        <Link to="/signup/role" className="text-gray-700">Back</Link>
                        <Link to="/" className="text-blue-600">Start now</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ThxPage;
