import { useState, useEffect } from "react";
import { putData } from "../../../services/apiService";



const FromEdit = ({ user, onClose }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    role: "",
  });

  console.log("User:", user);

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

  const handleSubmit = async () => {
    try {
      const selectedUserId = user._id; // ✅ เพิ่มตัวแปรนี้
      console.log("Selected User ID:", selectedUserId);
      console.log("Form Data:", formData);
      await putData(`/users/${selectedUserId}`, formData); // ✅ แก้ไขข้อมูลเฉพาะผู้ใช้ที่เลือก
      alert("✅ User updated successfully!");
      onClose();
    } catch (error) {
      console.error("Error updating user:", error);
      alert("❌ Failed to update user.");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Edit User</h2>
      <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} className="border p-2 w-full mb-2" />
      <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} className="border p-2 w-full mb-2" />
      <input type="email" name="email" value={formData.email} onChange={handleChange} className="border p-2 w-full mb-2" />
      <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} className="border p-2 w-full mb-2" />
      <select name="role" value={formData.role} onChange={handleChange} className="border p-2 w-full mb-2">
        <option value="admin">Admin</option>
        <option value="entrepreneur">Entrepreneur</option>
        <option value="tourist">Tourist</option>
      </select>
      <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
      <button onClick={onClose} className="ml-2 bg-gray-400 text-white px-4 py-2 rounded">Cancel</button>
    </div>
  );
};

export default FromEdit;
