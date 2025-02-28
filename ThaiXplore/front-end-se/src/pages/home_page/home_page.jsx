import { useState, useEffect } from "react";
import axios from "axios";

const HomePage = () => {
    const [userData, setUserData] = useState(null);
    const [data, setData] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            setIsLoading(true);
            setError(null);

            // ดึง token จาก Local Storage
            const token = localStorage.getItem("token");
            console.log(token);

            if (!token) {
                setError("No token found");
                setIsLoading(false);
                return;
            }

            try {
                const res = await axios.get("http://localhost:3000/users", {
                    headers: { Authorization: `Bearer ${token}` }, // ส่ง token ใน header
                    withCredentials: true,
                });

                setUserData(res.data); // ตั้งค่าข้อมูลผู้ใช้
            } catch (error) {
                setError("Failed to fetch user data");
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserData();
    }, []);

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl font-bold mb-4 text-amber-300">Welcome Home</h1>
            {isLoading && <p>Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {userData && (
                <div className="text-lg text-white">
                    <p><strong>ID:</strong> {userData._id}</p>
                    <p><strong>Name:</strong> {userData.name}</p>
                    <p><strong>Email:</strong> {userData.email}</p>
                </div>
            )}
        </div>
    )
}
export default HomePage