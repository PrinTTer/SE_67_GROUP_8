import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { formatDateTime } from '../../../utils/FormatDateTime';
import { postData } from '../../../services/apiService';

const BookingForm = (prop) => {
    const { item, category, bookingDetail, userPackage } = prop;
    const services = item?.services;

    if (category === "package") {
        console.log("From Package In Booking Form: ", item);
        console.log("User Package", userPackage);
    } else {
        console.log("Item from Service : ", item);
    }

    const safeDate = (dateString) => {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return "";
        
        date.setHours(date.getHours() + 7);
        return date.toISOString().slice(0, 10); // ใช้แค่ส่วนของวันที่
    };

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [checkInDate, setCheckInDate] = useState(safeDate(bookingDetail.startDate));
    const [checkOutDate, setCheckOutDate] = useState(safeDate(bookingDetail.endDate));
    const [description, setDescription] = useState("");
    
    const [errors, setErrors] = useState({});
    
    const navigate = useNavigate();

    const validateForm = () => {
        let formErrors = {};

        if (!firstName) formErrors.firstName = "First Name is required";
        if (!lastName) formErrors.lastName = "Last Name is required";
        if (!email) formErrors.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(email)) formErrors.email = "Email is not valid";
        if (!phoneNumber) formErrors.phoneNumber = "Phone Number is required";
        else if (!/^[0-9]{10}$/.test(phoneNumber)) formErrors.phoneNumber = "Phone number must be in format xxx-xxxx-xxxx";
        if (!checkInDate) formErrors.checkInDate = "Check-in Date is required";
        if (!checkOutDate) formErrors.checkOutDate = "Check-out Date is required";
        if (checkInDate && checkOutDate && new Date(checkInDate) > new Date(checkOutDate)) {
            formErrors.checkOutDate = "Check-out Date must be later than Check-in Date";
        }

        setErrors(formErrors);
        return Object.keys(formErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        // สร้าง object จากข้อมูลที่กรอกในฟอร์ม
        const bookingData = {
            firstName,
            lastName,
            email,
            phoneNumber,
            checkInDate,
            checkOutDate,
            description,
        };

        // ส่ง object ไปยังหน้า booking
        console.log(bookingData);
        if (category === "package") {
            console.log("package");
        } else {
            navigate('/paymentSelector', { state: { bookingData, item, category, bookingDetail } });
        }
    };

    const handleConfirmBooking = async () => {
        if (!validateForm()) return;

        try {
            // สร้าง formData สำหรับแต่ละ service ใน package
            const formDataArray = services.map((service) => {
                return {
                    businessId: service?.businessId,  // ใช้ businessId จาก service
                    status: "confirmed",
                    bookingType: "package",
                    bookingTransaction: {
                        paymentMethod: "",  // method จะเป็น "credit card" หรือ "paypal"
                        transactionDate: new Date().toISOString(),  // วันที่ทำธุรกรรม
                    },
                    description: description,  // รายละเอียดการจอง
                    bookingDetail: [
                        {
                            serviceId: item?.packages?._id,  // serviceId ที่เกี่ยวข้องกับ booking
                            startDate: new Date(checkInDate).toISOString(),
                            endDate: new Date(checkOutDate).toISOString(),
                            amount: "1"  // ปรับจาก bookingDetail.bookingAmount เป็น service?.bookingAmount
                        }
                    ]
                };
            });

            // ส่ง formData ทั้งหมดไปที่ API
            console.log('Booking confirmed:', formDataArray[0]);
            console.log('userPackage ID:', userPackage._id);
            const response = await postData(`/bookings-package/${userPackage?._id}`, formDataArray[0]);
            console.log('Response from API for each formData:', response);
            // Redirect ไปยังหน้าที่ต้องการหลังจากการจองสำเร็จ
            navigate('/packageHistory');
        } catch (error) {
            console.error('Error confirming booking:', error);
        }
    };

    return (
        <div className="flex flex-1 w-full h-full bg-gray-50">
            <div className="w-full max-w-5xl mx-auto my-8 bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-white px-6 py-4">
                    <h2 className="text-xl font-bold">Booking Form</h2>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {category === "event" ? (
                                <div className="col-span-2">
                                </div>
                            ) : (
                                <div className="grid col-span-2 grid-cols-2 gap-6">
                                    <TextField
                                    label="Check-in Date"
                                    type="date"
                                    icon="📅"
                                    value={checkInDate}
                                    onChange={(e) => setCheckInDate(e.target.value)}
                                    error={errors.checkInDate}
                                    />
                                    { category === "restaurant" ? 
                                        (
                                            <TextField
                                                label="Round"
                                                type="text"
                                                icon="🕙"
                                                value={bookingDetail.time}
                                                onChange={bookingDetail.time}  // เปลี่ยนค่า time ใน bookingDetail
                                                error={errors.checkOutDate}
                                            />
                                        ): category !== "package" ? (
                                                <TextField
                                                    label="Check-out Date"
                                                    type="date"
                                                    icon="📅"
                                                    value={checkOutDate}
                                                    onChange={(e) => setCheckOutDate(e.target.value)}
                                                    error={errors.checkOutDate}
                                                />
                                            ) : null}
                                   
                                    
                                </div>
                            )}
                            <TextField
                                label="First Name"
                                placeholder="John"
                                icon="👤"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                error={errors.firstName}
                            />
                            <TextField
                                label="Last Name"
                                placeholder="Doe"
                                icon="👤"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                error={errors.lastName}
                            />
                            <TextField
                                label="Email"
                                placeholder="example@gmail.com"
                                type="email"
                                icon="✉️"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                error={errors.email}
                            />
                            <TextField
                                label="Phone Number"
                                placeholder="xxx xxxx xxxx"
                                type="tel"
                                icon="📱"
                                value={phoneNumber}
                                limit={10}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                error={errors.phoneNumber}
                            />
                            
                            <div className="col-span-1 md:col-span-2">
                                <TextArea
                                    label="Description"
                                    placeholder="Any additional information or special requests..."
                                    icon="📋"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="mt-8 flex justify-end">
                            {category === "package" ? (
                                <button
                                    onClick={handleConfirmBooking}
                                    className="px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-medium rounded-md shadow-sm hover:from-amber-600 hover:to-amber-700 transition-all duration-200 flex items-center"
                                >
                                    <span className="mr-2">Confirm Booking</span>
                                    <span>→</span>
                                </button>
                            ) : (
                                <button
                                    onClick={handleSubmit}
                                    className="px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-medium rounded-md shadow-sm hover:from-amber-600 hover:to-amber-700 transition-all duration-200 flex items-center"
                                >
                                    <span className="mr-2">Confirm Booking</span>
                                    <span>→</span>
                                </button>
                            )}
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
    const { label, placeholder, type = "text", icon, value, limit, onChange, error } = prop;
    return (
        <div className="relative">
            <label className="text-gray-700 font-medium block mb-2 flex items-center">
                {icon && <span className="mr-2">{icon}</span>}
                {label}
            </label>
            <input
                type={type}
                value={value}
                onChange={onChange} maxLength={limit}
                className={`w-full p-3 text-gray-700 border ${error ? 'border-red-500' : 'border-gray-200'} rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200 placeholder-gray-400`}
                placeholder={placeholder}
            />
            {error && <span className="text-red-500 text-sm">{error}</span>}
        </div>
    );
};

// TextArea component for longer text inputs
export const TextArea = (prop) => {
    const { label, placeholder, icon, value, onChange } = prop;
    return (
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
