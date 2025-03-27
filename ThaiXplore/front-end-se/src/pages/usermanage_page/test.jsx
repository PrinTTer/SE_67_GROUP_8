import { useState, useEffect } from "react";
import { deleteData, fetchData } from "../../services/apiService";
import FromEdit from "./component/FromEdit";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faEdit, faTrash, faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Test = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showEditPopup, setShowEditPopup] = useState(false);

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

  const confirmDeleteUser = (id) => {
    setSelectedUserId(id);
    setShowConfirm(true);
  };

  const openEditPopup = (user) => {
    setSelectedUser(user);
    setShowEditPopup(true);
  };

  const closeEditPopup = () => {
    setShowEditPopup(false);
    setSelectedUser(null);
    getData();
  };

  const handleDeleteUser = async () => {
    try {
      await deleteData(`/users/${selectedUserId}`);
      setData(data.filter(user => user._id !== selectedUserId));
      toast.success("✅ User deleted successfully!", {
        position: "top-right",
        autoClose: 2500
      });
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("❌ Failed to delete user. Please try again.");
    }
    setShowConfirm(false);
  };

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
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="flex flex-5 flex-col bg-white min-h-screen">
      <div className="bg-gradient-to-r from-amber-600 to-amber-500 text-white py-6 px-8 shadow-md">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold">User Management</h2>
        </div>
      </div>

      <div className="w-full mx-auto  px-8 py-6">
        <div className="w-full flex justify-end mb-4">
          <div className="w-full max-w-md flex items-center border border-gray-300 rounded-lg px-3 py-2 bg-white shadow">
            <FontAwesomeIcon icon={faMagnifyingGlass} className="text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Search users..."
              className="bg-transparent outline-none w-full"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

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
                      <button className="text-blue-500 hover:text-blue-700" onClick={() => openEditPopup(user)}>
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                      <button
                        className="text-red-500 hover:text-red-700 transition"
                        onClick={() => confirmDeleteUser(user._id)}
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

        {filteredData.length > itemsPerPage && (
          <div className="flex justify-between items-center px-6 py-4 border-t border-amber-100 bg-amber-50">
            <div className="text-sm text-amber-700">
              Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredData.length)} of {filteredData.length} results
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={prevPage}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded ${currentPage === 1
                    ? "bg-amber-200 text-white cursor-not-allowed"
                    : "bg-amber-500 text-white hover:bg-amber-600"
                  }`}
              >
                <FontAwesomeIcon icon={faChevronLeft} className="mr-2" /> Previous
              </button>
              <span className="text-amber-800 font-medium">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={nextPage}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded ${currentPage === totalPages
                    ? "bg-amber-200 text-white cursor-not-allowed"
                    : "bg-amber-500 text-white hover:bg-amber-600"
                  }`}
              >
                Next <FontAwesomeIcon icon={faChevronRight} className="ml-2" />
              </button>
            </div>
          </div>
        )}

        {showConfirm && (
          <div className="fixed inset-0 flex items-center justify-center">
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

        {showEditPopup && selectedUser && (
          <div className="fixed inset-0 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
              <FromEdit user={selectedUser} onClose={closeEditPopup} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Test;
