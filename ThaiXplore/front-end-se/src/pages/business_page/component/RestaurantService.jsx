import { useState } from 'react';
import { faTimesCircle, faCheckCircle, faCirclePlus, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { postData , postDataWithFiles} from '../../../services/apiService';
import { FileUpload } from './ServiceBlock';
import { ShowService } from './ShowService';

export const RestaurantService = (prop) => {
  const { id, title, type, fetchData, data } = prop;
  const [image , setImage] = useState();
  const [forms, setForms] = useState([
    { businessId: id, courseName: "", menuList: [{ name: "" }], price: "" }
  ]);
  const [errors, setErrors] = useState([{}]);

  // เพิ่มฟอร์มใหม่
  const addForm = () => {
    setForms([
      ...forms,
      { businessId: id, courseName: "", menuList: [{ name: "" }], price: "" }
    ]);
    setErrors([...errors, {}]);
  };

  // ลบฟอร์ม
  const removeForm = (index) => {
    const newForms = forms.filter((_, i) => i !== index);
    const newErrors = errors.filter((_, i) => i !== index);
    setForms(newForms);
    setErrors(newErrors);
  };

  // เพิ่มเมนู
  const addMenu = (index) => {
    const newMenu = { name: "" };
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
    
    // Clear the error for this field when user changes the input
    if (errors[index] && errors[index][field]) {
      const newErrors = [...errors];
      newErrors[index] = { ...newErrors[index], [field]: "" };
      setErrors(newErrors);
    }
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
    
    // Clear menu errors when user changes any menu item
    if (errors[index] && errors[index].menuList) {
      const newErrors = [...errors];
      newErrors[index] = { ...newErrors[index], menuList: "" };
      setErrors(newErrors);
    }
  };

  // ฟังก์ชัน validation สำหรับฟอร์ม
  const validateForm = (index) => {
    const form = forms[index];
    const formErrors = {};
    let isValid = true;

    // Validate courseName
    if (!form.courseName || form.courseName.trim() === "") {
      formErrors.courseName = "Course name is required";
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

    // Validate menuList
    if (form.menuList.length === 0) {
      formErrors.menuList = "At least one menu item is required";
      isValid = false;
    } else if (form.menuList.some(menu => !menu.name || menu.name.trim() === "")) {
      formErrors.menuList = "All menu items must have a name";
      isValid = false;
    }

    // Update the errors state
    const newErrors = [...errors];
    newErrors[index] = formErrors;
    setErrors(newErrors);

    return isValid;
  };

  // ฟังก์ชัน insertData ที่ใช้ส่งข้อมูลฟอร์ม
  const [imgType,setImageType] = useState();

  const insertData = async (index) => {
    if (validateForm(index)) {
      try {
        const formData = forms[index]; // หาข้อมูลของฟอร์มนั้นๆ
        console.log("ID is " + id);
        
        formData.price = parseFloat(formData.price); // แปลง price ให้เป็นตัวเลข
        
        console.log(formData);
        const postResponse =await postData(`/businesses/${id}/courses`, formData);
        
        setImageType("rooms")
        console.log("Course : " +postResponse._id)
        const endpoint = `/courses/${postResponse._id}/images`;
        postDataWithFiles(endpoint, [image], formData, "services_courses");
        alert("Course added successfully!");
        removeForm(index);
        fetchData();
      } catch (error) {
        console.error("Error adding course:", error);
        alert("Failed to add the course. Please try again.");
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 border border-amber-100">
      <ShowService id={id} type={type} fetchData={fetchData} data={data} imgType={imgType}/>
      <div className="items-center flex mb-6 border-b border-amber-200 pb-4">
        <h2 className="text-2xl font-semibold text-amber-800">
          Add {title?.split(" ")[0] || "Restaurant"}
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
              <label className="block text-amber-800 font-medium mb-2">Course Name <span className="text-red-500">*</span></label>
              <input
                type="text"
                value={form.courseName}
                onChange={(e) => handleInputChange(index, "courseName", e.target.value)}
                className={`bg-white p-3 rounded-md w-full shadow-sm border ${errors[index]?.courseName ? 'border-red-500' : 'border-amber-300'} focus:ring-2 focus:ring-amber-400 focus:border-transparent transition duration-200`}
                placeholder="e.g. Breakfast Set, Lunch Set"
              />
              {errors[index]?.courseName && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <FontAwesomeIcon icon={faExclamationCircle} className="mr-1" />
                  {errors[index].courseName}
                </p>
              )}
            </div>
            <div>
              <label className="block text-amber-800 font-medium mb-2">Price (THB) <span className="text-red-500">*</span></label>
              <input
                type="text"
                value={form.price}
                onChange={(e) => handleInputChange(index, "price", e.target.value)}
                className={`bg-white p-3 rounded-md w-full shadow-sm border ${errors[index]?.price ? 'border-red-500' : 'border-amber-300'} focus:ring-2 focus:ring-amber-400 focus:border-transparent transition duration-200`}
                placeholder="e.g. 299"
              />
              {errors[index]?.price && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <FontAwesomeIcon icon={faExclamationCircle} className="mr-1" />
                  {errors[index].price}
                </p>
              )}
            </div>
            
            <div className="md:col-span-2">
              <div className="flex items-center justify-between mb-2">
                <label className="block text-amber-800 font-medium">Menu Items <span className="text-red-500">*</span></label>
                <button
                  type="button"
                  onClick={() => addMenu(index)}
                  className="text-amber-500 hover:text-amber-600 font-medium text-sm flex items-center transition-colors duration-200"
                >
                  <FontAwesomeIcon icon={faCirclePlus} className="mr-1" />
                  Add Menu Item
                </button>
              </div>
              
              {form.menuList.map((menu, menuIndex) => (
                <div key={menuIndex} className="flex items-center mb-3">
                  <input
                    type="text"
                    value={menu.name}
                    onChange={(e) => handleMenuChange(index, menuIndex, e.target.value)}
                    className="bg-white p-3 rounded-md w-full shadow-sm border border-amber-300 focus:ring-2 focus:ring-amber-400 focus:border-transparent transition duration-200"
                    placeholder="Enter menu item name"
                  />
                  <button
                    type="button"
                    onClick={() => removeMenu(index, menuIndex)}
                    className="ml-2 text-red-500 hover:text-red-600 transition-colors duration-200"
                    disabled={form.menuList.length === 1}
                  >
                    <FontAwesomeIcon
                      icon={faTimesCircle}
                      className={`text-xl ${form.menuList.length === 1 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                    />
                  </button>
                </div>
              ))}
              
              {errors[index]?.menuList && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <FontAwesomeIcon icon={faExclamationCircle} className="mr-1" />
                  {errors[index].menuList}
                </p>
              )}
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-amber-800 font-medium mb-2">Course Image</label>
              <FileUpload setImage={setImage}/>
            </div>

            <div className="flex justify-end items-center md:col-span-2 mt-6 pt-4 border-t border-amber-200">
              <button
                className="flex items-center justify-center bg-white hover:bg-red-50 text-red-500 px-5 py-2.5 rounded-full mr-4 border border-red-300 transition-colors duration-200 shadow-sm"
                onClick={() => removeForm(index)}
              >
                <FontAwesomeIcon
                  icon={faTimesCircle}
                  className="mr-2"
                />
                Cancel
              </button>
              <button
                className="flex items-center justify-center bg-amber-500 hover:bg-amber-600 text-white px-6 py-2.5 rounded-full transition-colors duration-200 shadow-sm"
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
        <div className="text-center py-12 bg-amber-50 rounded-lg border border-amber-200">
          <p className="text-amber-700">No courses added yet. Click the plus icon above to add a new course.</p>
        </div>
      )}
    </div>
  );
};