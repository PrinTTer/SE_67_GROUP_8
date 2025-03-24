import { useState } from 'react';
import { putData } from '../../../../services/apiService';

export const RestaurantEdit = (prop) => {
    const { item, setShowEditPopUp } = prop;
  
    // State สำหรับการเก็บข้อมูลของ item
    const [course, setCourse] = useState({
      businessId: item.businessId,
      courseName: item.courseName,
      price: item.price,
      menuList: item.menuList || [{ name: "" }] // กำหนดให้เริ่มต้นเป็นอาร์เรย์ที่มีอ็อบเจกต์
    });
  
    // ฟังก์ชันที่ใช้แก้ไขข้อมูลในฟิลด์
    const handleChange = (e, field) => {
      setCourse({
        ...course,
        [field]: e.target.value,
      });
    };
  
    const handleFacilityChange = (index, value) => {
      const updatedMenuList = [...course.menuList];
      updatedMenuList[index].name = value;  // แก้ไขชื่อของเมนู
      setCourse({ ...course, menuList: updatedMenuList });
    };
  
    const handleRemoveFacility = (index) => {
      const updatedMenuList = course.menuList.filter((_, i) => i !== index);  // ลบเมนูที่เลือก
      setCourse({ ...course, menuList: updatedMenuList });
    };
  
    const handleAddFacility = () => {
      setCourse({
        ...course,
        menuList: [...course.menuList, { name: "" }]  // เพิ่มอ็อบเจกต์ใหม่ใน menuList
      });
    };
  
    const updateData = async () => {
      course.price = parseFloat(course.price);  // แปลงราคาเป็นตัวเลข
      console.log(course);  // ตรวจสอบข้อมูล
      // สมมุติว่า putData เป็นฟังก์ชันที่ทำการอัพเดตข้อมูล
      if (await putData(`courses/${item._id}`, course)) {
        setShowEditPopUp(false);
      }
    };
  
    return (
      <div>
        <div className="grid grid-cols-2 gap-6">
          <div className="mb-4">
            <div>Course Name</div>
            <input
              type="text"
              value={course.courseName}
              onChange={(e) => handleChange(e, 'courseName')}
              className="p-2 border border-gray-300 rounded w-full"
            />
          </div>
  
          <div className="mb-4">
            <div>Price</div>
            <input
              type="text"
              value={course.price}
              onChange={(e) => handleChange(e, 'price')}
              className="p-2 border border-gray-300 rounded w-full"
            />
          </div>
  
          <div>
            <div className="font-bold mb-2">Menu List</div>
            {course.menuList && Array.isArray(course.menuList) && course.menuList.map((menu, index) => (
              <div key={index} className="flex items-center mb-2">
                <input
                  type="text"
                  className="p-2 border border-gray-300 rounded w-full"
                  value={menu.name}
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
              Add Menu
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