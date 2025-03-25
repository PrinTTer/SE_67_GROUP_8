import { useState  } from 'react';
import { faTimesCircle, faCheckCircle, faCirclePlus, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { postData  , postDataWithFiles  } from '../../../services/apiService';
import { FileUpload } from './ServiceBlock';
import { ShowService } from './ShowService';


export const HotelService = (prop) => {
  const { id, title, type, fetchData, data } = prop;
  const [ image , setImage] = useState([]);
  const [forms, setForms] = useState([
    { businessId: id, roomType: "", guestAmount: "", roomSize: "", price: "", facilities: [""], totalRooms: "" }
  ]);
  const [errors, setErrors] = useState([{}]);

  // Add new form
  const addForm = () => {
    setForms([
      ...forms,
      { businessId: id, roomType: "", guestAmount: "", roomSize: "", price: "", facilities: [""], totalRooms: "" }
    ]);
    setErrors([...errors, {}]);
  };

  // Remove form
  const removeForm = (index) => {
    setForms(forms.filter((_, i) => i !== index));
    setErrors(errors.filter((_, i) => i !== index));
  };

  // Add facility
  const addFacility = (index) => {
    setForms(forms.map((form, i) =>
      i === index ? { ...form, facilities: [...form.facilities, ""] } : form
    ));
  };

  // Remove facility
  const removeFacility = (index, facilityIndex) => {
    setForms(forms.map((form, i) =>
      i === index ? { ...form, facilities: form.facilities.filter((_, j) => j !== facilityIndex) } : form
    ));
  };

  // Handle input change
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

  // Handle facility change
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

  // Validate form
  const validateForm = (index) => {
    const form = forms[index];
    const formErrors = {};
    let isValid = true;

    // Validate roomType
    if (!form.roomType || form.roomType.trim() === "") {
      formErrors.roomType = "Room type is required";
      isValid = false;
    }

    // Validate guestAmount
    if (!form.guestAmount || form.guestAmount <= 0) {
      formErrors.guestAmount = "Guest amount must be a positive number";
      isValid = false;
    }

    // Validate roomSize
    if (!form.roomSize || form.roomSize.trim() === "") {
      formErrors.roomSize = "Room size is required";
      isValid = false;
    }

    // Validate price
    if (!form.price || form.price <= 0) {
      formErrors.price = "Price must be a positive number";
      isValid = false;
    }

    // Validate totalRooms
    if (!form.totalRooms || form.totalRooms <= 0) {
      formErrors.totalRooms = "Total rooms must be a positive number";
      isValid = false;
    }

    // Validate facilities
    if (form.facilities.some(facility => facility.trim() === "")) {
      formErrors.facilities = "Facilities cannot be empty";
      isValid = false;
    }

    const newErrors = [...errors];
    newErrors[index] = formErrors;
    setErrors(newErrors);

    return isValid;
  };

  

  
  // ฟังก์ชัน insertData
  let postResponse;
  const [imgType,setImageType] = useState();
  const insertData = async (index) => {
    if (validateForm(index)) {
      const formData = forms[index];
      
  
      // Add m² unit to roomSize
      const roomSizeWithUnit = `${formData.roomSize} m²`;
      formData.roomSize = roomSizeWithUnit;
      formData.guestAmount = parseFloat(formData.guestAmount);
      formData.price = parseFloat(formData.price);
      formData.totalRooms = parseFloat(formData.totalRooms);
  
      console.log(formData);
  
      // รอให้ postData เสร็จสิ้นก่อน
       postResponse = await postData(`/businesses/${id}/rooms`, formData);
       console.log("Res");
       console.log(postResponse)
      
      
        const endpoint = `/rooms/${postResponse._id}/images`;
        setImageType("rooms")
  
        if(postDataWithFiles(endpoint, [image], forms, "services_rooms")){
          fetchData();
          removeForm(index);
        }
          
    }
  };
  

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 border border-amber-100">
      <ShowService id={id} type={type} fetchData={fetchData} data={data} imgType={imgType}  />
      <div className="items-center flex mb-6 border-b border-amber-200 pb-4">
        <h2 className="text-2xl font-semibold text-amber-800">
          Add {title?.split(" ")[0] || "Room"}
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
              <label className="block text-amber-800 font-medium mb-2">Room Type <span className="text-red-500">*</span></label>
              <input
                type="text"
                value={form.roomType}
                onChange={(e) => handleInputChange(index, "roomType", e.target.value)}
                className={`bg-white p-3 rounded-md w-full shadow-sm border ${errors[index]?.roomType ? 'border-red-500' : 'border-amber-300'} focus:ring-2 focus:ring-amber-400 focus:border-transparent transition duration-200`}
                placeholder="e.g. Deluxe, Standard"
              />
              {errors[index]?.roomType && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <FontAwesomeIcon icon={faExclamationCircle} className="mr-1" />
                  {errors[index].roomType}
                </p>
              )}
            </div>

            <div>
              <label className="block text-amber-800 font-medium mb-2">Guest per Room <span className="text-red-500">*</span></label>
              <input
                type="number"
                value={form.guestAmount}
                onChange={(e) => handleInputChange(index, "guestAmount", e.target.value)}
                className={`bg-white p-3 rounded-md w-full shadow-sm border ${errors[index]?.guestAmount ? 'border-red-500' : 'border-amber-300'} focus:ring-2 focus:ring-amber-400 focus:border-transparent transition duration-200`}
                placeholder="e.g. 2"
              />
              {errors[index]?.guestAmount && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <FontAwesomeIcon icon={faExclamationCircle} className="mr-1" />
                  {errors[index].guestAmount}
                </p>
              )}
            </div>

            <div>
              <label className="block text-amber-800 font-medium mb-2">Room Size <span className="text-red-500">*</span></label>
              <input
                type="text"
                value={form.roomSize}
                onChange={(e) => handleInputChange(index, "roomSize", e.target.value)}
                className={`bg-white p-3 rounded-md w-full shadow-sm border ${errors[index]?.roomSize ? 'border-red-500' : 'border-amber-300'} focus:ring-2 focus:ring-amber-400 focus:border-transparent transition duration-200`}
                placeholder="e.g. 30"
              />
              {errors[index]?.roomSize && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <FontAwesomeIcon icon={faExclamationCircle} className="mr-1" />
                  {errors[index].roomSize}
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
                placeholder="e.g. 1500"
              />
              {errors[index]?.price && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <FontAwesomeIcon icon={faExclamationCircle} className="mr-1" />
                  {errors[index].price}
                </p>
              )}
            </div>

            <div>
              <label className="block text-amber-800 font-medium mb-2">Total Rooms <span className="text-red-500">*</span></label>
              <input
                type="number"
                value={form.totalRooms}
                onChange={(e) => handleInputChange(index, "totalRooms", e.target.value)}
                className={`bg-white p-3 rounded-md w-full shadow-sm border ${errors[index]?.totalRooms ? 'border-red-500' : 'border-amber-300'} focus:ring-2 focus:ring-amber-400 focus:border-transparent transition duration-200`}
                placeholder="e.g. 10"
              />
              {errors[index]?.totalRooms && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <FontAwesomeIcon icon={faExclamationCircle} className="mr-1" />
                  {errors[index].totalRooms}
                </p>
              )}
            </div>

            <div>
              <label className="block text-amber-800 font-medium mb-2">Room Image</label>
              <FileUpload setImage={setImage}/>
            </div>

            <div className="relative">
              <div className="flex items-center mb-3">
                <label className="block text-amber-800 font-medium">Facilities</label>
                <FontAwesomeIcon
                  icon={faCirclePlus}
                  className="ml-3 cursor-pointer text-amber-500 hover:text-amber-600 transition-colors duration-200"
                  onClick={() => addFacility(index)}
                />
              </div>
              
              {form.facilities.map((facility, facilityIndex) => (
                <div key={facilityIndex} className="flex items-center mb-2">
                  <input
                    type="text"
                    value={facility}
                    onChange={(e) => handleFacilityChange(index, facilityIndex, e.target.value)}
                    placeholder="Enter facility"
                    className={`bg-white p-3 rounded-md w-full shadow-sm border ${errors[index]?.facilities ? 'border-red-500' : 'border-amber-300'} focus:ring-2 focus:ring-amber-400 focus:border-transparent transition duration-200`}
                  />
                  <FontAwesomeIcon
                    icon={faTimesCircle}
                    className="text-red-500 text-lg ml-2 cursor-pointer"
                    onClick={() => removeFacility(index, facilityIndex)}
                  />
                </div>
              ))}
              {errors[index]?.facilities && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <FontAwesomeIcon icon={faExclamationCircle} className="mr-1" />
                  {errors[index].facilities}
                </p>
              )}
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
          <p className="text-amber-700">No rooms added yet. Click the plus icon above to add a new room.</p>
        </div>
      )}
    </div>
  );
};