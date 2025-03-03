import  { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faUserPlus, faUserMinus, faBed, faUsers } from "@fortawesome/free-solid-svg-icons";

const GuestSelector = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [rooms, setRooms] = useState(1);

  const togglePopup = () => setIsOpen(!isOpen);

  return (
    <div className="relative w-52"> {/* Smaller width */}
      {/* Button to open popup */}
      <button
        onClick={togglePopup}
        className="w-full border border-gray-300 rounded-md px-2 py-2 flex justify-between items-center text-black text-sm font-medium"
      >
        {`${adults} Adult, ${children} Child, ${rooms} Rooms`}
        <FontAwesomeIcon icon={faUsers} className="text-gray-500 ml-2 text-xs" />
      </button>

      {/* Popup Content */}
      {isOpen && (
        <div className="absolute z-10 w-48 bg-white shadow-lg rounded-md mt-1 p-3 text-sm">
          {/* Adult Selector */}
          <div className="flex justify-between items-center py-1">
            <span className="font-medium"><FontAwesomeIcon icon={faUser} className="mr-1"/> Adult</span>
            <div className="flex items-center space-x-1">
              <button
                onClick={() => setAdults(Math.max(1, adults - 1))}
                className="border px-1 w-6 h-6 rounded bg-gray-200 flex items-center justify-center"
              >
                <FontAwesomeIcon icon={faUserMinus} className="text-xs" />
              </button>
              <span>{adults}</span>
              <button
                onClick={() => setAdults(adults + 1)}
                className="border px-1 w-6 h-6 rounded bg-gray-200 flex items-center justify-center"
              >
                <FontAwesomeIcon icon={faUserPlus} className="text-xs" />
              </button>
            </div>
          </div>

          {/* Children Selector */}
          <div className="flex justify-between items-center py-1">
            <span className="font-medium"><FontAwesomeIcon icon={faUser} className="mr-1"/> Children</span>
            <div className="flex items-center space-x-1">
              <button
                onClick={() => setChildren(Math.max(0, children - 1))}
                className="border px-1 w-6 h-6 rounded bg-gray-200 flex items-center justify-center"
              >
                <FontAwesomeIcon icon={faUserMinus} className="text-xs" />
              </button>
              <span>{children}</span>
              <button
                onClick={() => setChildren(children + 1)}
                className="border px-1 w-6 h-6 rounded bg-gray-200 flex items-center justify-center"
              >
                <FontAwesomeIcon icon={faUserPlus} className="text-xs" />
              </button>
            </div>
          </div>

          {/* Room Selector */}
          <div className="flex justify-between items-center py-1">
            <span className="font-medium"><FontAwesomeIcon icon={faBed} className="mr-1"/> Room</span>
            <div className="flex items-center space-x-1">
              <button
                onClick={() => setRooms(Math.max(1, rooms - 1))}
                className="border px-1 w-6 h-6 rounded bg-gray-200 flex items-center justify-center"
              >
                <FontAwesomeIcon icon={faUserMinus} className="text-xs" />
              </button>
              <span>{rooms}</span>
              <button
                onClick={() => setRooms(rooms + 1)}
                className="border px-1 w-6 h-6 rounded bg-gray-200 flex items-center justify-center"
              >
                <FontAwesomeIcon icon={faUserPlus} className="text-xs" />
              </button>
            </div>
          </div>

          {/* Done Button */}
          <div className="text-right mt-2">
            <button
              onClick={togglePopup}
              className="bg-blue-500 text-white px-3 py-1 text-xs rounded-md"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GuestSelector;
