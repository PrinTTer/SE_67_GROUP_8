import { useState, useEffect } from "react";

export const ServiceDropdown = ({ data, onSelect, defaultValue, type, popup }) => {
  const [selectedService, setSelectedService] = useState(defaultValue || ""); // ใช้ค่าเริ่มต้น

  let detailKey = "";

  if (Object.keys(data[0]).includes("roomType")) {
    detailKey = "roomType";
  } else if (Object.keys(data[0]).includes("carBrand")) {
    detailKey = "carBrand";
  } else if (Object.keys(data[0]).includes("courseName")) {
    detailKey = "courseName";
  } else if (Object.keys(data[0]).includes("ticketType")) {
    detailKey = "ticketType";
  }


  useEffect(() => {
    setSelectedService(defaultValue || "");
  }, [defaultValue]); // อัปเดตค่าเมื่อค่า defaultValue เปลี่ยน

  const handleSelectChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedService(selectedValue);
    onSelect(selectedValue);
  };

  return (
    <div className="w-full p-1 text-center">
      {
        (popup === "Offer" && type === "pending") || type === "received" || type === "complete" ?
          (<select
            className="p-1 border bg-white rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={selectedService}
            disabled
            onChange={handleSelectChange}
          >
            <option value="">Select Service</option>
            {data.map((service) => (
              <option key={service._id} value={service._id}>
                {service[detailKey]}
              </option>
            ))}
          </select>)
          :
          (<select
            className="p-1 border bg-white rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={selectedService}
            onChange={handleSelectChange}
          >
            <option value="">Select Service</option>
            {data.map((service) => (
              <option key={service._id} value={service._id}>
                {service[detailKey]}
              </option>
            ))}
          </select>)
      }
    </div>
  );
};
