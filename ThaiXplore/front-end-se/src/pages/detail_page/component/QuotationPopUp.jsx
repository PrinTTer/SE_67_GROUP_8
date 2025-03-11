import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faTimes } from "@fortawesome/free-solid-svg-icons";

export const QuotationPopUp = (prop) => {
    const { onClose } =prop
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

  const handleSubmit = () => {
    console.log("Form Data Submitted:", formData);
  };

  return (
    <div className="mt-4 fixed inset-0 flex items-center justify-center  bg-opacity-10 ">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[600px] border">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Quotation Form</h2>
          <button onClick={onClose} className="text-red-500 text-lg font-bold">&times;</button>
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
            <FontAwesomeIcon icon={faCalendarAlt} className="ml-2 text-gray-500" />
          </div>
        </div>

        {/* Company & Customer Info */}
        <div className="grid grid-cols-2 gap-2 mt-4">
          <input type="text" name="companyName" placeholder="Company Name" className="w-full p-2 border rounded"
            value={formData.companyName} onChange={handleChange} />
          <input type="text" name="province" placeholder="Province" className="w-full p-2 border rounded"
            value={formData.province} onChange={handleChange} />
          <input type="text" name="subDistrict" placeholder="Sub-District" className="w-full p-2 border rounded"
            value={formData.subDistrict} onChange={handleChange} />
          <input type="text" name="district" placeholder="District" className="w-full p-2 border rounded"
            value={formData.district} onChange={handleChange} />
        </div>

        <h3 className="font-semibold mt-4">Customer Info</h3>
        <div className="grid grid-cols-2 gap-2">
          <input type="text" name="name" placeholder="Name" className="p-2 border rounded"
            value={formData.name} onChange={handleChange} />
          <input type="text" name="phone" placeholder="Phone" className="p-2 border rounded"
            value={formData.phone} onChange={handleChange} />
          <input type="email" name="email" placeholder="Email" className="col-span-2 p-2 border rounded"
            value={formData.email} onChange={handleChange} />
        </div>

        {/* Table */}
        <div className="mt-4 border p-2 rounded bg-blue-200">
  {/* Fixed Header */}
  <table className="w-full text-sm border-collapse">
    <thead className="bg-white sticky top-0 shadow-md">
      <tr className="border-b">
        <th className="text-left p-2">Detail</th>
        <th className="p-2">Quantity</th>
        <th className="p-2">Price</th>
        <th className="p-2">Amount</th>
        <th className="p-2"></th>
      </tr>
    </thead>
  </table>

  {/* Scrollable Table Body */}
  <div className="overflow-y-auto max-h-60">
    <table className="w-full text-sm border-collapse">
      <tbody>
        {formData.items.map((item, index) => (
          <tr key={index} className="border-b">
            <td className="px-2">
              <input type="text" value={item.detail} onChange={(e) => handleChange(e, index, "detail")}
                className="w-full p-1 border rounded bg-white" />
            </td>
            <td className="px-2">
              <input type="number" value={item.quantity} onChange={(e) => handleChange(e, index, "quantity")}
                className="w-full p-1 border rounded text-center bg-white" />
            </td>
            <td className="px-2">
              <input type="number" value={item.price} onChange={(e) => handleChange(e, index, "price")}
                className="w-full p-1 border rounded text-center bg-white" />
            </td>
            <td className="px-2">
              <input type="number" value={item.amount} readOnly
                className="w-full p-1 border rounded text-center bg-gray-100" />
            </td>
            <td className="px-2 text-center">
              <button onClick={() => removeRow(index)}  
                className="text-white bg-red-500 w-6 h-6 flex items-center justify-center rounded-full m-2">
                <FontAwesomeIcon icon={faTimes} />
              </button> 
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>

  <button onClick={addRow} className="mt-2 text-blue-600">+ Add Row</button>
</div>



        {/* Total & Buttons */}
        <div className="flex justify-between items-center mt-4">
          <div className="text-lg font-bold">Total: {calculateTotal()}</div>
          <div className="space-x-2">
            <button onClick={onClose} className="px-4 py-2 bg-gray-500 text-white rounded">Back</button>
            <button onClick={handleSubmit} className="px-4 py-2 bg-green-500 text-white rounded">Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};


