import React, { useState, useEffect } from "react";
import { fetchData } from "../../services/apiService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const VerifyBusiness = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [search, setSearch] = useState("");

    // useEffect(() => {
    //     const getData = async () => {
    //         setLoading(true);
    //         try {
    //             const result = await fetchData("/business");
    //             const filteredUsers = result.filter(user => user.role !== "admin");
    //             setData(filteredUsers);
    //         } catch (error) {
    //             setError(error.message);
    //         } finally {
    //             setLoading(false);
    //         }
    //     };
    //     getData();
    // }, []);

    // console.log(data);

    return (
        <main className="flex flex-col items-center p-6 w-full">
            <h2 className="text-2xl w-full text-left font-bold mb-4">User Management</h2>
            <div>
                {/* แสดงข้อมูลธุรกิจที่ยังไม่ถูกยืนยัน และถูกยืนยันแล้ว */}
            </div>
            
        </main>
    )
}

export default VerifyBusiness;