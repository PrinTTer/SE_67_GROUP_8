import React, { useEffect, useState } from 'react';
import { fetchData } from '../../services/apiService';

const BookingHistory = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBookings = async () => {
            setLoading(true);
            setError(null);
            try {
                // ดึงข้อมูล bookings
                const bookingsData = await fetchData("/bookings");
                console.log("Booking Data: \n", bookingsData);

                // สำหรับแต่ละ booking, ดึงข้อมูล business จาก businessId และเชื่อมโยง serviceId กับ services ใน business
                const bookingsWithServiceDetails = await Promise.all(bookingsData.map(async (booking) => {
                    // ดึงข้อมูลของ business โดยใช้ businessId
                    const businessData = await fetchData(`/businesses/${booking.businessId}`);

                    // เชื่อมโยง serviceId จาก bookingDetail กับ services ของ business
                    const detailedBooking = booking.bookingDetail.map(detail => {
                        // หา service ที่ตรงกับ serviceId จาก services ใน business
                        const service = businessData.services.find(service => service._id === detail.serviceId);
                        return { ...detail, service }; // รวมข้อมูล service กับ bookingDetail
                    });

                    return { ...booking, businessData, bookingDetail: detailedBooking };
                }));

                console.log("Bookings with service details: \n", bookingsWithServiceDetails);
                setBookings(bookingsWithServiceDetails); // กำหนด bookings ที่รวมข้อมูลแล้ว
            } catch (error) {
                setError("Failed to load bookings");
                console.error("Error fetching bookings:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, []);

    return (
        <div>
            <h1 className="text-4xl">My Booking</h1>
            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}
            <div className="flex flex-col">
                {bookings.length > 0 ? (
                    bookings.map((booking, index) => (
                        <div key={index} className="border p-4 mb-4">
                            <h2 className="text-2xl">{booking.businessData.business.businessName}</h2>
                            <p>Status: {booking.status}</p>
                            <p>Booking Date: {new Date(booking.bookingDate).toLocaleDateString()}</p>
                            {booking.bookingDetail.map((detail, idx) => (
                                <div key={idx} className="my-2">
                                    <p>Service: {detail.service ? detail.service.ticketType : 'N/A'}</p>
                                    <p>Price: {detail.service ? detail.service.price : 'N/A'}</p>
                                    <p></p>
                                    <p>Start Date: {new Date(detail.startDate).toLocaleDateString()}</p>
                                    <p>End Date: {new Date(detail.endDate).toLocaleDateString()}</p>
                                </div>
                            ))}
                        </div>
                    ))
                ) : (
                    <p>No bookings found.</p>
                )}
            </div>
        </div>
    );
};

export default BookingHistory;


// export const BookingUser = (prop) => {
//     const {booking} = prop;
//     return(
//         <div className="flex flex-col border p-4 mb-4">
//             <h2 className="text-2xl">{booking.title}</h2> {/* Assuming "title" is a property of booking */}
//             <p className="text-lg">{booking.date}</p> {/* Assuming "date" is a property of booking */}
//             <p>{booking.details}</p> {/* Display other booking details as needed */}
//         </div>
//     );
    
// }