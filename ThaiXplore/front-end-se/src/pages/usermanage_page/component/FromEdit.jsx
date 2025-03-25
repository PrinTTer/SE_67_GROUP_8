import { useState, useEffect } from "react";
import { putData } from "../../../services/apiService";
import { toast } from "react-toastify";

const FromEdit = ({ user, onClose }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    role: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        role: user.role,
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      const selectedUserId = user._id;
      await putData(`/users/${selectedUserId}`, formData);
      
      // Use toast for notification
      toast.success("User updated successfully!", {
        position: "top-right",
        autoClose: 2500
      });
      
      onClose();
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Failed to update user.", {
        position: "top-right",
        autoClose: 2500
      });
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Edit User Profile</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
              First Name
            </label>
            <input 
              type="text" 
              id="firstName"
              name="firstName" 
              value={formData.firstName} 
              onChange={handleChange} 
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>
          
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
              Last Name
            </label>
            <input 
              type="text" 
              id="lastName"
              name="lastName" 
              value={formData.lastName} 
              onChange={handleChange} 
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <input 
            type="email" 
            id="email"
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>

        <div>
          <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number
          </label>
          <input 
            type="tel" 
            id="phoneNumber"
            name="phoneNumber" 
            value={formData.phoneNumber} 
            onChange={handleChange} 
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>

        <div>
          <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
            User Role
          </label>
          <select 
            id="role"
            name="role" 
            value={formData.role} 
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          >
            <option value="">Select Role</option>
            <option value="admin">Admin</option>
            <option value="entrepreneur">Entrepreneur</option>
            <option value="tourist">Tourist</option>
          </select>
        </div>

        <div className="flex justify-between space-x-4 pt-4">
          <button 
            type="button"
            onClick={onClose}
            className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-md hover:bg-gray-300 transition"
          >
            Cancel
          </button>
          <button 
            type="submit"
            className="flex-1 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default FromEdit;