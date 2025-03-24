import { useState } from 'react';
import { faTimesCircle, faCheckCircle, faCirclePlus, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { postData } from '../../../services/apiService';
import { FileUpload } from './ServiceBlock';
import { ShowService } from './ShowService';

export const CarService = (prop) => {
  const { id, title, type } = prop;
  const [forms, setForms] = useState([
    { businessId: id, carBrand: "", licensePlate: "", amountSeat: "", price: "", totalCars: "" }
  ]);
  const [errors, setErrors] = useState([{}]);

  const addForm = () => {
    setForms([
      ...forms,
      { businessId: id, carBrand: "", licensePlate: "", amountSeat: "", price: "", totalCars: "" }
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

    // Validate carBrand
    if (!form.carBrand || form.carBrand.trim() === "") {
      formErrors.carBrand = "Car brand is required";
      isValid = false;
    }

    // Validate amountSeat
    if (!form.amountSeat || form.amountSeat <= 0) {
      formErrors.amountSeat = "Amount of seats must be a positive number";
      isValid = false;
    }

    // Validate price
    if (!form.price || form.price <= 0) {
      formErrors.price = "Price must be a positive number";
      isValid = false;
    }

    // Validate totalCars
    if (!form.totalCars || form.totalCars <= 0) {
      formErrors.totalCars = "Total cars must be a positive number";
      isValid = false;
    }

    const newErrors = [...errors];
    newErrors[index] = formErrors;
    setErrors(newErrors);

    return isValid;
  };

  const insertData = async (index) => {
    if (validateForm(index)) {
      const formData = forms[index];

      formData.totalCars = parseFloat(formData.totalCars);
      formData.amountSeat = parseFloat(formData.amountSeat);
      formData.price = parseFloat(formData.price);
      formData.licensePlate = "Don't Have";

      console.log(formData);
      await postData(`/businesses/${id}/cars`, formData);
      removeForm(index);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <ShowService id={id} type={type} />
      <div className="items-center flex mb-5 border-b border-gray-200 pb-3">
        <h2 className="text-xl font-semibold text-gray-800">
          Add {title?.split(" ")[0] || "Car"}
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
              <label className="block text-gray-700 font-medium mb-2">Car Brand <span className="text-red-500">*</span></label>
              <input
                type="text"
                value={form.carBrand}
                onChange={(e) => handleInputChange(index, "carBrand", e.target.value)}
                className={`bg-white p-3 rounded-md w-full shadow-sm border ${errors[index]?.carBrand ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-orange-400 focus:border-transparent transition duration-200`}
                placeholder="e.g. Toyota, Honda"
              />
              {errors[index]?.carBrand && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <FontAwesomeIcon icon={faExclamationCircle} className="mr-1" />
                  {errors[index].carBrand}
                </p>
              )}
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Amount of Seats <span className="text-red-500">*</span></label>
              <input
                type="number"
                value={form.amountSeat}
                onChange={(e) => handleInputChange(index, "amountSeat", e.target.value)}
                className={`bg-white p-3 rounded-md w-full shadow-sm border ${errors[index]?.amountSeat ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-orange-400 focus:border-transparent transition duration-200`}
                placeholder="e.g. 5"
              />
              {errors[index]?.amountSeat && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <FontAwesomeIcon icon={faExclamationCircle} className="mr-1" />
                  {errors[index].amountSeat}
                </p>
              )}
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Price (THB) <span className="text-red-500">*</span></label>
              <input
                type="number"
                value={form.price}
                onChange={(e) => handleInputChange(index, "price", e.target.value)}
                className={`bg-white p-3 rounded-md w-full shadow-sm border ${errors[index]?.price ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-orange-400 focus:border-transparent transition duration-200`}
                placeholder="e.g. 1000"
              />
              {errors[index]?.price && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <FontAwesomeIcon icon={faExclamationCircle} className="mr-1" />
                  {errors[index].price}
                </p>
              )}
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Total Cars <span className="text-red-500">*</span></label>
              <input
                type="number"
                value={form.totalCars}
                onChange={(e) => handleInputChange(index, "totalCars", e.target.value)}
                className={`bg-white p-3 rounded-md w-full shadow-sm border ${errors[index]?.totalCars ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-orange-400 focus:border-transparent transition duration-200`}
                placeholder="e.g. 10"
              />
              {errors[index]?.totalCars && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <FontAwesomeIcon icon={faExclamationCircle} className="mr-1" />
                  {errors[index].totalCars}
                </p>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="block text-gray-700 font-medium mb-2">Car Image</label>
              <FileUpload />
            </div>

            <div className="flex justify-end items-center md:col-span-2 mt-4 pt-4 border-t border-blue-200">
              <button
                className="flex items-center justify-center bg-white hover:bg-red-50 text-red-500 px-4 py-2 rounded-full mr-3 border border-red-300 transition-colors duration-200"
                onClick={() => removeForm(index)}
              >
                <FontAwesomeIcon icon={faTimesCircle} className="mr-2" />
                Cancel
              </button>
              <button
                className="flex items-center justify-center bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-full transition-colors duration-200"
                onClick={() => insertData(index)}
              >
                <FontAwesomeIcon icon={faCheckCircle} className="mr-2" />
                Save
              </button>
            </div>
          </div>
        </div>
      ))}

      {forms.length === 0 && (
        <div className="text-center py-10">
          <p className="text-gray-500">No cars added yet. Click the plus icon above to add a new car.</p>
        </div>
      )}
    </div>
  );
};
