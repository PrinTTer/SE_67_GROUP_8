import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import DateRangePicker from './DatePicker';
import GuestSelector from './GuestSelector';

export const RightSideBar = (prop) => {
    const { type , bookingDetail } = prop;
    const [time, setTime] = useState("");
    const [date, setDate] = useState(""); // State ใหม่สำหรับเก็บค่า date
    const [timeSlots, setTimeSlots] = useState([]); // State สำหรับเก็บช่วงเวลา (time slots)

    useEffect(() => {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        setTime(`${hours}:${minutes}`);
        
     
       
    }, []);

    // ฟังก์ชันคำนวณช่วงเวลา
    const calculateTimeSlots = (timeRange) => {
        const [startTime, endTime] = timeRange.split(","); // แยกเวลาเริ่มต้นและเวลาสิ้นสุด
        const [startHour, startMinute] = startTime.split(':');
        const [endHour, endMinute] = endTime.split(':');

        // แปลงเวลาเป็นนาทีเพื่อคำนวณ
        const startTotalMinutes = parseInt(startHour) * 60 + parseInt(startMinute);
        const endTotalMinutes = parseInt(endHour) * 60 + parseInt(endMinute);

        // คำนวณระยะเวลาระหว่างเวลาเริ่มต้นถึงเวลาสิ้นสุด
        const totalMinutes = endTotalMinutes - startTotalMinutes;
        const slotDuration = totalMinutes / 7; // ระยะเวลาของแต่ละรอบ (7 รอบ)

        const slots = [];
        for (let i = 0; i < 7; i++) {
            const slotStart = startTotalMinutes + i * slotDuration;
            const slotEnd = slotStart + slotDuration;

            // แปลงกลับเป็นชั่วโมงและนาที
            const slotStartHour = Math.floor(slotStart / 60);
            const slotStartMinute = slotStart % 60;
            const slotEndHour = Math.floor(slotEnd / 60);
            const slotEndMinute = slotEnd % 60;

            // สร้าง string เวลาของแต่ละรอบ
            const startTimeFormatted = `${String(slotStartHour).padStart(2, '0')}:${String(slotStartMinute).padStart(2, '0')}`;
            const endTimeFormatted = `${String(slotEndHour).padStart(2, '0')}:${String(slotEndMinute).padStart(2, '0')}`;

            slots.push(`${startTimeFormatted}`);
        }

        setTimeSlots(slots); // เก็บเวลาแต่ละรอบใน state
    };

    const TimeSet = (e) => {
        bookingDetail.time = e;
    };

    // ฟังก์ชันที่ใช้ในการอัปเดตค่า date
    const handleDateChange = (e) => {
        const selectedDate = e.target.value; // ค่าของวันที่ที่เลือก
        setDate(selectedDate); // อัปเดตค่าของ date
    
        // แปลงวันที่เป็นวันในสัปดาห์
        const dateObject = new Date(selectedDate); // สร้าง object Date จากวันที่ที่เลือก
        const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]; // อาร์เรย์ของวันในสัปดาห์
        const dayName = daysOfWeek[dateObject.getDay()]; // getDay() จะให้หมายเลขวัน (0-6)
        console.log("Selected day: " + dayName); // แสดงชื่อวัน
    
        // ตรวจสอบว่า bookingDetail และ Business.details มีข้อมูลหรือไม่
        if (bookingDetail?.Business?.details) {
            let de = bookingDetail?.Business?.details[0];
    
            if(de?.informationName.includes("Working")){
                de?.details.map((item) => {
                    // แยกวันที่จาก item เช่น "Monday,09:30,16:30" จะได้ "Monday"
                    const [dayFromItem] = item.split(','); // ดึงแค่วัน (ก่อนเครื่องหมาย ,)
                    
                    if(dayFromItem === dayName) {
                        const timeRange = item.split(',')[1]+","+item.split(',')[2]; // ดึงเวลา
                        calculateTimeSlots(timeRange); // คำนวณช่วงเวลา
                    }
                });
            }
        } else {
            console.log("Details not available in bookingDetail.");
        }
    };
    

    return (
        <div className="flex flex-1 flex-col items-center border-solid border-gray-300 border-l-2 sticky top-0 h-screen">
            <div className="mt-7 mb-4">
                <FontAwesomeIcon icon={faBook} />
                <span className="ml-2">Booking</span>
            </div>

            <div>
                <div className="border-l-3 border-[#F96868] pl-1 text-[#007CE8] font-bold mb-3">How many people?</div>
                <GuestSelector type={type} bookingDetail={bookingDetail}/>

                <div className={`border-l-3 border-[#F96868] pl-1 text-[#007CE8] font-bold mt-3 mb-3 ${type === 'event' ? 'hidden' : 'block'}`}>Date</div>

                
                {
                    type !== "event" ? (
                        type !== "restaurant" ? (
                            <DateRangePicker bookingDetail={bookingDetail} />
                        ) : (
                            <input
                                type="date"
                                value={date} // แสดงค่าของ date ที่เลือก
                                onChange={handleDateChange} // เมื่อมีการเลือกวันที่ใหม่จะอัปเดตค่า date
                            />
                        )
                    ) : null // ถ้า type เป็น "event" จะไม่แสดงอะไรเลย
                }

                {type === "restaurant" && (
                    <>
                        <div className="border-l-3 border-[#F96868] pl-1 text-[#007CE8] font-bold mb-3">Booking Time</div>
                        <select
                            className="border rounded-lg p-2 mb-6 cursor-pointer"
                            value={time}
                            onChange={(e) => TimeSet(e.target.value)}
                        >
                            {timeSlots.map((slot, index) => (
                                <option key={index} value={slot}>
                                    {slot}
                                </option>
                            ))}
                        </select>
                    </>
                )}
            </div>
        </div>
    );
};
