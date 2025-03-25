import { useEffect, useState } from 'react';
import { fetchData } from '../../services/apiService';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboardList } from '@fortawesome/free-solid-svg-icons';

const BookingHistory = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBookings = async () => {
            setLoading(true);
            setError(null);
            try {
                const bookingsData = await fetchData("/bookings");
                const bookingsWithServiceDetails = await Promise.all(bookingsData.map(async (booking) => {
                    const businessData = await fetchData(`/businesses/${booking.businessId}`);
                    const detailedBooking = booking.bookingDetail.map(detail => {
                        const service = businessData.services.find(service => service._id === detail.serviceId);
                        return { ...detail, service };
                    });

                    return { ...booking, businessData, bookingDetail: detailedBooking };
                }));

                setBookings(bookingsWithServiceDetails);
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
        <div className="container mx-auto px-4 py-8">
            {/* Header section with gradient */}
            <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-white px-6 py-4 rounded-t-lg mb-6">
                <div className="flex items-center">
                    <div className="flex items-center justify-center w-10 h-10 text-white mr-4">
                        <FontAwesomeIcon icon={faClipboardList} className="text-2xl" />
                    </div>
                    <h1 className="text-3xl font-bold">My Bookings</h1>
                </div>
            </div>

            {/* Loading and Error States */}
            {loading && (
                <div className="text-center py-8">
                    <p className="text-gray-600 text-xl">Loading bookings...</p>
                </div>
            )}
            
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                    <span className="block sm:inline">{error}</span>
                </div>
            )}

            {/* Bookings Container */}
            <div className="space-y-6">
                {bookings.length > 0 ? (
                    bookings.map((booking, index) => (
                        <div 
                            key={index} 
                            className="bg-white border border-gray-100 rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
                        >
                            {/* Booking Header */}
                            <div className="bg-gray-50 px-6 py-4 rounded-t-lg border-b border-gray-200">
                                <div className="flex justify-between items-center">
                                    <h2 className="text-2xl font-semibold text-gray-800">
                                        {booking.businessData.business.businessName}
                                    </h2>
                                    <span 
                                        className={`px-3 py-1 rounded-full text-sm font-medium 
                                        ${booking.status === 'confirmed' ? 'bg-green-100 text-green-800' : 
                                          booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                                          'bg-red-100 text-red-800'}`}
                                    >
                                        {booking.status}
                                    </span>
                                </div>
                                <p className="text-gray-500 mt-1">
                                    Booked on {new Date(booking.bookingDate).toLocaleDateString()}
                                </p>
                            </div>

                            {/* Booking Details */}
                            <div className="p-6">
                                {booking.bookingDetail.map((detail, idx) => (
                                    <div 
                                        key={idx} 
                                        className="bg-white rounded-lg border border-gray-100 shadow-sm p-4 mb-4 
                                        hover:bg-gray-50 transition-all duration-200"
                                    >
                                        <div className="flex justify-between items-center mb-3">
                                            <h3 className="text-lg font-medium text-gray-700">
                                                {detail.service ? detail.service.ticketType : 'N/A'}
                                            </h3>
                                            <span className="text-amber-600 font-semibold">
                                                {detail.service ? `${detail.service.price} THB` : 'N/A'}
                                            </span>
                                        </div>
                                        <div className="text-gray-600">
                                            <div className="flex justify-between">
                                                <p>Start Date: {new Date(detail.startDate).toLocaleDateString()}</p>
                                                <p>End Date: {new Date(detail.endDate).toLocaleDateString()}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-8 bg-gray-50 rounded-lg">
                        <p className="text-gray-600 text-xl">No bookings found.</p>
                    </div>
                )}
            </div>

            {/* Footer */}
            <div className="mt-6 text-center">
                <span className="text-sm text-gray-500">
                    Powered by ThaiXplore
                </span>
            </div>
        </div>
    );
};

export default BookingHistory;