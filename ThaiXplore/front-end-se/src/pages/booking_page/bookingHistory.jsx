import { useEffect, useState } from 'react';
import { fetchData } from '../../services/apiService';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboardList, faImage } from '@fortawesome/free-solid-svg-icons';

const BookingHistory = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [categoryForImage, setCategoryForImage] = useState("");

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
                        return { ...detail, service, businessImage: businessData.business.imageUrl };
                    });
                    
                    return { ...booking, businessData, bookingDetail: detailedBooking };
                }));
                console.log("Booking Details : \n",bookingsWithServiceDetails);
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

    // useEffect(()=> {
    //     console.log(checkService(bookings[0].businessData[0].business.category))
    // }, []);

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
                            className="flex bg-white border border-gray-100 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
                        >
                            {/* Image Section */}
                            <div className="w-1/3 relative">
                                {booking.bookingDetail[0].service?.media === undefined ? (
                                    <div className="flex flex-col items-center justify-center text-gray-400 h-full w-full">
                                        <FontAwesomeIcon icon={faImage} className="text-4xl mb-2" />
                                        <span className="text-sm">No picture</span>
                                    </div>
                                ) : (
                                    <img 
                                    src={`http://localhost:3000/public/uploads/service/${checkService(booking.businessData.business.category)}/${booking.bookingDetail[0].service?.media}`} 
                                    alt={booking.businessData.business.businessName}
                                    className="w-full h-full object-cover"
                                    />
                                )}
                                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-3">
                                    <h2 className="text-xl font-semibold">
                                        {booking.businessData.business.businessName}
                                    </h2>
                                </div>
                            </div>

                            {/* Booking Details Section */}
                            <div className="w-2/3 p-6">
                                {/* Booking Status */}
                                <div className="flex justify-between items-center mb-4">
                                    <span 
                                        className={`px-3 py-1 rounded-full text-sm font-medium 
                                        ${booking.status === 'confirmed' ? 'bg-green-100 text-green-800' : 
                                          booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                                          'bg-red-100 text-red-800'}`}
                                    >
                                        {booking.status}
                                    </span>
                                    <p className="text-gray-500">
                                        Booked on {new Date(booking.bookingDate).toLocaleDateString()}
                                    </p>
                                </div>

                                {/* Booking Details */}
                                {booking.bookingDetail.map((detail, idx) => (
                                    <div 
                                        key={idx} 
                                        className="bg-gray-50 rounded-lg p-4 mb-4 border border-gray-200"
                                    >
                                        <div className="flex justify-between items-center mb-3">
                                            <h3 className="text-lg font-medium text-gray-700">
                                                {detail.service ? detail.service.ticketType : 'N/A'}
                                            </h3>
                                            
                                            <span className="text-amber-600 font-semibold">
                                                {detail.service ? `${detail.service.price} THB` : 'N/A'}
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center mb-3">
                                            <h3 className="text-lg font-medium text-gray-700">
                                                Test
                                            </h3>
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


const checkService = (prop) => {
    const {categoryForImage} = prop;
    if(categoryForImage === "hotel"){
        return("rooms");
    }
    else if(categoryForImage === "carRental"){
        return("cars");
    }
    else if(categoryForImage === "restaurant"){
        return("courses");
    }
    else if(categoryForImage === "event"){
        return("events");
    }
}