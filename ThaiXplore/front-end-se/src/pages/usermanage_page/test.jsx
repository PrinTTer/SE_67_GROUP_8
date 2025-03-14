import { useState, useEffect } from "react";
import { deleteData, fetchData } from "../../services/apiService";
import FromEdit from "./component/FromEdit";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faEdit, faTrash, faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Test = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState(""); // State สำหรับการค้นหา
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showEditPopup, setShowEditPopup] = useState(false); // ✅ เพิ่มตัวแปรนี้



  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const result = await fetchData("/all-users");
      setData(result);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("🚨 Failed to load users. Please try again.");
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    return dateString.slice(0, 10);
  };

  // ✅ เปิดป๊อปอัปยืนยันการลบ
  const confirmDeleteUser = (id) => {
    setSelectedUserId(id);
    setShowConfirm(true);
  };

  const openEditPopup = (user) => {
    setSelectedUser(user); // ✅ ส่งข้อมูลผู้ใช้ที่เลือกไปยังฟอร์มแก้ไข
    setShowEditPopup(true);
  };

  const closeEditPopup = () => {
    setShowEditPopup(false);
    setSelectedUser(null);
    getData(); // ✅ รีเฟรชข้อมูลหลังจากแก้ไขสำเร็จ
  };

  const handleDeleteUser = async () => {
    try {
        await deleteData(`/users/${selectedUserId}`); // ✅ ไม่ต้องส่ง "DELETE"
        setData(data.filter(user => user._id !== selectedUserId));

        // ✅ แจ้งเตือนลบสำเร็จ
        toast.success("✅ User deleted successfully!", {
            position: "top-right",
            autoClose: 2500
        });
    } catch (error) {
        console.error("Error deleting user:", error);

        // ✅ แจ้งเตือนลบล้มเหลว
        toast.error("❌ Failed to delete user. Please try again.");
    }
    setShowConfirm(false);
};


  // กรองข้อมูลตามการค้นหา
  const filteredData = data.filter((user) =>
    `${user.firstName} ${user.lastName}`.toLowerCase().includes(search.toLowerCase()) ||
    formatDate(user.dateCreate).toLowerCase().includes(search.toLowerCase()) ||
    user.email.toLowerCase().includes(search.toLowerCase()) ||
    user.phoneNumber.toLowerCase().includes(search.toLowerCase()) ||
    user.role.toLowerCase().includes(search.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const nextPage = () => {
    if (currentPage < Math.ceil(filteredData.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="flex flex-col items-center p-6 w-full">
      <h2 className="text-2xl w-full text-left font-bold mb-4">User Management</h2>

      {/* ช่องค้นหา (Search Bar) ชิดขวา */}
      <div className="w-full flex justify-end mb-4">
        <div className="w-full max-w-md flex items-center border border-gray-300 rounded-lg px-3 py-2 bg-white shadow">
          <FontAwesomeIcon icon={faMagnifyingGlass} className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search user..."
            className="w-full outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* ตารางข้อมูล */}
      <div className="w-full overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="w-full border-collapse">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="border p-3 text-left">Date Create</th>
              <th className="border p-3 text-left">User</th>
              <th className="border p-3 text-left">Email</th>
              <th className="border p-3 text-left">Phone Number</th>
              <th className="border p-3 text-left">Address</th>
              <th className="border p-3 text-left">Role</th>
              <th className="border p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.length > 0 ? (
              currentItems.map((user) => (
                <tr key={user._id} className="border hover:bg-gray-100 transition">
                  <td className="border p-3">{formatDate(user.dateCreate)}</td>
                  <td className="border p-3">{user.firstName + " " + user.lastName}</td>
                  <td className="border p-3">{user.email}</td>
                  <td className="border p-3">{user.phoneNumber}</td>
                  <td className="border p-3">{user.address}</td>
                  <td className="border p-3">{user.role}</td>
                  <td className="p-3 flex items-center justify-center space-x-5">
                  <button className="text-blue-500 hover:text-blue-700" 
                    onClick={() => openEditPopup(user)}>
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                    <button
                      className="text-red-500 hover:text-red-700 transition"
                      onClick={() => confirmDeleteUser(user._id)} // ✅ เปิดป๊อปอัปยืนยันการลบ
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center p-4 text-gray-500">No data available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between mt-4 space-x-4">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded ${currentPage === 1 ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-700"}`}
        >
          <FontAwesomeIcon icon={faChevronLeft} /> Previous
        </button>
        <span className="px-4 py-2 text-gray-700">
          Page {currentPage} of {Math.ceil(filteredData.length / itemsPerPage)}
        </span>
        <button
          onClick={nextPage}
          disabled={currentPage === Math.ceil(filteredData.length / itemsPerPage)}
          className={`px-4 py-2 rounded ${currentPage === Math.ceil(filteredData.length / itemsPerPage) ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-700"}`}
        >
          Next <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>

      {/* ✅ ป๊อปอัปยืนยันการลบ */}
      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center ">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-lg font-bold text-red-600">Delete Confirmation</h2>
            <p className="text-gray-700">Are you sure you want to delete this user?</p>
            <div className="mt-4 flex justify-end space-x-3">
              <button className="bg-gray-400 text-white px-4 py-2 rounded" onClick={() => setShowConfirm(false)}>Cancel</button>
              <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={handleDeleteUser}>Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* ✅ ป๊อปอัปแก้ไขข้อมูล */}
      {showEditPopup && selectedUser && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
            <FromEdit user={selectedUser} onClose={closeEditPopup} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Test;
