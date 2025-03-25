import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faPlus } from "@fortawesome/free-solid-svg-icons";
import { ServiceDropdown } from "./dropDownService";
import { useNavigate } from "react-router-dom";
import { postData, putData } from "../../../services/apiService";
import { useSelector } from "react-redux";
import useSocket from "../../../hooks/useSocket";

export const QuotationPopUp = (prop) => {
  const { onClose, serviceBusiness, quotation, business, popup, type } = prop;
  const [formData, setFormData] = useState({
    companyName: "",
    province: "",
    subDistrict: "",
    district: "",
    name: "",
    phone: "",
    email: "",
    date: "",
    description: "",
    items: [{ serviceId: "", quantity: "", price: "", amount: "" }],
  });
  const { user } = useSelector((state) => state.auth);
  const socketRef = useSocket(user);

  const sendQuotationSocket = (status) => {
    const socket = socketRef.current;
    const receiverId = business.business.userId;
    if (socket) {
      socket.emit("sendRequest",{receiverId, status}); // ส่งข้อมูลไปยัง server ผ่าน WebSocket
    }
  };

  const setDefaultValues = () => {
    if (quotation) {
      console.log(quotation);
      const data = {
        companyName: quotation.companyName,
        province: "",
        subDistrict: "",
        district: "",
        name: quotation.name,
        phone: quotation.phoneNumber ,
        email: quotation.email ,
        date: quotation.date ,
        description: quotation.description ,
        items: quotation.servicesDetails ,
      }
      setFormData(data);
    }
  }
  
  useEffect(()=>{
    setDefaultValues();
  },[])


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
      items: [...formData.items, { serviceId: "", quantity: "", price: "", amount: "" }],
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
  const handleSubmit = async () => {
    try {
      if (!formData.companyName || !formData.name || !formData.phone || !formData.email || formData.items.length === 0) {
        alert("กรุณากรอกข้อมูลสำคัญให้ครบถ้วน!");
        // return;
      }
      
      const status = (
        popup === "Offer" && type === "pending" ? "complete" 
        : popup === "Edit" && type === "pending" ? "pending" 
        : popup === "Edit" && type === "received" ? "offered"
        : "pending"
      );
      const sendData = {
          toBusinessId : serviceBusiness[0].businessId,
          name : formData.name,
          address : formData.address,
          companyName : formData.companyName,
          email : formData.email,
          phoneNumber : formData.phone,
          description : formData.description,
          servicesDetails : formData.items,
          status : status
      }
      
      if(!quotation){
        sendQuotationSocket({request : "Create"});
        await postData(`/quotations` , sendData);
        navigate("/quotation");
      }else if(popup === "Edit") {
        console.log(sendData);
        sendQuotationSocket({request : "Create"});
        await putData(`/quotations/${quotation._id}` , sendData);
        // onClose();
      }else if(popup === "Offer") {
        sendQuotationSocket({request : "Offer"});
        await putData(`/quotations/${quotation._id}` , sendData);
        onClose();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const formatCurrency = (amount , item) => {
    return new Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB' }).format(amount);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white px-8 py-5 rounded-xl shadow-2xl w-4/5 max-w-4xl border border-gray-100 relative">
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

          {/* Company & Address Info */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-700 mb-2 border-b border-orange-300 pb-1">ข้อมูลบริษัท</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                {
                  (popup === "Offer" && type === "pending") || type === "received" || type === "complete" ?
                  (<input
                    type="text"
                    name="companyName"
                    placeholder="ชื่อบริษัท *"
                    readOnly
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-300 focus:border-orange-500 outline-none transition-all"
                    value={formData.companyName || ""}
                    onChange={handleChange}
                  />) 
                  :
                  (<input
                    type="text"
                    name="companyName"
                    placeholder="ชื่อบริษัท *"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-300 focus:border-orange-500 outline-none transition-all"
                    value={formData.companyName || ""}
                    onChange={handleChange}
                  />)
                }
                
              </div>
              {
                  (popup === "Offer" && type === "pending") || type === "received" || type === "complete" ?
                  (<input
                    type="text"
                    name="province"
                    placeholder="จังหวัด"
                    readOnly
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-300 focus:border-orange-500 outline-none transition-all"
                    value={formData.province || ""}
                    onChange={handleChange}
                  />) 
                  :
                  (<input
                    type="text"
                    name="province"
                    placeholder="จังหวัด"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-300 focus:border-orange-500 outline-none transition-all"
                    value={formData.province || ""}
                    onChange={handleChange}
                  />)
                }
              
              {
                  (popup === "Offer" && type === "pending") || type === "received" || type === "complete" ?
                  (<input
                    type="text"
                    name="district"
                    placeholder="อำเภอ/เขต"
                    readOnly
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-300 focus:border-orange-500 outline-none transition-all"
                    value={formData.district || ""}
                    onChange={handleChange}
                  />) 
                  :
                  (<input
                    type="text"
                    name="district"
                    placeholder="อำเภอ/เขต"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-300 focus:border-orange-500 outline-none transition-all"
                    value={formData.district || ""}
                    onChange={handleChange}
                  />)
                }
              {
                  (popup === "Offer" && type === "pending") || type === "received" || type === "complete" ?
                  (<input
                    type="text"
                    name="subDistrict"
                    placeholder="ตำบล/แขวง"
                    readOnly
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-300 focus:border-orange-500 outline-none transition-all"
                    value={formData.subDistrict || ""}
                    onChange={handleChange}
                  />) 
                  :
                  (<input
                    type="text"
                    name="subDistrict"
                    placeholder="ตำบล/แขวง"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-300 focus:border-orange-500 outline-none transition-all"
                    value={formData.subDistrict || ""}
                    onChange={handleChange}
                  />)
                }
            
            </div>
          </div>

          {/* Customer Info */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-700 mb-2 border-b border-orange-300 pb-1">ข้อมูลผู้ติดต่อ</h3>
            <div className="grid grid-cols-2 gap-4">
              {
                (popup === "Offer" && type === "pending") || type === "received" || type === "complete" ?
                (<input
                  type="text"
                  name="name"
                  placeholder="ชื่อผู้ติดต่อ *"
                  readOnly
                  className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-300 focus:border-orange-500 outline-none transition-all"
                  value={formData.name || ""}
                  onChange={handleChange}
                />)
                :
                (<input
                  type="text"
                  name="name"
                  placeholder="ชื่อผู้ติดต่อ *"
                  className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-300 focus:border-orange-500 outline-none transition-all"
                  value={formData.name || ""}
                  onChange={handleChange}
                />)
              }
          
              {
                (popup === "Offer" && type === "pending") || type === "received" || type === "complete" ?
                (<input
                  type="text"
                  name="phone"
                  placeholder="เบอร์โทรศัพท์ *"
                  readOnly
                  className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-300 focus:border-orange-500 outline-none transition-all"
                  value={formData.phone || ""}
                  onChange={handleChange}
                />)
                :
                (<input
                  type="text"
                  name="phone"
                  placeholder="เบอร์โทรศัพท์ *"
                  className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-300 focus:border-orange-500 outline-none transition-all"
                  value={formData.phone || ""}
                  onChange={handleChange}
                />)
              }
              {
                (popup === "Offer" && type === "pending") || type === "received" || type === "complete" ?
                (<input
                  type="email"
                  name="email"
                  placeholder="อีเมล *"
                  readOnly
                  className="col-span-2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-300 focus:border-orange-500 outline-none transition-all"
                  value={formData.email || ""}
                  onChange={handleChange}
                />)
                :
                (<input
                  type="email"
                  name="email"
                  placeholder="อีเมล *"
                  className="col-span-2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-300 focus:border-orange-500 outline-none transition-all"
                  value={formData.email || ""}
                  onChange={handleChange}
                />)
              }
          
            </div>
          </div>

          {/* Customer Description */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-700 mb-2 border-b border-orange-300 pb-1">รายละเอียดเพิ่มเติม</h3>
            <div className="grid grid-cols-1 gap-4">
              {
                (popup === "Offer" && type === "pending") || type === "received" || type === "complete" ? 
                (<textarea
                  type="text"
                  name="description"
                  placeholder="ข้อมูลเพิ่มเติม *"
                  readOnly
                  className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-300 focus:border-orange-500 outline-none transition-all"
                  value={formData.description || ""}
                  onChange={handleChange}
                />)
                :
                (<textarea
                  type="text"
                  name="description"
                  placeholder="ข้อมูลเพิ่มเติม *"
                  className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-300 focus:border-orange-500 outline-none transition-all"
                  value={formData.description || ""}
                  onChange={handleChange}
                />)
              }
              
            </div>
          </div>

          {/* Table */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-700 mb-2 border-b border-orange-300 pb-1">รายการสินค้า/บริการ</h3>
            <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
              <div className="max-h-36 overflow-y-auto">
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
                        <>{console.log("item-->" ,item)}</>
                        <td className="p-3">
                          <ServiceDropdown
                            data={serviceBusiness}
                            popup={popup}
                            type={type}
                            defaultValue={formData.items[index]?.serviceId} 
                            onSelect={(value) => {
                              const updatedItems = [...formData.items];
                              updatedItems[index].serviceId = value;
                              setFormData({ ...formData, items: updatedItems });
                            }}
                          />
                        </td>
                        <td className="p-3">
                          {
                            popup === "Offer" && type === "pending" || type === "complete" ? 
                            (<input
                              type="number"
                              value={item.quantity || ""}
                              readOnly
                              onChange={(e) => handleChange(e, index, "quantity")}
                              className="w-full p-2 border border-gray-300 rounded text-center bg-white focus:ring-2 focus:ring-orange-300 focus:border-orange-500 outline-none transition-all"
                            />)
                            :
                            (<input
                              type="number"
                              value={item.quantity || ""}
                              onChange={(e) => handleChange(e, index, "quantity")}
                              className="w-full p-2 border border-gray-300 rounded text-center bg-white focus:ring-2 focus:ring-orange-300 focus:border-orange-500 outline-none transition-all"
                            />)
                          }
                          
                        </td>
                        <td className="p-3">
                          {
                            popup === "Offer" ?  
                            (<input
                              type="number"
                              value={item.price || ""}
                              readOnly
                              onChange={(e) => handleChange(e, index, "price")}
                              className="w-full p-2 border border-gray-300 rounded text-center bg-white focus:ring-2 focus:ring-orange-300 focus:border-orange-500 outline-none transition-all"
                            />)
                            :
                            type === "pending" ?
                            (<input
                              type="number"
                              value={item.price || ""}
                              readOnly
                              onChange={(e) => handleChange(e, index, "price")}
                              className="w-full p-2 border border-gray-300 rounded text-center bg-white focus:ring-2 focus:ring-orange-300 focus:border-orange-500 outline-none transition-all"
                            />)
                            :
                            (<input
                              type="number"
                              value={item.price || ""}
                              onChange={(e) => handleChange(e, index, "price")}
                              className="w-full p-2 border border-gray-300 rounded text-center bg-white focus:ring-2 focus:ring-orange-300 focus:border-orange-500 outline-none transition-all"
                            />)
                          }
                        </td>
                        <td className="p-3">
                          <input
                            type="text"
                            value={item.amount ? formatCurrency(item.amount,item) : ""}
                            readOnly
                            className="w-full p-2 border border-gray-200 rounded text-center bg-gray-50"
                          />
                        </td>
                        <td className="p-3 text-center">
                          {
                            popup === "Offer" || type === "complete" ?
                            (<></>)
                            :
                            (<button
                              onClick={() => removeRow(index)}
                              className="text-white bg-red-500 hover:bg-red-600 w-8 h-8 flex items-center justify-center rounded-full transition-colors"
                            >
                              <FontAwesomeIcon icon={faTimes} />
                            </button>)
                          }
                          
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            {
              popup === "Offer" && type === "pending" || type === "complete" || type === "received" && popup === "Edit" ?
              (<></>)
              :
              (<button 
                onClick={addRow} 
                className="mt-3 flex items-center text-orange-500 hover:text-orange-600 font-medium transition-colors"
              >
                <FontAwesomeIcon icon={faPlus} className="mr-1" /> เพิ่มรายการ
              </button>)
            }
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
              {
                popup === "Offer" && type === "received" ?
                (<></>)
                : type === "complete" ?
                (<></>)
                : 
                (<button 
                  onClick={handleSubmit} 
                  className="px-5 py-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-lg hover:from-orange-600 hover:to-amber-600 transition-colors shadow-md font-medium"
                >
                  {popup === "Offer" && type === "pending" ? "ชำระเงิน" : type === "received" && popup === "Edit" ? "เสนอราคา"  : "บันทึกข้อมูล"}
                </button>)
              }
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};