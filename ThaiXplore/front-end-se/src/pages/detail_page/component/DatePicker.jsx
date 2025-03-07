import  { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DateRangePicker = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  return (
    <div className="flex flex-col space-y-1">
      
      <div className="flex items-center  p-1 rounded-md w-[220px]">
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          dateFormat="dd MMM yyyy"
          className="text-sm w-24 h-8 px-2 border border-gray-300 rounded-md"
        />
        <span className="mx-2 text-sm">-</span>
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          dateFormat="dd MMM yyyy"
          className="text-sm w-24 h-8 px-2 border border-gray-300 rounded-md"
        />
      </div>
    </div>
  );
};

export default DateRangePicker;
