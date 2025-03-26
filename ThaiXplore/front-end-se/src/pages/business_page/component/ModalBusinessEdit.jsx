import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark,faCircleXmark,faCirclePlus  } from "@fortawesome/free-solid-svg-icons";
import { postDataWithFiles , deleteData ,putData } from "../../../services/apiService";

export const ModalEditBusiness = (prop) => {
  const { closeModal, business, fetchBusiness } = prop;
  const [uploadImages, setUploadImages] = useState([]);

  const [form, setForm] = useState({
    businessName: business?.businessName,
    description: business?.description,
    phone: business?.phoneNumber,
    email: business?.email,
    address: business?.address.split(",").slice(0, -4).join(" "),
    subDistrict: business?.address.split(",").slice(-4)[0],
    district: business?.address.split(",").slice(-4)[1],
    province: business?.address.split(",").slice(-4)[2],
    postalCode: business?.address.split(",").slice(-4)[3],
  });

  
  const [errors, setErrors] = useState({});

  useEffect(() => {
    
    
     
      
      // Create the URL for each file in the media array
      const updatedImages = business.media.map(
        (fileName) => `http://localhost:3000/public/uploads/businesses/images/${fileName}`
      );
      setUploadImages(updatedImages);
    
  }, []);
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    // Address fields validation - ห้ามมีช่องว่างระหว่างคำ
    
    if (!form.address.trim() ) {
      newErrors.address = "Address cannot be empty .";
    }
    if (!form.subDistrict.trim() ) {
      newErrors.subDistrict = "Sub District cannot be empty  words.";
    }
    if (!form.district.trim() ) {
      newErrors.district = "District cannot be empty  words.";
    }
    if (!form.province.trim()) {
      newErrors.province = "Province cannot be empty  words.";
    }
    if (!form.postalCode.trim() ) {
      newErrors.postalCode = "Postal Code cannot be empty  words.";
    }

    const postalCodeRegex = /^\d{5}$/;
    if (!form.postalCode.trim()) {
      newErrors.postalCode = "Postal Code cannot be empty.";
    } else if (!postalCodeRegex.test(form.postalCode)) {
      newErrors.postalCode = "Postal Code must be exactly 5 digits.";
    }

    // Phone number validation (must be a 10-digit number)
    const phoneRegex = /^\d{10}$/;
    if (!form.phone.trim()) {
      newErrors.phone = "Phone number cannot be empty.";
    } else if (!phoneRegex.test(form.phone)) {
      newErrors.phone = "Phone number must be a 10-digit number.";
    }

    // Email validation (must follow the correct email format)
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!form.email.trim()) {
      newErrors.email = "Email cannot be empty.";
    } else if (!emailRegex.test(form.email)) {
      newErrors.email = "Email format is invalid.";
    }

    setErrors(newErrors);

    // If there are any errors, return false
    return Object.keys(newErrors).length === 0;
};


  const handleSaveChanges = async () => {
    if (!validateForm()) {
      console.log("Form validation failed");
      return; // If validation fails, prevent saving changes
    }

    const updatedAddress = `${form.address},${form.subDistrict},${form.district},${form.province},${form.postalCode}`;

    setForm((prevForm) => ({
      ...prevForm,
      address: updatedAddress,
    }));

    const updatedForm = {
      businessName: form.businessName,
      description: form.description,
      phoneNumber: form.phone,
      email: form.email,
      address: updatedAddress,
    };

   
    try {
      const response = await putData(`/businesses/${business._id}`, updatedForm);
      if (response) {
        fetchBusiness();  // Refresh data
        closeModal();     // Close modal
      }
    } catch (error) {
      console.error("Error saving changes:", error);
    }
  };

 

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto transform transition-all duration-300 ease-in-out">
        <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-6 rounded-t-2xl border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-3xl font-light text-gray-800">Edit Business Details</h2>
          <button onClick={closeModal} className="text-gray-500 hover:text-gray-700 transition-colors duration-200">
            <FontAwesomeIcon icon={faXmark} size="2x" />
          </button>
        </div>

        <form className="p-6 space-y-6">
          {/* Business Name */}
          <div className="space-y-2">
            <label className="text-sm text-gray-600 font-medium">Business Name</label>
            <input
              type="text"
              placeholder="Enter business name"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-200 transition-all duration-300"
              name="businessName"
              value={form.businessName}
              onChange={handleInputChange}
            />
          </div>

          {/* Address, Sub District, District, Province, Postal Code */}
          <div className="grid grid-cols-2 gap-6">
            {[
              { label: "Address", name: "address" },
              { label: "Sub District", name: "subDistrict" },
              { label: "District", name: "district" },
              { label: "Province", name: "province" },
              { label: "Postal Code", name: "postalCode" },
            ].map(({ label, name }) => (
              <div key={name} className="space-y-2">
                <label className="text-sm text-gray-600 font-medium">{label}</label>
                <input
                  type="text"
                  placeholder={`Enter ${label.toLowerCase()}`}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-200 transition-all duration-300"
                  name={name}
                  value={form[name]}
                  onChange={handleInputChange}
                />
                {/* Display error if any */}
                {errors[name] && <div className="text-red-500 text-sm">{errors[name]}</div>}
              </div>
            ))}
          </div>

          {/* Phone and Description */}
          <div className="space-y-2">
            <label className="text-sm text-gray-600 font-medium">Phone Number</label>
            <input
              type="tel"
              placeholder="Enter phone number"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-200 transition-all duration-300"
              name="phone"
              value={form.phone}
              onChange={handleInputChange}
            />
            {errors.phone && <div className="text-red-500 text-sm">{errors.phone}</div>}
          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-600 font-medium">Email</label>
            <input
              type="email"
              placeholder="Enter email"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-200 transition-all duration-300"
              name="email"
              value={form.email}
              onChange={handleInputChange}
            />
            {errors.email && <div className="text-red-500 text-sm">{errors.email}</div>}
          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-600 font-medium">Description</label>
            <textarea
              placeholder="Tell us about your business"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl h-32 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-200 transition-all duration-300"
              name="description"
              value={form.description}
              onChange={handleInputChange}
            />
          </div>

          {/* <UploadImageBlock
            uploadImages={uploadImages}
            setUploadImages={setUploadImages}
          /> */}
          

          <div className="flex justify-end space-x-4 pt-4 border-t border-gray-100">
            <button onClick={closeModal} className="px-6 py-3 text-gray-600 hover:bg-gray-50 rounded-xl transition-colors duration-200">
              Cancel
            </button>
            <button onClick={handleSaveChanges} type="button" className="px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors duration-200 shadow-md hover:shadow-lg">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export const ModalEditImage = (prop) => {
  const { closeModal, business, fetchBusiness } = prop;
  const [uploadImages, setUploadImages] = useState([]);

  useEffect(() => {
    
    
     
  
      // Create the URL for each file in the media array
      const updatedImages = business.media.map(
        (fileName) => `http://localhost:3000/public/uploads/businesses/images/${fileName}`
      );
      setUploadImages(updatedImages);
    
  }, []);
  
 const close = () =>{
      fetchBusiness();
      closeModal();
 }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto transform transition-all duration-300 ease-in-out">
        {/* ส่วนของเนื้อหาใน Modal */}
        <div className="p-6 flex flex-col">
          {/* เพิ่ม UploadImageBlock */}
          <UploadImageBlock uploadImages={uploadImages} setUploadImages={setUploadImages} business={business}  />
          
          {/* ปุ่ม Back ที่จะปิด Modal */}
          <button
            onClick={close}
            className="mt-4 px-6 py-3 bg-orange-300 text-white rounded-xl hover:bg-orange-500 transition-colors duration-200 self-end"
          >
            Go Detail Page
          </button>
        </div>
      </div>
    </div>
  );
};


const UploadImageBlock = (prop) => {
  const { uploadImages, setUploadImages , business } = prop;

  // Handle file upload
  const handleChange = (e) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    postDataWithFiles(`/businesses/${business._id}/images`, files ,null, "businesses_images")
    setUploadImages((prev) => [...prev, ...files]);
    
  };

  // Handle image deletion
  const deleteImage = (index) => {

    console.log("Index is "+index + "   " + business._id)
    deleteData(`/businesses/${business._id}/images/${index+1}`)
    setUploadImages((prev) => prev.filter((_, i) => i !== index));
    
  };

  return (
    <div className="bg-white flex flex-col px-6 py-4 w-full border border-gray-200 rounded-md shadow-sm">
      <div className="flex justify-between items-center mb-4 font-semibold">
        <div>Image Upload</div>
        <label htmlFor="image-upload" className="cursor-pointer text-green-500 text-lg">
          <FontAwesomeIcon icon={faCirclePlus} />
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            hidden
            multiple
            onChange={handleChange}
          />
        </label>
      </div>

      <div className="flex flex-wrap gap-4">
        {uploadImages.map((img, index) => {
          // Check if img is an object (File object) or a URL
          const url = img instanceof File ? URL.createObjectURL(img) : img;
          return (
            <div key={index} className="relative w-28 h-28 border rounded overflow-hidden">
              <img
                src={url}
                alt={`upload-${index}`}
                className="object-cover w-full h-full"
              />
              <button
                onClick={() => deleteImage(index)}
                className="absolute top-0 right-0 text-red-500 hover:text-red-600"
              >
                <FontAwesomeIcon icon={faCircleXmark} />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
