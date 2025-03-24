import { useState } from 'react';
import { putData } from '../../../../services/apiService';


export const HotelEdit = (prop) => {
    const { item , setShowEditPopUp ,fetchData } = prop;
  
    // State สำหรับการเก็บข้อมูลของ item
    const [room, setRoom] = useState({
      roomType: item.roomType ,
      guestAmount: item.guestAmount,
      roomSize: item.roomSize,
      price: item.price,
      facilities: item.facilities
     
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
        room.price = parseFloat(room.price)
        console.log(room)
        if(putData(`rooms/${item._id}`, room)){
          fetchData();
          setShowEditPopUp(false);
          
        }
          
    }
  
    return (
      <div >
        <div className='grid grid-cols-2 gap-6'>
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
            <div>Image</div>
            <input
              type="file"
              onChange={(e) => handleChange(e, 'image')}
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
              <button
                type="button"
                className="ml-2 bg-red-500 text-white p-2 rounded"
                onClick={() => handleRemoveFacility(index)}
              >
                ✖
              </button>
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
                  className="bg-gray-500 text-white p-2 rounded"
                  onClick={() => setShowEditPopUp(false)} // ปิด PopUp
                >
                  Cancel
                </button>
                <button type="button" className="bg-blue-500 text-white p-2 rounded"
                 onClick={updateData}
                >
                  Save
                </button>
              </div>
      </div>
    );
  };
