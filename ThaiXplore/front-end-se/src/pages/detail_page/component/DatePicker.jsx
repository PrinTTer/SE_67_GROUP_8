import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';

const DateRangePicker = (prop) => {
  const { bookingDetail } = prop;

  const [dates, setDates] = useState([null, null]); // Use array to store both start and end date
  const [isOpen, setIsOpen] = useState(false); // To control the visibility of the calendar popup

  const handleChange = (dates) => {
    setDates(dates);
    if(dates[1]){
      togglePopup();
    }
    bookingDetail.startDate = format(dates[0], "yyyy-MM-dd'T'HH:mm:ss.SSSXXX");
    bookingDetail.endDate = format(dates[1], "yyyy-MM-dd'T'HH:mm:ss.SSSXXX");

    const timeDifference = dates[1] - dates[0]; 
    bookingDetail.AmountDay = timeDifference / (1000 * 3600 * 24); 
  };

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex flex-col items-center space-x-2">
      <div>Start Date - End Date</div>
      {/* Button to trigger the calendar popup */}
      <button
        onClick={togglePopup}
        className="w-full border border-gray-300 rounded-md px-2 py-2 flex justify-between items-center text-black text-sm font-medium"
      >
        {dates[0] && dates[1]
          ? `${dates[0].toLocaleDateString("en-GB")} - ${dates[1].toLocaleDateString("en-GB")}`
          : "Select Dates"}
        <FontAwesomeIcon icon={faCalendarAlt} className="text-gray-500 ml-2 text-xs" />
      </button>

      {/* Popup Content */}
      {isOpen && (
        <div className="absolute z-10 w-80 bg-white shadow-lg rounded-md mt-2 p-3 text-sm">
          <DatePicker
            selected={dates[0]}
            onChange={handleChange}
            startDate={dates[0]}
            endDate={dates[1]}
            selectsRange
            inline
            dateFormat="dd MMM yyyy"
            className="w-full h-8 px-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      )}
    </div>
  );
};

export default DateRangePicker;
