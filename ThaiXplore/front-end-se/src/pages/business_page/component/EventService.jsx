import {  useState } from 'react';
import {  faTimesCircle, faCheckCircle, faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { postData } from '../../../services/apiService';
import { FileUpload } from './ServiceBlock';
import { ShowService } from './ShowService';

export const EventService = (prop) => {
  const {  id, title ,type} = prop;
  const [forms, setForms] = useState([
    { businessId : id ,ticketType: "", price: "", quantity: "", eventDate: "", start: "",end: "" } // facilities array starts with one empty field
  ]);

  const addForm = () => {
    setForms([
      ...forms,
      { businessId : id ,ticketType: "", price: "", quantity: "", eventDate: "", start: "" ,end: "" } // facilities starts with one empty field
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

      
      formData.price = parseFloat(formData.price)
      
      console.log(formData)
      await postData(`/businesses/${id}/events`, formData)
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
            <div>Ticket Type</div>
            <input
              type="text"
              value={form.ticketType}
              onChange={(e) => handleInputChange(index, "ticketType", e.target.value)}
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
            <div>Quantity</div>
            <input
              type="text"
              value={form.quantity}
              onChange={(e) => handleInputChange(index, "quantity", e.target.value)}
              className="bg-[#F8FAFC] p-2 rounded-md w-60 shadow-md"
            />
          </div>
          <div>
            <div>Event Date</div>
            <input
              type="date"
              value={form.eventDate}
              onChange={(e) => handleInputChange(index, "eventDate", e.target.value)}
              className="bg-[#F8FAFC] p-2 rounded-md w-60 shadow-md"
            />
          </div>

          <div>
            <div>Start Date</div>
            <input
              type="datetime-local"
              value={form.start}
              onChange={(e) => handleInputChange(index, "start", e.target.value)}
              className="bg-[#F8FAFC] p-2 rounded-md w-60 shadow-md"
            />
          </div>

          <div>
            <div>End Date</div>
            <input
              type="datetime-local"
              value={form.end}
              onChange={(e) => handleInputChange(index, "end", e.target.value)}
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