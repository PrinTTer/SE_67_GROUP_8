import { useState, useEffect } from 'react';
import axios from 'axios';
import { getTopic } from './ServiceBlock';
import { BusinessEditBtn } from '../../../components/BusinessEditBtn';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { deleteData   } from '../../../services/apiService';

import { CarEdit } from './EditService/Car';
import { RestaurantEdit } from './EditService/Course';
import {  HotelEdit } from './EditService/Hotel';
import { EventEdit } from './EditService/Event';

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
      setData(data_format);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, );

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
    if (type === "hotel") {
      endpoint = '/room/';
    } else if (type === "carRental") {
      endpoint = '/car/';
    } else if (type === "event") {
      endpoint = '/event/';
    } else if (type === "restaurant") {
      endpoint = '/course/';
    }

    await deleteData(endpoint + id);
    fetchData();
  };

  const handleEditClick = (item) => {
    setEditItem(item);
    setShowEditPopUp(true);
  };

  

  return (
    <div className="p-6 rounded-lg gap-5 mb-5 bg-yellow-50 shadow-md border border-gray-300">
      <div className="col-span-2 border-b-2 p-2 flex items-center font-bold text-xl">
        <span>Service Detail</span>
      </div>

      {title.map((item, index) => (
        <div key={index} className="grid grid-cols-3 gap-4 p-4 bg-white shadow-md rounded-lg mt-3">
        {Topic.map((field, index) => (
          <div key={index} className="flex flex-col">
            <div className="font-bold">{field}</div>
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
              <div>
                {/* เช็คว่า field เป็น Date หรือไม่ */}
                {field.toLowerCase().includes("date") || field.toLowerCase().includes("start") || field.toLowerCase().includes("end")  ? (
                  // แปลงเป็นรูปแบบ yyyy-MM-dd hh:mm
                  new Date(item[field]).toLocaleString("en-GB", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                  }).replace(",", "") 
                ) : (
                  item[field]
                )}
              </div>
            )}
          </div>
        ))}

          <div className="flex justify-end items-center font-bold col-span-3 gap-10">
            <div onClick={() => handleEditClick(item)}>
              <BusinessEditBtn icon={faPenToSquare} popup={"Edit"} />
            </div>
            
            <div onClick={() => deleteService(item._id)}>
              <BusinessEditBtn icon={faTrash} popup={"Delete"} />
            </div>
          </div>
        </div>
      ))}

      {/* PopUp สำหรับ Edit เมื่อ showEditPopUp เป็น true */}
      {showEditPopUp && editItem && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-12 rounded-lg shadow-lg w-[80%] max-w-4xl overflow-y-auto max-h-[600px]">
            <h2 className="text-xl font-bold mb-5">Edit Service</h2>
            <form >
                <div className={`${type == 'hotel' ? "block" : "hidden"}`}>
                    <HotelEdit item={editItem} setShowEditPopUp={setShowEditPopUp} />
                </div>
                <div className={`${type == 'restaurant' ? "block" : "hidden"}`}>
                    <RestaurantEdit item={editItem} setShowEditPopUp={setShowEditPopUp} />
                </div>
                <div className={`${type == 'carRental' ? "block" : "hidden"}`}>
                    <CarEdit item={editItem} setShowEditPopUp={setShowEditPopUp} />
                </div>
                <div className={`${type == 'event' ? "block" : "hidden"}`}>
                    <EventEdit item={editItem} setShowEditPopUp={setShowEditPopUp} />
                </div>

              
            </form>
          </div>
        </div>
      )}
    </div>
  );
};



