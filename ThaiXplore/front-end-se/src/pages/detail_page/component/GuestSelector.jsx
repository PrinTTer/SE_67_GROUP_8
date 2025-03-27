import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faUserPlus, faUserMinus, faBed, faUsers, faBowlFood, faCar, faCalendar } from "@fortawesome/free-solid-svg-icons";

const GuestSelector = (prop) => {
  const { type, bookingDetail } = prop;
  const [isOpen, setIsOpen] = useState(false);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [rooms, setRooms] = useState(1);
  const [amount, setAmount] = useState();
  const [finalAdults, setFinalAdults] = useState(adults);
  const [finalChildren, setFinalChildren] = useState(children);
  const [finalRooms, setFinalRooms] = useState(rooms);

  useEffect(() => {
    if (type === "hotel") {
      setAmount("Room");
    } else if (type === "event") {
      setAmount("Ticket");
    } else if (type === "carRental") {
      setAmount("Car");
    } else if (type === "restaurant") {
      setAmount("Set");
    }
  }, [type]);

  const togglePopup = () => setIsOpen(!isOpen);

  const handleSubmit = () => {
    setFinalAdults(adults); // update final values after "Done" button click
    setFinalChildren(children);
    setFinalRooms(rooms);
    bookingDetail.adult = adults;
    bookingDetail.child = children;
    bookingDetail.bookingAmount = rooms;
    console.log("adult" + bookingDetail.adult);
    console.log("child" + bookingDetail.child);
    console.log("bookingAmount" + bookingDetail.bookingAmount);
    togglePopup();
  };

  // Function to check category and return corresponding icon
  const checkCategory = () => {
    switch (type) {
      case "hotel":
        return faBed;
      case "event":
        return faCalendar;
      case "restaurant":
        return faBowlFood;
      case "carRental":
        return faCar;
      default:
        return faUsers; // Default icon if no match
    }
  };

  return (
    <div className="relative w-52"> {/* Smaller width */}
      {/* Button to open popup */}
      <button
        onClick={togglePopup}
        className="w-full border border-gray-300 rounded-md px-2 py-2 flex justify-between items-center text-black text-sm font-medium"
      >
        {type === "hotel" 
          ? `${finalAdults} Adult, ${finalChildren} Child, ${finalRooms} ${amount}` 
          : `${finalRooms} ${amount}`}
        <FontAwesomeIcon icon={faUsers} className="text-gray-500 ml-2 text-xs" />
      </button>

      {/* Popup Content */}
      {isOpen && (
        <div className="absolute z-10 w-48 bg-white shadow-lg rounded-md mt-1 p-3 text-sm">
          {
            type === "hotel" && (
              <>
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
              </>
            )
          }
          {/* Room Selector */}
          <div className="flex justify-between items-center py-1">
            <span className="font-medium"><FontAwesomeIcon icon={checkCategory()} className="mr-1"/> {amount}</span>
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
              onClick={handleSubmit}
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
