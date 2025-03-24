import { useState } from 'react';
import { faTimesCircle, faCheckCircle, faCirclePlus, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { postData } from '../../../services/apiService';
import { FileUpload } from './ServiceBlock';
import { ShowService } from './ShowService';

export const EventService = (prop) => {
  const { id, title, type } = prop;
  const [forms, setForms] = useState([
    { businessId: id, ticketType: "", price: "", quantity: "", eventDate: "", start: "", end: "" }
  ]);
  const [errors, setErrors] = useState([{}]);

  forms.start = new Date();
  const addForm = () => {
    setForms([
      ...forms,
      { businessId: id, ticketType: "", price: "", quantity: "", eventDate: "", start: "", end: "" }
    ]);
    setErrors([...errors, {}]);
  };

  const removeForm = (index) => {
    const newForms = forms.filter((_, i) => i !== index);
    const newErrors = errors.filter((_, i) => i !== index);
    setForms(newForms);
    setErrors(newErrors);
  };

  const handleInputChange = (index, field, value) => {
    setForms(forms.map((form, i) =>
      i === index ? { ...form, [field]: value } : form
    ));
    
    // Clear the error for this field when user changes the input
    if (errors[index] && errors[index][field]) {
      const newErrors = [...errors];
      newErrors[index] = { ...newErrors[index], [field]: "" };
      setErrors(newErrors);
    }
  };

  const validateForm = (index) => {
    const form = forms[index];
    const formErrors = {};
    let isValid = true;

    // Validate ticketType
    if (!form.ticketType || form.ticketType.trim() === "") {
      formErrors.ticketType = "Ticket type is required";
      isValid = false;
    }

    // Validate price
    if (!form.price || form.price.trim() === "") {
      formErrors.price = "Price is required";
      isValid = false;
    } else if (isNaN(parseFloat(form.price)) || parseFloat(form.price) < 0) {
      formErrors.price = "Price must be a valid positive number";
      isValid = false;
    }

    // Validate quantity
    if (!form.quantity || form.quantity.trim() === "") {
      formErrors.quantity = "Quantity is required";
      isValid = false;
    } else if (isNaN(parseInt(form.quantity)) || parseInt(form.quantity) <= 0) {
      formErrors.quantity = "Quantity must be a positive integer";
      isValid = false;
    }

    // Validate eventDate
    if (!form.eventDate || form.eventDate.trim() === "") {
      formErrors.eventDate = "Event date is required";
      isValid = false;
    }

    // Validate start time
    if (!form.start || form.start.trim() === "") {
      formErrors.start = "Start time is required";
      isValid = false;
    }

    // Validate end time
    if (!form.end || form.end.trim() === "") {
      formErrors.end = "End time is required";
      isValid = false;
    } else if (form.start && new Date(form.end) <= new Date(form.start)) {
      formErrors.end = "End time must be after start time";
      isValid = false;
    }

    // Update the errors state
    const newErrors = [...errors];
    newErrors[index] = formErrors;
    setErrors(newErrors);

    return isValid;
  };

  // ฟังก์ชัน insertData ที่ใช้ส่งข้อมูลฟอร์ม
  const insertData = async (index) => {
    if (validateForm(index)) {
      try {
        const formData = forms[index]; // หาข้อมูลของฟอร์มนั้นๆ
        console.log("ID is " + id);
        
        formData.price = parseFloat(formData.price);
        formData.quantity = parseInt(formData.quantity);
        
        console.log(formData);
        await postData(`/businesses/${id}/events`, formData);
        alert("Event added successfully!");
        removeForm(index);
      } catch (error) {
        console.error("Error adding event:", error);
        alert("Failed to add the event. Please try again.");
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <ShowService id={id} type={type}/>
      <div className="items-center flex mb-5 border-b border-gray-200 pb-3">
        <h2 className="text-xl font-semibold text-gray-800">
          Add {title?.split(" ")[0] || "Event"}
        </h2>
        <FontAwesomeIcon
          icon={faCirclePlus}
          className="ml-3 cursor-pointer text-orange-500 hover:text-orange-600 text-2xl transition-colors duration-200"
          onClick={addForm}
        />
      </div>
     
      {forms.map((form, index) => (
        <div key={index} className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-6 mb-5 shadow-sm border border-blue-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Ticket Type <span className="text-red-500">*</span></label>
              <input
                type="text"
                value={form.ticketType}
                onChange={(e) => handleInputChange(index, "ticketType", e.target.value)}
                className={`bg-white p-3 rounded-md w-full shadow-sm border ${errors[index]?.ticketType ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-orange-400 focus:border-transparent transition duration-200`}
                placeholder="e.g. VIP, Regular, Early Bird"
              />
              {errors[index]?.ticketType && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <FontAwesomeIcon icon={faExclamationCircle} className="mr-1" />
                  {errors[index].ticketType}
                </p>
              )}
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Price (THB) <span className="text-red-500">*</span></label>
              <input
                type="text"
                value={form.price}
                onChange={(e) => handleInputChange(index, "price", e.target.value)}
                className={`bg-white p-3 rounded-md w-full shadow-sm border ${errors[index]?.price ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-orange-400 focus:border-transparent transition duration-200`}
                placeholder="e.g. 999"
              />
              {errors[index]?.price && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <FontAwesomeIcon icon={faExclamationCircle} className="mr-1" />
                  {errors[index].price}
                </p>
              )}
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Quantity <span className="text-red-500">*</span></label>
              <input
                type="text"
                value={form.quantity}
                onChange={(e) => handleInputChange(index, "quantity", e.target.value)}
                className={`bg-white p-3 rounded-md w-full shadow-sm border ${errors[index]?.quantity ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-orange-400 focus:border-transparent transition duration-200`}
                placeholder="e.g. 100"
              />
              {errors[index]?.quantity && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <FontAwesomeIcon icon={faExclamationCircle} className="mr-1" />
                  {errors[index].quantity}
                </p>
              )}
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Event Date <span className="text-red-500">*</span></label>
              <input
                type="date"
                value={form.eventDate}
                onChange={(e) => handleInputChange(index, "eventDate", e.target.value)}
                className={`bg-white p-3 rounded-md w-full shadow-sm border ${errors[index]?.eventDate ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-orange-400 focus:border-transparent transition duration-200`}
              />
              {errors[index]?.eventDate && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <FontAwesomeIcon icon={faExclamationCircle} className="mr-1" />
                  {errors[index].eventDate}
                </p>
              )}
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Start Time <span className="text-red-500">*</span></label>
              <input
                type="datetime-local"
                max={form.end}
                value={form.start}
                onChange={(e) => handleInputChange(index, "start", e.target.value)}
                className={`bg-white p-3 rounded-md w-full shadow-sm border ${errors[index]?.start ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-orange-400 focus:border-transparent transition duration-200`}
              />
              {errors[index]?.start && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <FontAwesomeIcon icon={faExclamationCircle} className="mr-1" />
                  {errors[index].start}
                </p>
              )}
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">End Time <span className="text-red-500">*</span></label>
              <input
                type="datetime-local"
                min={form.start}
                value={form.end}
                onChange={(e) => handleInputChange(index, "end", e.target.value)}
                className={`bg-white p-3 rounded-md w-full shadow-sm border ${errors[index]?.end ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-orange-400 focus:border-transparent transition duration-200`}
              />
              {errors[index]?.end && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <FontAwesomeIcon icon={faExclamationCircle} className="mr-1" />
                  {errors[index].end}
                </p>
              )}
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-gray-700 font-medium mb-2">Event Image</label>
              <FileUpload />
            </div>

            <div className="flex justify-end items-center md:col-span-2 mt-4 pt-4 border-t border-blue-200">
              <button
                className="flex items-center justify-center bg-white hover:bg-red-50 text-red-500 px-4 py-2 rounded-full mr-3 border border-red-300 transition-colors duration-200"
                onClick={() => removeForm(index)}
              >
                <FontAwesomeIcon
                  icon={faTimesCircle}
                  className="mr-2"
                />
                Cancel
              </button>
              <button
                className="flex items-center justify-center bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-full transition-colors duration-200"
                onClick={() => insertData(index)}
              >
                <FontAwesomeIcon
                  icon={faCheckCircle}
                  className="mr-2"
                />
                Save
              </button>
            </div>
          </div>
        </div>
      ))}
      
      {forms.length === 0 && (
        <div className="text-center py-10">
          <p className="text-gray-500">No events added yet. Click the plus icon above to add a new event.</p>
        </div>
      )}
    </div>
  );
};