import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';

const TimeSchedule = (prop) => {
    const { detail, setInputs, inputs, handleInputChange } = prop;
    const [schedule, setSchedule] = useState([]); // เริ่มต้นจาก inputs

    // เมื่อ inputs เปลี่ยนแปลงให้ทำการอัปเดต schedule
    useEffect(() => {
        if (inputs && inputs.length > 0) {
            if(inputs != "")
            setSchedule(inputs); // อัปเดต schedule เมื่อ inputs เปลี่ยนแปลง
        }
    }, [inputs]);

    const handleChange = (index, field, value) => {
        const newSchedule = [...schedule];
        const entry = newSchedule[index];

        if (entry && typeof entry === 'string') {
            const entryParts = entry.split(',');

            if (field === 'day') {
                entryParts[0] = value;
            } else if (field === 'startTime') {
                entryParts[1] = value;
            } else if (field === 'endTime') {
                entryParts[2] = value;
            }

            newSchedule[index] = entryParts.join(',');
            setSchedule(newSchedule);
            setInputs(newSchedule); // อัปเดต inputs ที่ส่งกลับไปที่ Addblock
        } else {
            console.error("Invalid schedule entry:", entry); // แสดงข้อผิดพลาดในกรณีที่ entry ไม่เป็น string
        }
    };

    const handleRemove = (index) => {
        const newSchedule = schedule.filter((_, i) => i !== index);
        setSchedule(newSchedule);
        setInputs(newSchedule); // อัปเดต inputs หลังจากลบ
    };

    const handleAddDay = () => {
        // ตรวจสอบว่า schedule มีไม่เกิน 7 วัน
        if (schedule.length >= 7) {
            alert("คุณสามารถเพิ่มวันได้ไม่เกิน 7 วัน");
            return;
        }

        const existingDays = schedule.map(entry => {
            // ตรวจสอบว่า entry เป็น string และสามารถ split ได้
            return entry && typeof entry === 'string' ? entry.split(',')[0] : null;
        });

        const availableDays = [
            'Monday', 'Tuesday', 'Wednesday', 'Thursday',
            'Friday', 'Saturday', 'Sunday'
        ].filter(day => !existingDays.includes(day));

        // ถ้าไม่มีวันเหลือให้เพิ่ม
        if (availableDays.length === 0) {
            alert("ไม่มีวันที่เหลือให้เพิ่ม");
            return;
        }

        // เพิ่มวันใหม่
        const newSchedule = [...schedule, `${availableDays[0]},09:30,16:30`];
        setSchedule(newSchedule);
        setInputs(newSchedule); // อัปเดต inputs
    };

    return (
        <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-6 rounded-xl shadow-lg ">
            {schedule.map((entry, index) => {
                // ตรวจสอบ entry ก่อนใช้ split
                if (!entry || typeof entry !== 'string') {
                    return null; // ถ้า entry เป็น null หรือไม่ใช่ string ให้ไม่แสดง
                }

                const [day, startTime, endTime] = entry.split(',');

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
