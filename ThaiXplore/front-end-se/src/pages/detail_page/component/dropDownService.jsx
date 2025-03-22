import { useState } from "react";


export const ServiceDropdown = (prop) => {
  const { data, onSelect } = prop
  const [selectedService, setSelectedService] = useState("");
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
  

  const handleSelectChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedService(selectedValue);
    onSelect(selectedValue); 
  };

  return (
    <div className="w-full p-1 text-center">
      <select
        className="p-1 border bg-white rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        value={selectedService}
        onChange={handleSelectChange}
      >
        <option value="">Select Service</option>
        {data.map((service) => (
          <option key={service._id} value={service[detailKey]}>
            {service[detailKey]}
          </option>
        ))}
      </select>
    </div>
  );
};