import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';

const TimeSchedule = (prop) => {
  const { detail, setInputs, inputs, handleInputChange } = prop;
  const [schedule, setSchedule] = useState(inputs); // เริ่มต้นจาก inputs

  // useEffect เพื่อให้แสดงค่าเก่าหรือค่าเริ่มต้น
  useEffect(() => {
    setSchedule(inputs); // อัพเดต schedule เมื่อ inputs เปลี่ยนแปลง
  }, [inputs]); // ใช้ inputs เป็น dependency

  const handleChange = (index, field, value) => {
    const newSchedule = [...schedule];
    // ตรวจสอบว่า entry มีค่าหรือไม่ก่อนที่จะใช้ split
    const entry = newSchedule[index] ? newSchedule[index].split(',') : ["", "09:30", "16:30"];
    
    if (field === 'day') {
      entry[0] = value;
    } else if (field === 'startTime') {
      entry[1] = value;
    } else if (field === 'endTime') {
      entry[2] = value;
    }
    
    newSchedule[index] = entry.join(',');
    setSchedule(newSchedule);
    setInputs(newSchedule); // อัพเดต inputs ที่ส่งกลับไปที่ Addblock
  };

  const handleRemove = (index) => {
    const newSchedule = schedule.filter((_, i) => i !== index);
    setSchedule(newSchedule);
    setInputs(newSchedule); // อัพเดต inputs หลังจากลบ
  };

  const handleAddDay = () => {
    if (schedule.length >= 7) {
      alert("คุณสามารถเพิ่มวันได้ไม่เกิน 7 วัน");
      return;
    }

    const existingDays = schedule.map(entry => entry.split(',')[0]);
    const availableDays = [
      'Monday', 'Tuesday', 'Wednesday', 'Thursday',
      'Friday', 'Saturday', 'Sunday'
    ].filter(day => !existingDays.includes(day));

    if (availableDays.length === 0) {
      alert("ไม่มีวันที่เหลือให้เพิ่ม");
      return;
    }

    const newSchedule = [...schedule, `${availableDays[0]},09:30,16:30`];
    setSchedule(newSchedule);
    setInputs(newSchedule); // อัพเดต inputs
  };

  return (
    <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-6 rounded-xl shadow-lg ">
      {schedule.map((entry, index) => {
        // ตรวจสอบค่า entry ก่อนใช้ split
        const [day, startTime, endTime] = entry ? entry.split(',') : ["", "09:30", "16:30"];

        return (
          <div key={index} className="flex items-center bg-white p-3 rounded-md mb-3 shadow-sm">
            <select
              value={day}
              onChange={(e) => handleChange(index, 'day', e.target.value)}
              className="mr-3 px-2 py-1 border rounded text-gray-700 w-32"
            >
              <option value="Monday">Monday</option>
              <option value="Tuesday">Tuesday</option>
              <option value="Wednesday">Wednesday</option>
              <option value="Thursday">Thursday</option>
              <option value="Friday">Friday</option>
              <option value="Saturday">Saturday</option>
              <option value="Sunday">Sunday</option>
            </select>
            <input
              type="time"
              value={startTime}
              onChange={(e) => handleChange(index, 'startTime', e.target.value)}
              className="mr-2 px-2 py-1 border rounded text-gray-700"
            />
            <span className="mx-2 text-gray-500">-</span>
            <input
              type="time"
              value={endTime}
              onChange={(e) => handleChange(index, 'endTime', e.target.value)}
              className="mr-2 px-2 py-1 border rounded text-gray-700"
            />
            <button
              onClick={() => handleRemove(index)}
              className="ml-auto bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transition-colors"
            >
              <FontAwesomeIcon icon={faTrash} className="w-4 h-4" />
            </button>
          </div>
        );
      })}
      <button
        onClick={handleAddDay}
        className="w-full flex items-center justify-center bg-green-500 hover:bg-green-600 text-white py-2 rounded-md transition-colors mt-4"
      >
        <FontAwesomeIcon icon={faPlus} className="mr-2 w-5 h-5" />
        Add Day
      </button>
    </div>
  );
};

export default TimeSchedule;