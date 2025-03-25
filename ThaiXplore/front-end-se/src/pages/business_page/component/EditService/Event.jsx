import { useState } from 'react';
import { putData } from '../../../../services/apiService';

export const EventEdit = (prop) => {
  const { item, setShowEditPopUp ,fetchData} = prop;

  // ฟังก์ชันแปลงวันที่ที่ปลอดภัย
  const safeDate = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "";
    const offset = date.getTimezoneOffset();
    const localDate = new Date(date.getTime() - offset * 60 * 1000);
    return localDate.toISOString().slice(0, 16);
  };

  // State สำหรับการเก็บข้อมูลของ item
  const [event, setEvent] = useState({
    businessId: item.businessId,
    ticketType: item.ticketType,
    price: item.price,
    quantity: item.quantity,
    eventDate: safeDate(item.eventDate),  // ใช้ฟังก์ชัน safeDate
    start: safeDate(item.start),          // ใช้ฟังก์ชัน safeDate
    end: safeDate(item.end),              // ใช้ฟังก์ชัน safeDate
  });

  const handleChange = (e, field) => {
    let value = e.target.value;
  
    if (field.includes('Date') || field === 'start' || field === 'end') {
      const date = new Date(value);
      if (!isNaN(date.getTime())) {
        value = date.toISOString().slice(0, 16);
      }
    }
  
    setEvent({
      ...event,
      [field]: value,
    });
  };
  

  const updateData = async () => {
    event.price = parseFloat(event.price);
    event.amountSeat = parseFloat(event.quantity);

    console.log(event);  // ตรวจสอบข้อมูล
    // สมมุติว่า putData เป็นฟังก์ชันที่ทำการอัพเดตข้อมูล
    if (await putData(`events/${item._id}`, event)) {
      setShowEditPopUp(false);
      fetchData();
    }
  };

  return (
    <div>
      <div className="grid grid-cols-2 gap-6">
        <div className="mb-4">
          <div>Ticket Type</div>
          <input
            type="text"
            value={event.ticketType}
            onChange={(e) => handleChange(e, 'ticketType')}
            className="p-2 border border-gray-300 rounded w-full"
          />
        </div>

        <div className="mb-4">
          <div>Price</div>
          <input
            type="number"
            value={event.price}
            onChange={(e) => handleChange(e, 'price')}
            className="p-2 border border-gray-300 rounded w-full"
          />
        </div>
        <div className="mb-4">
          <div>Quantity</div>
          <input
            type="number"
            value={event.quantity}
            onChange={(e) => handleChange(e, 'quantity')}
            className="p-2 border border-gray-300 rounded w-full"
          />
        </div>
        <div className="mb-4">
          <div>Event Date</div>
          <input
            type="datetime-local"
            value={event.eventDate}
            onChange={(e) => handleChange(e, 'eventDate')}
            className="p-2 border border-gray-300 rounded w-full"
          />
        </div>
        <div className="mb-4">
          <div>Start Date</div>
          <input
            type="datetime-local"
            value={event.start}
            onChange={(e) => handleChange(e, 'start')}
            className="p-2 border border-gray-300 rounded w-full"
          />
        </div>
        <div className="mb-4">
          <div>End Date</div>
          <input
            type="datetime-local"
            value={event.end}
            onChange={(e) => handleChange(e, 'end')}
            className="p-2 border border-gray-300 rounded w-full"
          />
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <button
          type="button"
          className="bg-gray-500 text-white p-2 rounded"
          onClick={() => setShowEditPopUp(false)} // ปิด PopUp
        >
          Cancel
        </button>
        <button
          type="button"
          className="bg-blue-500 text-white p-2 rounded"
          onClick={updateData} // บันทึกข้อมูล
        >
          Save
        </button>
      </div>
    </div>
  );
};
