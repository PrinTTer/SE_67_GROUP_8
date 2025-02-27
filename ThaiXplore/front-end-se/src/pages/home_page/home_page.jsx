import { useState, useEffect } from "react";
import axios from "axios";

const HomePage = () => {
    const [data, setData] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const fetchData = async () => {
        try {
            setIsLoading(true);

            const res = await axios.get(`http://localhost:3000/users`, { withCredentials: true });
            setData(res.data);
        } catch (error) {
            setErrors(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl font-bold mb-4 text-amber-300">Welcome Home</h1>
        </div>
    )
}
export default HomePage