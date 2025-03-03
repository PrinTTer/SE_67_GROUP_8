import { useState } from "react";

export const PriceRange = () => {
  const [value, setValue] = useState(5000); // Default midpoint value
  const [isSliding, setIsSliding] = useState(false);

  const handleChange = (event) => {
    setValue(Number(event.target.value));
  };

  // Function to format numbers with commas (e.g., 10,000)
  const formatNumber = (num) => {
    return num.toLocaleString();
  };

  return (
    <div className="mb-5 w-full pr-4">
     

      {/* Slider Container */}
      <div className="relative w-full">
        {/* Tooltip (Shows only when sliding) */}
        {isSliding && (
          <div
            className="absolute -top-7 bg-blue-500 text-white text-xs px-2 py-1 rounded-md transform -translate-x-1/2 transition-opacity duration-200"
            style={{ left: `${(value / 10000) * 100}%` }}
          >
            ฿{formatNumber(value)}
          </div>
        )}

        {/* Range Input */}
        <input
          type="range"
          min="0"
          max="10000"
          value={value}
          onChange={handleChange}
          onMouseDown={() => setIsSliding(true)}
          onMouseUp={() => setIsSliding(false)}
          className="w-full cursor-pointer appearance-none h-2 rounded-md "
          style={{
            background: `linear-gradient(to right, #007CE8 0%, #007CE8 ${(value / 10000) * 100}%, #ccc ${(value / 10000) * 100}%, #ccc 100%)`
          }}
        />
      </div>

      {/* Selected Value Display */}
      {/* <div className="text-center text-sm font-semibold text-gray-700 mt-2">
        Selected: ${formatNumber(value)}
      </div> */}
    </div>
  );
};
