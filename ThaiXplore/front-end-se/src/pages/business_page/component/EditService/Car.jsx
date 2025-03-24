import { useState } from 'react';
import { putData } from '../../../../services/apiService';

export const CarEdit = (prop) => {
    const { item, setShowEditPopUp , fetchData } = prop;
  
    // State สำหรับการเก็บข้อมูลของ item
    const [car, setCar] = useState({
      businessId: item.businessId,
      carBrand: item.carBrand,
      price: item.price,
      amountSeat: item.amountSeat,
      totalCars: item.totalCars,  
      licensePlate: item.licensePlate,  
    });
  
    // ฟังก์ชันที่ใช้แก้ไขข้อมูลในฟิลด์
    const handleChange = (e, field) => {
        setCar({
        ...car,
        [field]: e.target.value,
      });
    };
  
    
  
    const updateData = async () => {
        car.price = parseFloat(car.price);
        car.amountSeat = parseFloat(car.amountSeat);
        car.totalCars = parseFloat(car.totalCars);  // แปลงราคาเป็นตัวเลข
      console.log(car);  // ตรวจสอบข้อมูล
      // สมมุติว่า putData เป็นฟังก์ชันที่ทำการอัพเดตข้อมูล
      if (await putData(`cars/${item._id}`, car)) {
        fetchData();
        setShowEditPopUp(false);
        
      }
    };
  
    return (
      <div>
        <div className="grid grid-cols-2 gap-6">
          <div className="mb-4">
            <div>Car Brand</div>
            <input
              type="text"
              value={car.carBrand}
              onChange={(e) => handleChange(e, 'carBrand')}
              className="p-2 border border-gray-300 rounded w-full"
            />
          </div>
  
          <div className="mb-4">
            <div>Price</div>
            <input
              type="number"
              value={car.price}
              onChange={(e) => handleChange(e, 'price')}
              className="p-2 border border-gray-300 rounded w-full"
            />
          </div>
          <div className="mb-4">
            <div>Total Cars</div>
            <input
              type="number"
              value={car.totalCars}
              onChange={(e) => handleChange(e, 'totalCars')}
              className="p-2 border border-gray-300 rounded w-full"
            />
          </div>
          <div className="mb-4">
            <div>Amount Seat</div>
            <input
              type="number"
              value={car.amountSeat}
              onChange={(e) => handleChange(e, 'amountSeat')}
              className="p-2 border border-gray-300 rounded w-full"
            />
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
          <button
            type="button"
            className="bg-blue-500 text-white p-2 rounded"
            onClick={updateData} // บันทึกข้อมูล
          >
            Save
          </button>
        </div>
      </div>
    );
  };