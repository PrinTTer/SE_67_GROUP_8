
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faTimes } from "@fortawesome/free-solid-svg-icons";
import { ServiceDropdown } from "./dropDownService"
import { useNavigate } from "react-router-dom";





export const QuotationPopUp = (prop) => {
  const { onClose, serviceBusiness } = prop
  const [formData, setFormData] = useState({
    companyName: "",
    province: "",
    subDistrict: "",
    district: "",
    name: "",
    phone: "",
    email: "",
    date: "",
    items: [{ detail: "", quantity: "", price: "", amount: "" }],
  });

  const handleChange = (e, index = null, field = null) => {
    if (index !== null && field) {
      const updatedItems = [...formData.items];
      updatedItems[index][field] = e.target.value;
      updatedItems[index].amount =
        updatedItems[index].quantity * updatedItems[index].price || "";
      setFormData({ ...formData, items: updatedItems });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const addRow = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { detail: "", quantity: "", price: "", amount: "" }],
    });
  };

  const removeRow = (index) => {
    const updatedItems = formData.items.filter((_, i) => i !== index);
    setFormData({ ...formData, items: updatedItems });
  };

  const calculateTotal = () => {
    return formData.items.reduce((sum, item) => sum + (parseFloat(item.amount) || 0), 0);
  };
  const navigate = useNavigate();
  const handleSubmit = () => {

    if (!formData.companyName || !formData.name || !formData.phone || !formData.email || formData.items.length === 0) {
      alert("Please fill in all required fields!");
      return;
    }
    console.log("Form Data Submitted:", formData);

    navigate("/quotation");
  };


  
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-70 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[600px] border relative">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Quotation Form</h2>
          <button onClick={onClose} className="text-red-500 text-lg font-bold cursor-pointer">
            &times;
          </button>
        </div>

        {/* Date Input */}
        <div className="flex justify-end mt-2">
          <div className="flex items-center border p-2 rounded-md">
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="outline-none"
            />
            
          </div>
        </div>

        {/* Company & Customer Info */}
        <div className="grid grid-cols-2 gap-2 mt-4">
          <input
            type="text"
            name="companyName"
            placeholder="Company Name"
            className="w-full p-2 border rounded"
            value={formData.companyName}
            onChange={handleChange}
          />
          <input
            type="text"
            name="province"
            placeholder="Province"
            className="w-full p-2 border rounded"
            value={formData.province}
            onChange={handleChange}
          />
          <input
            type="text"
            name="subDistrict"
            placeholder="Sub-District"
            className="w-full p-2 border rounded"
            value={formData.subDistrict}
            onChange={handleChange}
          />
          <input
            type="text"
            name="district"
            placeholder="District"
            className="w-full p-2 border rounded"
            value={formData.district}
            onChange={handleChange}
          />
        </div>

        <h3 className="font-semibold mt-4">Customer Info</h3>
        <div className="grid grid-cols-2 gap-2">
          <input
            type="text"
            name="name"
            placeholder="Name"
            className="p-2 border rounded"
            value={formData.name}
            onChange={handleChange}
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            className="p-2 border rounded"
            value={formData.phone}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="col-span-2 p-2 border rounded"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        {/* Table */}
        <div className="mt-4 border p-2 bg-blue-200 max-h-60 overflow-y-auto">
          <table className="w-full text-sm border-collapse">
            {/* Fixed Header */}
            <thead className="bg-blue-300 sticky top-0 shadow-md">
              <tr className="border-b">
                <th className="text-center p-2">Detail</th>
                <th className="text-center p-2">Quantity</th>
                <th className="text-center p-2">Price</th>
                <th className="text-center p-2">Amount</th>
                <th className="text-center p-2">Delete</th>
              </tr>
            </thead>

            {/* Scrollable Table Body */}
            <tbody>
              {formData.items.map((item, index) => (
                <tr key={index} className="border-b">
                  <td className="px-2">
                    <ServiceDropdown 
                      data={serviceBusiness} 
                      onSelect={(value) => {
                        const updatedItems = [...formData.items];
                        updatedItems[index].detail = value;
                        setFormData({ ...formData, items: updatedItems });
                      }}
                    />
                  </td>
                  <td className="px-2">
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => handleChange(e, index, "quantity")}
                      className="w-full p-1 border rounded text-center bg-white"
                    />
                  </td>
                  <td className="px-2">
                    <input
                      type="number"
                      value={item.price}
                      readOnly
                      onChange={(e) => handleChange(e, index, "price")}
                      className="w-full p-1 border rounded text-center bg-white"
                    />
                  </td>
                  <td className="px-2">
                    <input
                      type="number"
                      value={item.amount}
                      readOnly
                      className="w-full p-1 border rounded text-center bg-gray-100"
                    />
                  </td>
                  <td className="px-2 text-center">
                    <button
                      onClick={() => removeRow(index)}
                      className="text-white bg-red-500 w-6 h-6 flex items-center justify-center rounded-full m-2"
                    >
                      <FontAwesomeIcon icon={faTimes} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <button onClick={addRow} className="mt-2 text-blue-600">
          + Add Row
        </button>

        {/* Total & Buttons */}
        <div className="flex justify-between items-center mt-4">
          <div className="text-lg font-bold">Total: {calculateTotal()}</div>
         
            <button onClick={handleSubmit} className="px-4 py-2 bg-green-500 text-white rounded">
              Submit
            </button>
          
          
        </div>
      </div>
    </div>
  );
};


