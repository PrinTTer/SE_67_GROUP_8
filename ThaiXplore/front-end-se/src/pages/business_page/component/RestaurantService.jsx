import {  useState } from 'react';
import {  faTimesCircle, faCheckCircle, faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { postData } from '../../../services/apiService';
import { FileUpload } from './ServiceBlock';
import { ShowService } from './ShowService';


export const RestaurantService = (prop) => {
  const {  id, title , type } = prop;
  const [forms, setForms] = useState([
    { businessId: id, courseName: "", menuList: [{ name: ""}], price: "" }
  ]);

  // เพิ่มฟอร์มใหม่
  const addForm = () => {
    setForms([
      ...forms,
      { businessId: id, courseName: "", menuList: [{ name: ""}], price: "" }
    ]);
  };

  // ลบฟอร์ม
  const removeForm = (index) => {
    setForms(forms.filter((_, i) => i !== index));
  };

  // เพิ่มเมนู
  const addMenu = (index) => {
    const newMenu = { name: ""}; // เพิ่มเมนูใหม่ที่มี _id และ booked
    setForms(forms.map((form, i) =>
      i === index ? { ...form, menuList: [...form.menuList, newMenu] } : form
    ));
  };

  // ลบเมนู
  const removeMenu = (index, menuIndex) => {
    setForms(forms.map((form, i) =>
      i === index ? { ...form, menuList: form.menuList.filter((_, j) => j !== menuIndex) } : form
    ));
  };

  // เมื่อมีการเปลี่ยนแปลงใน input field
  const handleInputChange = (index, field, value) => {
    setForms(forms.map((form, i) =>
      i === index ? { ...form, [field]: value } : form
    ));
  };

  // เมื่อมีการเปลี่ยนแปลงใน menuList
  const handleMenuChange = (index, menuIndex, value) => {
    setForms(forms.map((form, i) =>
      i === index ? {
        ...form,
        menuList: form.menuList.map((menu, j) =>
          j === menuIndex ? { ...menu, name: value } : menu
        )
      } : form
    ));
  };

  // ฟังก์ชัน insertData ที่ใช้ส่งข้อมูลฟอร์ม
  const insertData = async (index) => {
    const formData = forms[index]; // หาข้อมูลของฟอร์มนั้นๆ
    console.log("ID is " + id);
    
    formData.price = parseFloat(formData.price); // แปลง price ให้เป็นตัวเลข

    console.log(formData);
    await postData(`/businesses/${id}/courses`, formData);
  };

  return (
    <div>
      <ShowService id={id} type={type}/>
      <div className="items-center flex">
        Add {title.split(" ")[0]}
        <FontAwesomeIcon
          icon={faCirclePlus}
          className="ml-2 cursor-pointer text-blue-500 text-2xl"
          onClick={addForm}
        />
      </div>

      {forms.map((form, index) => (
        <div key={index} className="grid grid-cols-2 bg-blue-300 rounded-md p-5 mt-2">
          <div>
            <div>Course Name</div>
            <input
              type="text"
              value={form.courseName}
              onChange={(e) => handleInputChange(index, "courseName", e.target.value)}
              className="bg-[#F8FAFC] p-2 rounded-md w-60 shadow-md"
            />
          </div>

          <div>
            <div>Price</div>
            <input
              type="text"
              value={form.price}
              onChange={(e) => handleInputChange(index, "price", e.target.value)}
              className="bg-[#F8FAFC] p-2 rounded-md w-60 shadow-md"
            />
          </div>

          <div>
            <div>Menu</div>
            <button onClick={() => addMenu(index)} className="text-blue-500">
              Add Menu
            </button>

            {form.menuList.map((menu, menuIndex) => (
              <div key={menuIndex} className="flex items-center mb-2">
                <input
                  type="text"
                  value={menu.name}
                  onChange={(e) => handleMenuChange(index, menuIndex, e.target.value)}
                  className="bg-[#F8FAFC] p-2 rounded-md w-60 shadow-md"
                  placeholder="Enter menu"
                />
                <FontAwesomeIcon
                  icon={faTimesCircle}
                  className="text-red-500 text-2xl ml-2 cursor-pointer"
                  onClick={() => removeMenu(index, menuIndex)} // ลบเมนู
                />
              </div>
            ))}
          </div>

          <div>
            <div>Image</div>
            <FileUpload />
          </div>

          <div className="flex justify-end col-span-2 mt-3">
            <FontAwesomeIcon
              icon={faTimesCircle}
              className="text-red-500 text-4xl mr-2 border rounded-full bg-white cursor-pointer"
              onClick={() => removeForm(index)}
            />
            <FontAwesomeIcon
              icon={faCheckCircle}
              className="text-green-500 text-4xl rounded-full bg-white"
              onClick={() => insertData(index)}
            />
          </div>
        </div>
      ))}
    </div>
  );
};  

