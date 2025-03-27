import { useEffect, useState } from "react";
import { CreateInformation } from "../../../components/informationBlock";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBed, faCarSide, faPersonHiking, faUtensils } from "@fortawesome/free-solid-svg-icons";
import { UploadDocumentBlock } from "./UploadDocumentBlock";
import { Link, useNavigate } from "react-router-dom";
import { postData, postDataWithFiles } from "../../../services/apiService";
import { UploadImageBlock } from "./UploadImageBlock";
import { ProvinceDropdown } from './dropDownProvince';

export const BusinessInformation = () => {
  const [category, setCategory] = useState("hotel");
  const [address, setAddress] = useState("");
  const [province, setProvince] = useState("Bangkok");
  const [district, setDistrict] = useState("");
  const [subDistrict, setSubDistrict] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [uploadDocument, setUpLoadDocument] = useState([]);
  const [uploadImages, setUploadImages] = useState([]);

  const [dataForm, setDataForm] = useState({
    businessName: "",
    description: "",
    address: "",
    phoneNumber: "",
    email: "",
    category: "",
    verify: {
      status: "pending",
      document: []
    }
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    if (id === "businessName") {
      setDataForm((prev) => ({ ...prev, businessName: value }));
    } else if (id === "description") {
      setDataForm((prev) => ({ ...prev, description: value }));
    } else if (id === "phoneNumber") {
      setDataForm((prev) => ({ ...prev, phoneNumber: value }));
    } else if (id === "email") {
      setDataForm((prev) => ({ ...prev, email: value }));
    } else if (id === "address") {
      setAddress(value);
    } else if (id === "province") {
      setProvince(value);
    } else if (id === "district") {
      setDistrict(value);
    } else if (id === "subDistrict") {
      setSubDistrict(value);
    } else if (id === "postalCode") {
      setPostalCode(value);
    }
  };

  const handleProvinceChange = (selectedProvince) => {
    setProvince(selectedProvince); // Update province in state
  };

  useEffect(() => {
    setDataForm((prev) => ({
      ...prev,
      address: `${address}, ${subDistrict}, ${district}, ${province}, ${postalCode}`,
      category: category,
    }));
  }, [category, address, subDistrict, district, province, postalCode]);

  const validate = () => {
    const newErrors = {};
    if (!dataForm.businessName) newErrors.businessName = "Business name is required.";
    if (!dataForm.description) newErrors.description = "Description is required.";
    if (!dataForm.phoneNumber) newErrors.phoneNumber = "Phone number is required.";
    // ตรวจสอบเบอร์โทรศัพท์ให้เป็นตัวเลข 10 หลัก
    else if (!/^\d{10}$/.test(dataForm.phoneNumber)) newErrors.phoneNumber = "Phone number must be 10 digits.";
    
    if (!dataForm.email || !/\S+@\S+\.\S+/.test(dataForm.email)) newErrors.email = "Valid email is required.";
    if (!address || !district || !subDistrict || !province || !postalCode) newErrors.address = "Complete address is required.";
    // ตรวจสอบรหัสไปรษณีย์ให้เป็นตัวเลข 5 หลัก
    if (!/^\d{5}$/.test(postalCode)) newErrors.postalCode = "Postal code must be 5 digits.";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };
  
  

  const onSubmit = async () => {
    if (!validate()) return; // Stop submission if validation fails

    try {
      let type = category || "event";
      let topicBusines;
      if (type === "hotel") {
        topicBusines = ["Hotel Information", "Specify food and beverage service information", "Recreation facility"];
      } else if (type === "event") {
        topicBusines = ["Event Information"];
      } else if (type === "restaurant") {
        topicBusines = ["Working Date Information"];
      } else if (type === "carRental") {
        topicBusines = ["Working Date Information"];
      }

      const res = await postDataWithFiles("/businesses", [], dataForm, "businesses_verifies");

      if (uploadDocument.length > 0) {
        await postDataWithFiles(`/businesses/${res._id}/documents`, uploadDocument, null, "businesses_verifies");
      }

      if (uploadImages.length > 0) {
        await postDataWithFiles(`/businesses/${res._id}/images`, uploadImages, null, "businesses_images");
      }

      await Promise.all(
        topicBusines.map((item) => {
          const obj = {
            informationName: item,
            details: [String],
          };
          return postData(`/businesses/${res._id}/businessdetails`, obj);
        })
      );

      navigate("/profile/mainbusiness");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-white min-h-screen w-full max-w-[1200px] mx-auto">
      <div className="flex flex-5 w-full justify-center px-4 py-8 ">
        <div className="w-full">
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="bg-[#ff6600] text-white px-6 py-4">
              <div className="text-2xl font-bold">Business Information</div>
            </div>

            <div className="p-6 space-y-6">
              <CreateInformation
                title="Business Name"
                handleChange={handleChange}
                id="businessName"
                className="border-[#ff6600] focus:ring-[#ff6600]"
              />
              {errors.businessName && <div className="text-red-500">{errors.businessName}</div>}
              
              <CreateInformation
                title="Descriptions"
                handleChange={handleChange}
                id="description"
                className="border-[#ff6600] focus:ring-[#ff6600]"
              />
              {errors.description && <div className="text-red-500">{errors.description}</div>}

              <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
                <div className="px-6 py-4">
                  <div className="font-semibold text-lg mb-4 text-[#ff6600]">Category</div>
                  <div className="flex justify-between gap-4 px-8">
                    {[{ value: "hotel", icon: faBed, label: "Hotels & Resorts" }, { value: "carRental", icon: faCarSide, label: "Car Rental" }, { value: "restaurant", icon: faUtensils, label: "Restaurant" }, { value: "event", icon: faPersonHiking, label: "Activities & Events" }].map((item) => (
                      <div key={item.value} onClick={() => setCategory(item.value)} className="flex flex-col items-center cursor-pointer group">
                        <div className={`w-16 h-16 flex items-center justify-center rounded-full transition-all duration-300 ${category === item.value ? "bg-[#ff6600] text-white" : "bg-gray-100 text-gray-500 group-hover:bg-[#ffd6b0]"}`}>
                          <FontAwesomeIcon icon={item.icon} size="lg" />
                        </div>
                        <div className={`mt-2 text-sm text-center ${category === item.value ? "text-[#ff6600]" : "text-gray-500 group-hover:text-[#ff6600]"}`}>
                          {item.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <CreateInformation title="Email Contact" placeholder="example@gmail.com" handleChange={handleChange} id="email" className="border-[#ff6600] focus:ring-[#ff6600]" />
              {errors.email && <div className="text-red-500">{errors.email}</div>}
              
              <CreateInformation title="Phone Number" handleChange={handleChange} id="phoneNumber" className="border-[#ff6600] focus:ring-[#ff6600]" />
              {errors.phoneNumber && <div className="text-red-500">{errors.phoneNumber}</div>}

              <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
                <div className="px-6 py-4">
                  <div className="font-semibold text-lg mb-4 text-[#ff6600]">Address</div>
                  <div className="space-y-4">
                    {[{ id: "address", placeholder: "Address" }, { id: "subDistrict", placeholder: "Sub District" }, { id: "district", placeholder: "District" }].map(
                      (field) => (
                        <input
                          key={field.id}
                          id={field.id}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ff6600] focus:border-transparent"
                          type="text"
                          placeholder={field.placeholder}
                        />
                      )
                    )}
                  </div>
                  <div className="mt-4">
                    <ProvinceDropdown selectedProvince={province} onProvinceChange={handleProvinceChange} />
                  </div>
                  <div className="mt-4">
                    <input
                      id="postalCode"
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ff6600] focus:border-transparent"
                      type="text"
                      placeholder="Postal Code"
                    />
                  </div>
                  {errors.address && <div className="text-red-500">{errors.address}</div>}
                  {errors.postalCode && <div className="text-red-500">{errors.postalCode}</div>}

                </div>
              </div>

              <UploadImageBlock uploadImages={uploadImages} setUploadImages={setUploadImages} />
              <UploadDocumentBlock handleChange={handleChange} setUpLoadDocument={setUpLoadDocument} uploadDocument={uploadDocument} id="document" />

              <div className="flex justify-end space-x-4">
                <button
                  onClick={onSubmit}
                  className="px-6 py-2 bg-[#ff6600] text-white rounded-md hover:bg-[#ff8533] transition-colors"
                >
                  Submit
                </button>
                <Link to="/profile/mainbusiness">
                  <button className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors">
                    Cancel
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
