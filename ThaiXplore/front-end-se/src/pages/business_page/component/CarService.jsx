import { useState } from 'react';
import {  faTimesCircle, faCheckCircle, faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { postData } from '../../../services/apiService';
import { FileUpload } from './ServiceBlock';
import { ShowService } from './ShowService';

export const CarService = (prop) => {
  const {  id, title ,type} = prop;
  const [forms, setForms] = useState([
    { businessId : id ,carBrand: "", licensePlate: "", amountSeat: "", price: "", totalCars: "" } // facilities array starts with one empty field
  ]);

  const addForm = () => {
    setForms([
      ...forms,
      { businessId : id ,carBrand: "", licensePlate: "", amountSeat: "", price: "", totalCars: "" } // facilities starts with one empty field
    ]);
  };

  const removeForm = (index) => {
    setForms(forms.filter((_, i) => i !== index));
  };

  

  const handleInputChange = (index, field, value) => {
    setForms(forms.map((form, i) =>
      i === index ? { ...form, [field]: value } : form
    ));
  };



  // ฟังก์ชัน insertData ที่ใช้ส่งข้อมูลฟอร์ม
  const insertData = async (index) => {
      const formData = forms[index]; // หาข้อมูลของฟอร์มนั้นๆ
      console.log("ID is " + id);

      formData.totalCars = parseFloat(formData.totalCars)
      formData.amountSeat = parseFloat(formData.amountSeat)
      formData.price = parseFloat(formData.price)

      formData.licensePlate = "Don't Have"
      console.log(formData)
      await postData(`/businesses/${id}/cars`, formData)
  };

  return (
    <div>
      <ShowService id={id} type={type} />
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
            <div>Car Brand</div>
            <input
              type="text"
              value={form.carBrand}
              onChange={(e) => handleInputChange(index, "carBrand", e.target.value)}
              className="bg-[#F8FAFC] p-2 rounded-md w-60 shadow-md"
            />
          </div>
          <div>
            <div>Amount Seat</div>
            <input
              type="number"
              value={form.amountSeat}
              onChange={(e) => handleInputChange(index, "amountSeat", e.target.value)}
              className="bg-[#F8FAFC] p-2 rounded-md w-60 shadow-md"
            />
          </div>
          <div>
            <div>Price</div>
            <input
              type="number"
              value={form.price}
              onChange={(e) => handleInputChange(index, "price", e.target.value)}
              className="bg-[#F8FAFC] p-2 rounded-md w-60 shadow-md"
            />
          </div>
          <div>
            <div>Total Cars</div>
            <input
              type="number"
              value={form.totalCars}
              onChange={(e) => handleInputChange(index, "totalCars", e.target.value)}
              className="bg-[#F8FAFC] p-2 rounded-md w-60 shadow-md"
            />
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
