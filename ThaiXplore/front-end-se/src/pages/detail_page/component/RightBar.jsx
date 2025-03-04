import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import DateRangePicker from './DatePicker';
import GuestSelector from './GuestSelector';

export const RightSideBar = ({ type }) => {
    const [time, setTime] = useState("");

    useEffect(() => {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        setTime(`${hours}:${minutes}`);
    }, []);

    return (
        <div className="flex flex-1 flex-col items-center border-solid border-gray-300 border-l-2 sticky top-0 h-screen">
            <div className="mt-7 mb-4">
                <FontAwesomeIcon icon={faBook} />
                <span className="ml-2">Booking</span>
            </div>

            <div>
                
                <div className="border-l-3 border-[#F96868] pl-1 text-[#007CE8] font-bold mb-3">How many people?</div>
                <GuestSelector type={type}/>

                
                <div className="border-l-3 border-[#F96868] pl-1 text-[#007CE8] font-bold mt-3 mb-3">Date</div>
                <DateRangePicker />

               
                {type === "restaurant" && (
                    <>
                        <div className="border-l-3 border-[#F96868] pl-1 text-[#007CE8] font-bold mb-3">Booking Time</div>
                        <input
                            type="time"
                            className="border rounded-lg p-2 mb-6 cursor-pointer"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                        />
                    </>
                )}


            </div>
        </div>
    );
};
