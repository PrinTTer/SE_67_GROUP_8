import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";

const DateRangePicker = (prop) => {
  const { bookingDetail } = prop;
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const SetStartDate = (date) => {
    setStartDate(date);
    bookingDetail.startDate = format(date, "yyyy-MM-dd'T'HH:mm:ss.SSSXXX");
    console.log("Start Date: " + bookingDetail.startDate);
  };

  const SetEndDate = (date) => {
    setEndDate(date);
    bookingDetail.endDate = format(date, "yyyy-MM-dd'T'HH:mm:ss.SSSXXX");
    console.log("End Date: " + bookingDetail.endDate);
  };

  return (
    <div className="relative w-full max-w-xs p-2">
      {/* Container to hold DatePickers */}
      <div className="flex items-center space-x-2">
        <DatePicker
          selected={startDate}
          onChange={(date) => SetStartDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          dateFormat="dd MMM yyyy"
          className="w-full h-8 px-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <span className="text-sm">-</span>
        <DatePicker
          selected={endDate}
          onChange={(date) => SetEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          dateFormat="dd MMM yyyy"
          className="w-full h-8 px-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Use the relative container to prevent the DatePicker popup from overflowing */}
      <div className="absolute z-10">
        {/* Additional custom styling if needed */}
      </div>
    </div>
  );
};

export default DateRangePicker;
