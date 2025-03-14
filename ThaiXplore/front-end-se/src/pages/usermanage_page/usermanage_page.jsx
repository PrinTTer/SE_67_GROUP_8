import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from "react";
import { fetchData } from "../../services/apiService";
import { FaSearch, FaEdit, FaTrash } from '@fortawesome/free-solid-svg-icons'; // แก้ไขการ import

const Usermanage = () => {
    const [data, setData] = useState([]); // เก็บข้อมูลผู้ใช้
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [search, setSearch] = useState(""); // เพิ่ม search state

    useEffect(() => {
        const getData = async () => {
            setLoading(true);
            try {
                const result = await fetchData("/all-users"); // ใช้ /users ตาม API
                const filteredUsers = result.filter(user => user.role !== "admin"); // กรอง admin ออก
                setData(filteredUsers);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
    
        getData();
    }, []);

    if (loading) return <div>Loading...</div>; // แสดงข้อความโหลด
    if (error) return <div>Error: {error}</div>; // แสดงข้อผิดพลาด

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">User Management</h2>

            {/* Search Bar */}
            <div className="mb-4 flex items-center border rounded-lg p-2 w-1/3 bg-gray-100">
                <FaSearch className="text-gray-500 mr-2" />
                <input
                    type="text"
                    placeholder="Search"
                    className="bg-transparent outline-none w-full"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            {/* Table */}
            <table className="w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border p-2">Name</th>
                        <th className="border p-2">Email</th>
                        <th className="border p-2">Date Create</th>
                        <th className="border p-2">Phone Number</th>
                        <th className="border p-2">Role</th>
                        <th className="border p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data
                        .filter(user => 
                            user.name.toLowerCase().includes(search.toLowerCase()) || 
                            user.role.toLowerCase().includes(search.toLowerCase())
                        )
                        .map((user) => (
                            <tr key={user.id} className="even:bg-gray-100">
                                <td className="border p-2 font-semibold">{user.name}</td>
                                <td className="border p-2 font-bold">{user.email}</td>
                                <td className="border p-2">{user.dateCreated}</td>
                                <td className="border p-2">{user.phone}</td>
                                <td className="border p-2">{user.role}</td>
                                <td className="border p-2 flex justify-center gap-3">
                                    <button className="text-green-500 hover:text-green-700">
                                        <FaEdit size={18} />
                                    </button>
                                    <button className="text-red-500 hover:text-red-700" onClick={() => deleteUser(user.id)}>
                                        <FaTrash size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
};

export default Usermanage;
