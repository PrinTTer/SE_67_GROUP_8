import { useState, useEffect } from 'react';
import axios from 'axios';
import { getTopic } from './ServiceBlock';
import { BusinessEditBtn } from '../../../components/BusinessEditBtn';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { deleteData } from '../../../services/apiService';  // import ฟังก์ชันสำหรับการอัพเดตข้อมูล

export const ShowService = (prop) => {
  const { id, type } = prop;

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showEditPopUp, setShowEditPopUp] = useState(false); // State สำหรับแสดง/ซ่อน PopUp
  const [editItem, setEditItem] = useState(null); // State สำหรับเก็บข้อมูลที่จะทำการแก้ไข

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`http://localhost:3000/businesses/${id}`, { withCredentials: true });
      const data_format = await res.data;
      console.log("Here");
      console.log(data_format);
      setData(data_format);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const title = data?.services;
  const Topic = getTopic(type);

  if (!Array.isArray(Topic) || Topic.length === 0) {
    return <div>No Topic available</div>;
  }

  if (!Array.isArray(title) || title.length === 0) {
    return <div>No services available</div>;
  }

  const deleteService = async (id) => {
    let endpoint;
    if (type == "hotel") {
      endpoint = '/room/';
    } else if (type == "carRental") {
      endpoint = '/car/';
    } else if (type == "event") {
      endpoint = '/event/';
    } else if (type == "restaurant") {
      endpoint = '/course/';
    }

    console.log(endpoint + id);
    await deleteData(endpoint + id);
  };

  // ฟังก์ชันสำหรับแสดง PopUp และเลือกข้อมูลที่จะแก้ไข
  const handleEditClick = (item) => {
    setEditItem(item); // ตั้งค่าข้อมูลที่จะแก้ไข
    setShowEditPopUp(true); // เปิด PopUp
  };

  // ฟังก์ชันสำหรับการอัพเดตข้อมูล
  const handleUpdate = async (updatedData) => {
    let endpoint;
    if (type === "hotel") {
      endpoint = '/room/';
    } else if (type === "carRental") {
      endpoint = '/car/';
    } else if (type === "event") {
      endpoint = '/event/';
    } else if (type === "restaurant") {
      endpoint = '/course/';
    }

    // await updateData(endpoint + updatedData._id, updatedData); // อัพเดตข้อมูล
    // setShowEditPopUp(false); // ปิด PopUp
    // fetchData(); // รีเฟรชข้อมูล
  };

  return (
    <div className="p-4 rounded-lg gap-5 mb-5 bg-yellow-50 shadow-md border border-gray-300">
      <div className="col-span-2 border-b-2 p-2 flex items-center font-bold">
        <span>Service Detail</span>
      </div>

      {title.map((item, index) => (
        <div key={index} className="grid grid-cols-3 gap-4 p-4 bg-white shadow-md rounded-lg mt-3">
          {Topic.map((field, index) => (
            <div key={index}>
              <div className="font-bold ">{field}</div>
              {Array.isArray(item[field]) ? (
                <ul className="list-disc pl-5 grid grid-cols-2">
                  {item[field].map((value, i) => (
                    typeof value === "object" ? (
                      <li key={i}>{value.name}</li>
                    ) : (
                      <li key={i}>{value}</li>
                    )
                  ))}
                </ul>
              ) : (
                <div>{item[field]}</div>
              )}
            </div>
          ))}

          <div className="flex justify-end items-center font-bold col-span-3 gap-10">
            <div onClick={() => handleEditClick(item)}>
                <BusinessEditBtn icon={faPenToSquare} popup={"Edit"}  />
            </div>
            
            <div onClick={() => deleteService(item._id)}>
              <BusinessEditBtn icon={faTrash} popup={"Delete"} />
            </div>
          </div>
        </div>
      ))}

      {/* แสดง PopUp เมื่อ showEditPopUp เป็น true */}
      {showEditPopUp && editItem && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold">Edit Service</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleUpdate(editItem);
              }}
            >
              {Topic.map((field, index) => (
                <div key={index} className="mb-4">
                  <label className="block font-semibold">{field}</label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded"
                    value={editItem[field] || ""}
                    onChange={(e) => setEditItem({ ...editItem, [field]: e.target.value })}
                  />
                </div>
              ))}

              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  className="bg-gray-500 text-white p-2 rounded"
                  onClick={() => setShowEditPopUp(false)} // ปิด PopUp
                >
                  Cancel
                </button>
                <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
