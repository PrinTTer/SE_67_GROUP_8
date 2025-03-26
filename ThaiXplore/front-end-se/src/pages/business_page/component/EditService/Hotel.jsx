import {  useState } from 'react';
import { putData  ,deleteData, postDataWithFiles } from '../../../../services/apiService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';


export const HotelEdit = (prop) => {
    const { item , setShowEditPopUp ,fetchData } = prop;
    const [selectedImage, setSelectedImage] = useState(`http://localhost:3000/public/uploads/services/rooms/${item.media[0]}`);
    const [editImage, setImage] = useState(item.media[0])
    const [getImage, setServiceImage] = useState(item.media[0])

    // State สำหรับการเก็บข้อมูลของ item
    const [room, setRoom] = useState({
      roomType: item.roomType ,
      guestAmount: item.guestAmount,
      roomSize: item.roomSize,
      price: item.price,
      facilities: item.facilities,
      totalRooms : item.totalRooms
     
    });
  
    // ฟังก์ชันที่ใช้แก้ไขข้อมูลในฟิลด์
    const handleChange = (e, field) => {
      setRoom({
        ...room,
        [field]: e.target.value,
      });
    };
  
    const handleFacilityChange = (index, value) => {
      const updatedFacilities = [...room.facilities];
      updatedFacilities[index] = value;  // แก้ไขค่า facility ที่เลือก
      setRoom({ ...room, facilities: updatedFacilities });
    };
  
    const handleRemoveFacility = (index) => {
      const updatedFacilities = room.facilities.filter((_, i) => i !== index);  // ลบ facility ที่เลือก
      setRoom({ ...room, facilities: updatedFacilities });
    };
  
    const handleAddFacility = () => {
        
        setRoom({ ...room, facilities: [...room.facilities, ""] } 
          );
    };

    const updateData = async () =>{
        // alert(item._id)
        setServiceImage((item.media[0]))
        room.price = parseFloat(room.price)
        room.totalRooms = parseFloat(room.totalRooms)
        console.log(room)
        if(putData(`rooms/${item._id}`, room)){

          if(getImage != editImage) {
            await deleteData(`/rooms/${item._id}/images/1`)
            await postDataWithFiles(`/rooms/${item._id}/images`, [editImage] ,room, "services_rooms")
  
          }
           //await postDataWithFiles(`/rooms/${item._id}/images`, [editImage] ,room, "services_rooms")
        
          setShowEditPopUp(false);
          fetchData();
        }
        
    }


  // ฟังก์ชันจัดการการอัพโหลดรูปภาพ
  const handleImageChange = (e) => {
    const file = e.target.files[0]; // เลือกไฟล์ที่เลือกมา
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result); // ตั้งค่าให้แสดงไฟล์ที่เลือก
      };
      reader.readAsDataURL(file); // แปลงไฟล์เป็น base64
    }
    
  };
  
 

    return (
      <div >
        <div className='grid grid-cols-2 gap-6'>
        <div className="row-span-2">
          <input
            type="file"
            id="image-upload"
            style={{ display: 'none' }} // ซ่อน input file
            onChange={handleImageChange} // เมื่อเลือกไฟล์
          />
          <label htmlFor="image-upload" className="cursor-pointer">
            
              <img
                src={selectedImage}
                alt="Uploaded"
                className="w-full h-auto object-cover rounded-md shadow-lg"
              />
            
          </label>
        </div>
          <div className="mb-4">
            <div>Room Type</div>
            <input
              type="text"
              value={room.roomType}
              onChange={(e) => handleChange(e, 'roomType')}
              className="p-2 border border-gray-300 rounded w-full"
            />
          </div>
          <div className="mb-4">
            <div>Guest per Amount</div>
            <input
              type="number"
              value={room.guestAmount}
              onChange={(e) => handleChange(e, 'guestAmount')}
              className="p-2 border border-gray-300 rounded w-full"
            />
          </div>
          <div className="mb-4">
            <div>Room Size</div>
            <input
              type="text"
              value={room.roomSize}
              onChange={(e) => handleChange(e, 'roomSize')}
              className="p-2 border border-gray-300 rounded w-full"
            />
          </div>
          <div className="mb-4">
            <div>Price</div>
            <input
              type="number"
              value={room.price}
              onChange={(e) => handleChange(e, 'price')}
              className="p-2 border border-gray-300 rounded w-full"
            />
          </div>
          
          <div className="mb-4">
            <div>Total Rooms</div>
            <input
              type="number"
              value={room.totalRooms}
              onChange={(e) => handleChange(e, 'totalRooms')}
              className="p-2 border border-gray-300 rounded w-full"
            />
          </div>

          <div>

            
          <div className="font-bold mb-2">Facilities</div>
          {room.facilities && Array.isArray(room.facilities) && room.facilities.map((facility, index) => (
            <div key={index} className="flex items-center mb-2">
              <input
                type="text"
                className="p-2 border border-gray-300 rounded w-full"
                value={facility}
                onChange={(e) => handleFacilityChange(index, e.target.value)}
              />
              
                 <FontAwesomeIcon
                                     icon={faTimesCircle}
                                     className="text-red-500 text-lg ml-2 cursor-pointer"
                                     onClick={() =>  handleRemoveFacility(index)}
                                   />
              
            </div>
          ))}
          <button
          type="button" // กำหนดให้ไม่ทำการ submit form
          className="mt-3 bg-blue-500 text-white p-2 rounded"
          onClick={handleAddFacility}
        >
          Add Facility
        </button>
        </div>
        </div>
        <div className="flex justify-end gap-4">
                <button
                  type="button"
                  className="bg-gray-300 text-gray-700 p-2 rounded"
                  onClick={() => setShowEditPopUp(false)} // ปิด PopUp
                >
                  Cancel
                </button>
                <button type="button" className="bg-amber-500 text-white p-2 rounded"
                 onClick={updateData}
                >
                  Save
                </button>
        </div>
      </div>
    );
  };


  
