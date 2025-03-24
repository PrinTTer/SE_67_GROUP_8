import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BookingForm = (prop) => {
    const {item, category} = prop;

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [checkInDate, setCheckInDate] = useState("");
    const [checkOutDate, setCheckOutDate] = useState("");
    const [specialRequests, setSpecialRequests] = useState("");

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        // สร้าง object จากข้อมูลที่กรอกในฟอร์ม
        const bookingData = {
            firstName,
            lastName,
            email,
            phoneNumber,
            checkInDate,
            checkOutDate,
            specialRequests,
        };

        // ส่ง object ไปยังหน้า booking
        console.log(bookingData);
        navigate('/paymentSelector', { state: {bookingData,item,category} });
    };

    return(
        <div className="flex flex-1 w-full h-full bg-gray-50">
            <div className="w-full max-w-5xl mx-auto my-8 bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-white px-6 py-4">
                    <h2 className="text-xl font-bold">Booking Form</h2>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <TextField
                                label="Check-in Date"
                                type="date"
                                icon="📅"
                                value={checkInDate}
                                onChange={(e) => setCheckInDate(e.target.value)} 
                            />
                            <TextField
                                label="Check-out Date"
                                type="date"
                                icon="📅"
                                value={checkOutDate}
                                onChange={(e) => setCheckOutDate(e.target.value)} 
                            />
                            <TextField
                                label="First Name"
                                placeholder="John"
                                icon="👤"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)} 
                            />
                            <TextField
                                label="Last Name"
                                placeholder="Doe"
                                icon="👤"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)} 
                            />
                            <TextField
                                label="Email"
                                placeholder="example@gmail.com"
                                type="email"
                                icon="✉️"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)} 
                            />
                            <TextField
                                label="Phone Number"
                                placeholder="+66 x-xxxx-xxxx"
                                type="tel"
                                icon="📱"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)} 
                            />
                            <div className="col-span-1 md:col-span-2">
                                <TextArea
                                    label="Special Requests"
                                    placeholder="Any additional information or special requests..."
                                    icon="📋"
                                    value={specialRequests}
                                    onChange={(e) => setSpecialRequests(e.target.value)} 
                                />
                            </div>
                        </div>

                        <div className="mt-8 flex justify-end">
                            <button 
                                type="submit" onClick={handleSubmit}
                                className="px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-medium rounded-md shadow-sm hover:from-amber-600 hover:to-amber-700 transition-all duration-200 flex items-center"
                            >
                                <span className="mr-2">Confirm Booking</span>
                                <span>→</span>
                            </button>
                        </div>
                    </div>
                </form>

                <div className="border-t border-gray-100 px-6 py-4">
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">
                            All fields marked with * are required
                        </span>
                        <div className="text-sm font-medium text-amber-600">
                            ThaiXplore
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// TextField component with onChange handler for input field
export const TextField = (prop) => {
    const { label, placeholder, type = "text", icon, value, onChange } = prop;
    return(
        <div className="relative">
            <label className="text-gray-700 font-medium block mb-2 flex items-center">
                {icon && <span className="mr-2">{icon}</span>}
                {label}
            </label>
            <input
                type={type}
                value={value}
                onChange={onChange}
                className="w-full p-3 text-gray-700 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
                placeholder={placeholder}
            />
        </div>
    );
    
};

// TextArea component for longer text inputs
export const TextArea = (prop) => {
    const { label, placeholder, icon, value, onChange } = prop;
    return(
        <div className="relative">
            <label className="text-gray-700 font-medium block mb-2 flex items-center">
                {icon && <span className="mr-2">{icon}</span>}
                {label}
            </label>
            <textarea
                value={value}
                onChange={onChange}
                className="w-full p-3 min-h-32 text-gray-700 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
                placeholder={placeholder}
            />
        </div>
    );
};

export default BookingForm;
