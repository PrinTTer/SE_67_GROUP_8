import { useState } from 'react';
import { putData } from '../../../../services/apiService';
import { deleteData , postDataWithFiles } from '../../../../services/apiService';

export const CarEdit = (prop) => {
    const { item, setShowEditPopUp , fetchData } = prop;
    const [selectedImage, setSelectedImage] = useState(`http://localhost:3000/public/uploads/services/cars/${item.media[0]}`);
    const [editImage, setImage] = useState(item.media[0])
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

        //await deleteData(`/cars/${item._id}/images/1`)
        //await postDataWithFiles(`/cars/${item._id}/images`, [editImage] ,car, "services_cars")
        
        setShowEditPopUp(false);
        fetchData();
      }
    };

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
    }
    return (
      <div>
        <div className="grid grid-cols-2 gap-6">
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