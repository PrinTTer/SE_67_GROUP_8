import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faCalendarAlt, faPlus } from "@fortawesome/free-solid-svg-icons";
import { ServiceDropdown } from "./dropDownService";
import { useNavigate } from "react-router-dom";

export const QuotationPopUp = (prop) => {
  const { onClose, serviceBusiness } = prop;
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
      alert("กรุณากรอกข้อมูลสำคัญให้ครบถ้วน!");
      return;
    }
    console.log("Form Data Submitted:", formData);
    navigate("/quotation");
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB' }).format(amount);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-4/5 max-w-4xl border border-gray-100 relative">
        {/* Header with gradient background */}
        <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-r from-orange-500 to-amber-500 rounded-t-xl flex items-center px-8">
          <h2 className="text-2xl font-bold text-white">ใบเสนอราคา (Quotation)</h2>
          <button 
            onClick={onClose} 
            className="absolute right-4 top-4 text-white hover:text-gray-200 transition-colors"
          >
            <FontAwesomeIcon icon={faTimes} className="text-xl" />
          </button>
        </div>

        {/* Form Content - pushed down to account for header */}
        <div className="mt-16 pt-2">
          {/* Date Input */}
          <div className="flex justify-end mb-6">
            <div className="flex items-center border border-gray-300 p-2 rounded-lg shadow-sm bg-gray-50 hover:bg-white transition-colors">
              <FontAwesomeIcon icon={faCalendarAlt} className="text-orange-500 mr-2" />
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="outline-none bg-transparent"
              />
            </div>
          </div>

          {/* Company & Address Info */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-700 mb-2 border-b border-orange-300 pb-1">ข้อมูลบริษัท</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <input
                  type="text"
                  name="companyName"
                  placeholder="ชื่อบริษัท *"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-300 focus:border-orange-500 outline-none transition-all"
                  value={formData.companyName}
                  onChange={handleChange}
                />
              </div>
              <input
                type="text"
                name="province"
                placeholder="จังหวัด"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-300 focus:border-orange-500 outline-none transition-all"
                value={formData.province}
                onChange={handleChange}
              />
              <input
                type="text"
                name="district"
                placeholder="อำเภอ/เขต"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-300 focus:border-orange-500 outline-none transition-all"
                value={formData.district}
                onChange={handleChange}
              />
              <input
                type="text"
                name="subDistrict"
                placeholder="ตำบล/แขวง"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-300 focus:border-orange-500 outline-none transition-all"
                value={formData.subDistrict}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Customer Info */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-700 mb-2 border-b border-orange-300 pb-1">ข้อมูลผู้ติดต่อ</h3>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="name"
                placeholder="ชื่อผู้ติดต่อ *"
                className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-300 focus:border-orange-500 outline-none transition-all"
                value={formData.name}
                onChange={handleChange}
              />
              <input
                type="text"
                name="phone"
                placeholder="เบอร์โทรศัพท์ *"
                className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-300 focus:border-orange-500 outline-none transition-all"
                value={formData.phone}
                onChange={handleChange}
              />
              <input
                type="email"
                name="email"
                placeholder="อีเมล *"
                className="col-span-2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-300 focus:border-orange-500 outline-none transition-all"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Table */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-700 mb-2 border-b border-orange-300 pb-1">รายการสินค้า/บริการ</h3>
            <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
              <div className="max-h-64 overflow-y-auto">
                <table className="w-full text-sm border-collapse">
                  {/* Fixed Header */}
                  <thead className="bg-gradient-to-r from-orange-500 to-amber-500 text-white sticky top-0 shadow-md">
                    <tr>
                      <th className="text-left p-3 font-semibold">รายละเอียด</th>
                      <th className="text-center p-3 font-semibold">จำนวน</th>
                      <th className="text-center p-3 font-semibold">ราคา</th>
                      <th className="text-center p-3 font-semibold">รวม</th>
                      <th className="text-center p-3 font-semibold w-16"></th>
                    </tr>
                  </thead>

                  {/* Scrollable Table Body */}
                  <tbody>
                    {formData.items.map((item, index) => (
                      <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-orange-50"}>
                        <td className="p-3">
                          <ServiceDropdown
                            data={serviceBusiness}
                            onSelect={(value) => {
                              const updatedItems = [...formData.items];
                              updatedItems[index].detail = value;
                              setFormData({ ...formData, items: updatedItems });
                            }}
                          />
                        </td>
                        <td className="p-3">
                          <input
                            type="number"
                            value={item.quantity}
                            onChange={(e) => handleChange(e, index, "quantity")}
                            className="w-full p-2 border border-gray-300 rounded text-center bg-white focus:ring-2 focus:ring-orange-300 focus:border-orange-500 outline-none transition-all"
                          />
                        </td>
                        <td className="p-3">
                          <input
                            type="number"
                            value={item.price}
                            readOnly
                            onChange={(e) => handleChange(e, index, "price")}
                            className="w-full p-2 border border-gray-300 rounded text-center bg-white focus:ring-2 focus:ring-orange-300 focus:border-orange-500 outline-none transition-all"
                          />
                        </td>
                        <td className="p-3">
                          <input
                            type="text"
                            value={item.amount ? formatCurrency(item.amount) : ""}
                            readOnly
                            className="w-full p-2 border border-gray-200 rounded text-center bg-gray-50"
                          />
                        </td>
                        <td className="p-3 text-center">
                          <button
                            onClick={() => removeRow(index)}
                            className="text-white bg-red-500 hover:bg-red-600 w-8 h-8 flex items-center justify-center rounded-full transition-colors"
                          >
                            <FontAwesomeIcon icon={faTimes} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <button 
              onClick={addRow} 
              className="mt-3 flex items-center text-orange-500 hover:text-orange-600 font-medium transition-colors"
            >
              <FontAwesomeIcon icon={faPlus} className="mr-1" /> เพิ่มรายการ
            </button>
          </div>

          {/* Total & Buttons */}
          <div className="flex flex-wrap justify-between items-center mt-6 pt-4 border-t border-gray-200">
            <div className="text-xl font-bold text-gray-800">
              ยอดรวมทั้งสิ้น: <span className="text-orange-600">{formatCurrency(calculateTotal())}</span>
            </div>
            
            <div className="flex gap-3 mt-4 sm:mt-0">
              <button 
                onClick={onClose} 
                className="px-5 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
              >
                ยกเลิก
              </button>
              <button 
                onClick={handleSubmit} 
                className="px-5 py-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-lg hover:from-orange-600 hover:to-amber-600 transition-colors shadow-md font-medium"
              >
                บันทึกข้อมูล
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};