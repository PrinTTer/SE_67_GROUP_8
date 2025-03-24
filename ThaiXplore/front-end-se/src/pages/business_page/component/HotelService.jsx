import {  useState } from 'react';
import {  faTimesCircle, faCheckCircle, faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { postData } from '../../../services/apiService';
import { FileUpload } from './ServiceBlock';
import { ShowService } from './ShowService';



export const HotelService = (prop) => {
    const { id, title,type } = prop;
    const [forms, setForms] = useState([
      { businessId : id ,roomType: "", guestAmount: "", roomSize: "", price: "", facilities: [""],totalRooms: "" } // facilities array starts with one empty field
    ]);
  
    // เพิ่มฟอร์มใหม่
    const addForm = () => {
      setForms([
        ...forms,
        { businessId : id ,roomType: "", guestAmount: "", roomSize: "", price: "", facilities: [""] ,totalRooms: "" } // facilities starts with one empty field
      ]);
    };
  
    // ลบฟอร์ม
    const removeForm = (index) => {
      setForms(forms.filter((_, i) => i !== index));
    };
  
    // เพิ่ม facility
    const addFacility = (index) => {
      setForms(forms.map((form, i) =>
        i === index ? { ...form, facilities: [...form.facilities, ""] } : form
      ));
    };
  
    // ลบ facility
    const removeFacility = (index, facilityIndex) => {
      setForms(forms.map((form, i) =>
        i === index ? { ...form, facilities: form.facilities.filter((_, j) => j !== facilityIndex) } : form
      ));
    };
  
    // เมื่อมีการเปลี่ยนแปลงใน input field
    const handleInputChange = (index, field, value) => {
      setForms(forms.map((form, i) =>
        i === index ? { ...form, [field]: value } : form
      ));
    };
  
    // เมื่อมีการเปลี่ยนแปลงใน facility
    const handleFacilityChange = (index, facilityIndex, value) => {
      setForms(forms.map((form, i) =>
        i === index ? {
          ...form,
          facilities: form.facilities.map((facility, j) =>
            j === facilityIndex ? value : facility
          )
        } : form
      ));
    };
  
    // ฟังก์ชัน insertData ที่ใช้ส่งข้อมูลฟอร์ม
    const insertData = async (index) => {
        const formData = forms[index]; // หาข้อมูลของฟอร์มนั้นๆ
        console.log("ID is " + id);
        // เพิ่มหน่วย m² ให้กับ roomSize
        const roomSizeWithUnit = `${formData.roomSize} m²`;
        formData.roomSize = roomSizeWithUnit
        console.log("Room Size: " + roomSizeWithUnit);
        formData.guestAmount = parseFloat(formData.guestAmount)
        formData.price = parseFloat(formData.price)
        formData.totalRooms = parseFloat(formData.totalRooms)
        console.log(formData)
        await postData(`/businesses/${id}/rooms`, formData)
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
              <div>Room Type</div>
              <input
                type="text"
                value={form.roomType}
                onChange={(e) => handleInputChange(index, "roomType", e.target.value)}
                className="bg-[#F8FAFC] p-2 rounded-md w-60 shadow-md"
              />
            </div>
            <div>
              <div>Guest per Room</div>
              <input
                type="text"
                value={form.guestAmount}
                onChange={(e) => handleInputChange(index, "guestAmount", e.target.value)}
                className="bg-[#F8FAFC] p-2 rounded-md w-60 shadow-md"
              />
            </div>
            <div>
              <div>Room Size</div>
              <input
                type="text"
                value={form.roomSize}
                onChange={(e) => handleInputChange(index, "roomSize", e.target.value)}
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
              <div>Total Room</div>
              <input
                type="text"
                value={form.totalRooms}
                onChange={(e) => handleInputChange(index, "totalRooms", e.target.value)}
                className="bg-[#F8FAFC] p-2 rounded-md w-60 shadow-md"
              />
            </div>
            
            <div>
              <div>Image</div>
              <FileUpload />
            </div>

            <div>
              <div>
                Facilities
                <FontAwesomeIcon
                  icon={faCirclePlus}
                  className="text-blue-500 cursor-pointer ml-5"
                  onClick={() => addFacility(index)} // เพิ่ม facility
                />
              </div>
  
              {form.facilities.map((facility, facilityIndex) => (
                <div key={facilityIndex} className="flex items-center mb-2">
                  <input
                    type="text"
                    value={facility}
                    onChange={(e) => handleFacilityChange(index, facilityIndex, e.target.value)}
                    placeholder="Enter facility"
                    className="bg-[#F8FAFC] p-2 rounded-md w-60 shadow-md"
                  />
                  <FontAwesomeIcon
                    icon={faTimesCircle}
                    className="text-red-500 text-2xl ml-2 cursor-pointer"
                    onClick={() => removeFacility(index, facilityIndex)} // ลบ facility
                  />
                </div>
              ))}
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
