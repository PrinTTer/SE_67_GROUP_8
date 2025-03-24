import { useState } from 'react';
import { putData } from '../../../../services/apiService';

export const EventEdit = (prop) => {
    const { item, setShowEditPopUp } = prop;

    // State สำหรับการเก็บข้อมูลของ item
    const [event, setEvent] = useState({
      businessId: item.businessId,
      ticketType: item.ticketType,
      price: item.price,
      quantity: item.quantity,
      eventDate: new Date(item.eventDate).toISOString().slice(0, 16),  
      start: new Date(item.start).toISOString().slice(0, 16),
      end: new Date(item.end).toISOString().slice(0, 16),  
    });

    
    // item.eventDate = new Date(item.eventDate).toISOString().slice(0, 16);
    // item.start = new Date(item.start).toISOString().slice(0, 16);
    // item.end = new Date(item.end).toISOString().slice(0, 16);
    
    const handleChange = (e, field) => {
      let formattedDate;
      if (field.includes('Date')) {
        // แปลงเป็น Date object และเปลี่ยนให้เป็น string โดยไม่ใส่ส่วนที่ไม่จำเป็น
        formattedDate = new Date(e.target.value).toISOString().slice(0, 16); // ตัด .000Z และเหลือเฉพาะ yyyy-MM-ddThh:mm
        console.log(formattedDate); // รูปแบบ: "2025-03-05T09:54"
      }
      setEvent({
        ...event,
        [field]: formattedDate,
      });
    };
    
    
    

    const updateData = async () => {
        event.price = parseFloat(event.price);
        event.amountSeat = parseFloat(event.quantity);

        console.log(event);  // ตรวจสอบข้อมูล
        // สมมุติว่า putData เป็นฟังก์ชันที่ทำการอัพเดตข้อมูล
        if (await putData(`events/${item._id}`, event)) {
            setShowEditPopUp(false);
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
