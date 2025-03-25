import { useState } from 'react';
import { faTimesCircle, faCheckCircle, faCirclePlus, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { postData , postDataWithFiles } from '../../../services/apiService';
import { FileUpload } from './ServiceBlock';
import { ShowService } from './ShowService';

export const CarService = (prop) => {
  const { id, title, type, fetchData, data } = prop;
  const [ image , setImage] = useState();
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
      try {
        const formData = forms[index];

        formData.totalCars = parseFloat(formData.totalCars);
        formData.amountSeat = parseFloat(formData.amountSeat);
        formData.price = parseFloat(formData.price);
        formData.licensePlate = "Don't Have";

        console.log(formData);
        const postResponse =await postData(`/businesses/${id}/cars`, formData);
        fetchData();

        const endpoint = `/cars/${postResponse._id}/images`;
        postDataWithFiles(endpoint, [image], forms, "services_cars");


        alert("Car added successfully!");
        removeForm(index);
      } catch (error) {
        console.error("Error adding car:", error);
        alert("Failed to add the car. Please try again.");
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 border border-amber-100">
      <ShowService id={id} type={type} fetchData={fetchData} data={data} />
      <div className="items-center flex mb-6 border-b border-amber-200 pb-4">
        <h2 className="text-2xl font-semibold text-amber-800">
          Add {title?.split(" ")[0] || "Car"}
        </h2>
        <FontAwesomeIcon
          icon={faCirclePlus}
          className="ml-3 cursor-pointer text-amber-500 hover:text-amber-600 text-2xl transition-colors duration-300"
          onClick={addForm}
        />
      </div>

      {forms.map((form, index) => (
        <div key={index} className="bg-gradient-to-r from-amber-50 to-amber-100 rounded-lg p-6 mb-6 shadow-md border border-amber-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-amber-800 font-medium mb-2">Car Brand <span className="text-red-500">*</span></label>
              <input
                type="text"
                value={form.carBrand}
                onChange={(e) => handleInputChange(index, "carBrand", e.target.value)}
                className={`bg-white p-3 rounded-md w-full shadow-sm border ${errors[index]?.carBrand ? 'border-red-500' : 'border-amber-300'} focus:ring-2 focus:ring-amber-400 focus:border-transparent transition duration-200`}
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
              <label className="block text-amber-800 font-medium mb-2">Amount of Seats <span className="text-red-500">*</span></label>
              <input
                type="number"
                value={form.amountSeat}
                onChange={(e) => handleInputChange(index, "amountSeat", e.target.value)}
                className={`bg-white p-3 rounded-md w-full shadow-sm border ${errors[index]?.amountSeat ? 'border-red-500' : 'border-amber-300'} focus:ring-2 focus:ring-amber-400 focus:border-transparent transition duration-200`}
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
              <label className="block text-amber-800 font-medium mb-2">Price (THB) <span className="text-red-500">*</span></label>
              <input
                type="number"
                value={form.price}
                onChange={(e) => handleInputChange(index, "price", e.target.value)}
                className={`bg-white p-3 rounded-md w-full shadow-sm border ${errors[index]?.price ? 'border-red-500' : 'border-amber-300'} focus:ring-2 focus:ring-amber-400 focus:border-transparent transition duration-200`}
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
              <label className="block text-amber-800 font-medium mb-2">Total Cars <span className="text-red-500">*</span></label>
              <input
                type="number"
                value={form.totalCars}
                onChange={(e) => handleInputChange(index, "totalCars", e.target.value)}
                className={`bg-white p-3 rounded-md w-full shadow-sm border ${errors[index]?.totalCars ? 'border-red-500' : 'border-amber-300'} focus:ring-2 focus:ring-amber-400 focus:border-transparent transition duration-200`}
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
              <label className="block text-amber-800 font-medium mb-2">Car Image</label>
              <FileUpload setImage={setImage}/>
            </div>

            <div className="flex justify-end items-center md:col-span-2 mt-6 pt-4 border-t border-amber-200">
              <button
                className="flex items-center justify-center bg-white hover:bg-red-50 text-red-500 px-5 py-2.5 rounded-full mr-4 border border-red-300 transition-colors duration-200 shadow-sm"
                onClick={() => removeForm(index)}
              >
                <FontAwesomeIcon icon={faTimesCircle} className="mr-2" />
                Cancel
              </button>
              <button
                className="flex items-center justify-center bg-amber-500 hover:bg-amber-600 text-white px-6 py-2.5 rounded-full transition-colors duration-200 shadow-sm"
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
        <div className="text-center py-12 bg-amber-50 rounded-lg border border-amber-200">
          <p className="text-amber-700">No cars added yet. Click the plus icon above to add a new car.</p>
        </div>
      )}
    </div>
  );
};