import { useEffect, useState } from 'react';
import { fetchData } from '../../services/apiService';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboardList, faImage, faCalendarAlt, faClock, faMoneyBillWave, faInfoCircle } from '@fortawesome/free-solid-svg-icons';

// Utility function for formatting dates and times
const formatDateTime = (dateString, options = {}) => {
    if (!dateString) return 'N/A';

    const defaultOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
        timeZone: 'Asia/Bangkok'  // Set the timezone to GMT+7 (Bangkok)
    };

    const mergedOptions = { ...defaultOptions, ...options };
    
    try {
        const date = new Date(dateString);
        
        // Check if date is valid
        if (isNaN(date.getTime())) return 'Invalid Date';

        // Format based on different scenarios
        if (options.timeOnly) {
            return date.toLocaleTimeString('en-US', { 
                hour: '2-digit', 
                minute: '2-digit', 
                hour12: true,
                timeZone: 'Asia/Bangkok' 
            });
        }

        if (options.dateOnly) {
            return date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                timeZone: 'Asia/Bangkok' 
            });
        }

        // Full date and time
        return date.toLocaleString('en-US', mergedOptions);
    } catch (error) {
        console.error('Error formatting date:', error);
        return 'N/A';
    }
};

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
                console.log("bookingsData: ",bookingsData);

                const normalType = bookingsData.filter((item)=>item?.bookingType!=="package");

                const bookingsWithServiceDetails = await Promise.all(normalType.map(async (booking) => {
                    const businessData = await fetchData(`/businesses/${booking.businessId}`);
                    const detailedBooking = booking.bookingDetail.map(detail => {
                        const service = businessData.services.find(service => service._id === detail.serviceId);
                        return { ...detail, service, businessImage: businessData.business.imageUrl };
                    });
                    
                    return { ...booking, businessData, bookingDetail: detailedBooking };
                }));
                console.log("bookingsWithServiceDetails: ",bookingsWithServiceDetails);
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
            {/* Header Section */}
            <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-md">
                <div className="container mx-auto px-4 py-6 flex items-center justify-between">
                    <div className="flex items-center">
                        <FontAwesomeIcon icon={faClipboardList} className="text-3xl mr-4 text-white/80" />
                        <h1 className="text-3xl font-bold tracking-tight">My Bookings</h1>
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="container mx-auto px-4 py-8">
                {/* Loading and Error States */}
                {loading && (
                    <div className="text-center py-12">
                        <div className="animate-pulse text-amber-600">
                            <FontAwesomeIcon icon={faClipboardList} className="text-4xl mb-4" />
                            <p className="text-xl font-semibold">Loading bookings...</p>
                        </div>
                    </div>
                )}
                
                {error && (
                    <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
                        <div className="flex items-center">
                            <FontAwesomeIcon icon={faInfoCircle} className="text-red-500 mr-3" />
                            <p className="text-red-700">{error}</p>
                        </div>
                    </div>
                )}

                {/* Bookings Container */}
                <div className="grid gap-6">
                    {bookings.length > 0 ? (
                        bookings.map((booking, index) => (
                            <div 
                                key={index} 
                                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100"
                            >
                                <div className="grid md:grid-cols-3 gap-0">
                                    {/* Image Section - 1/3 width */}
                                    <div className="md:col-span-1 h-full flex flex-col">
                                        {booking.bookingDetail[0].service?.media === undefined ? (
                                            <div className="flex flex-col items-center justify-center text-gray-400 flex-grow p-6 relative">
                                                <FontAwesomeIcon icon={faImage} className="text-5xl mb-3 text-gray-300" />
                                                <span className="text-sm text-gray-500">No picture available</span>
                                                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white p-4">
                                                    <h2 className="text-xl font-bold truncate">
                                                        {booking?.businessData?.business?.businessName}
                                                    </h2>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="relative w-full h-full">
                                                <img 
                                                    src={`http://localhost:3000/public/uploads/services/${checkService(booking?.businessData?.business?.category)}/${booking?.bookingDetail[0]?.service?.media[0]}`} 
                                                    alt={booking?.businessData?.business?.businessName}
                                                    className="w-full h-full object-cover"
                                                />
                                                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white p-4">
                                                    <h2 className="text-xl font-bold truncate">
                                                        {booking?.businessData?.business?.businessName}
                                                        {console.log(booking)}
                                                    </h2>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Booking Details Section - 2/3 width */}
                                    <div className="md:col-span-2 p-6 flex flex-col">
                                        {/* Booking Status and Date */}
                                        <div className="flex justify-between items-center mb-6">
                                            <span 
                                                className={`px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wide 
                                                ${booking?.status === 'confirmed' ? 'bg-green-100 text-green-800' : 
                                                  booking?.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                                                  'bg-red-100 text-red-800'}`}
                                            >
                                                {booking?.status}
                                            </span>
                                            <div className="flex items-center text-gray-500">
                                                <FontAwesomeIcon icon={faCalendarAlt} className="mr-2" />
                                                <p className="text-sm">
                                                    Booked on {formatDateTime(booking?.bookingDate, { dateOnly: true })}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Booking Details Container - Ensure equal height */}
                                        <div className="flex-grow">
                                            {booking.bookingDetail.map((detail, idx) => (
                                                <div 
                                                    key={idx} 
                                                    className="bg-gray-50 rounded-lg p-5 mb-4 border border-gray-200 h-full flex flex-col"
                                                >
                                                    {/* Total Price */}
                                                    <div className="flex justify-between items-center mb-4">
                                                        <div className="flex items-center text-amber-600">
                                                            <FontAwesomeIcon icon={faMoneyBillWave} className="mr-2" />
                                                            <span className="font-semibold text-lg">
                                                                {booking.totalPrice ? `${booking.totalPrice} THB` : 'N/A'}
                                                            </span>
                                                        </div>
                                                    </div>

                                                    {/* Date Range - Equal width columns */}
                                                    <div className="grid grid-cols-2 gap-4 mb-4">
                                                        <div className="bg-white p-3 rounded-lg shadow-sm flex flex-col justify-between h-full">
                                                            <p className="text-xs text-gray-500 mb-1 flex items-center">
                                                                <FontAwesomeIcon icon={faCalendarAlt} className="mr-2 text-amber-600" />
                                                                Start Date
                                                            </p>
                                                            <p className="font-medium">
                                                                {formatDateTime(detail.startDate, { dateOnly: true })}
                                                            </p>
                                                        </div>
                                                        <div className="bg-white p-3 rounded-lg shadow-sm flex flex-col justify-between h-full">
                                                            <p className="text-xs text-gray-500 mb-1 flex items-center">
                                                                <FontAwesomeIcon icon={faCalendarAlt} className="mr-2 text-amber-600" />
                                                                End Date
                                                            </p>
                                                            <p className="font-medium">
                                                                {formatDateTime(detail.endDate, { dateOnly: true })}
                                                            </p>
                                                        </div>
                                                    </div>

                                                    {/* Service Details - Ensure consistent height */}
                                                    <div className="flex-grow">
                                                        <h3 className="text-lg font-semibold text-gray-700 mb-3">Service Details</h3>
                                                        {detail.service && renderServiceDetails(detail.service)}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="bg-white rounded-xl p-12 text-center shadow-md">
                            <p className="text-xl text-gray-500">No bookings found.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Footer */}
            <div className="bg-white border-t border-gray-100 py-4">
                <div className="container mx-auto px-4 text-center">
                    <span className="text-sm text-gray-400">
                        Powered by ThaiXplore
                    </span>
                </div>
            </div>
        </div>
    );

};

export default BookingHistory;

// Helper functions
function renderServiceDetails(service) {
    const matchedFields = findAllServiceFields(service);
    const topicFields = getTopic(matchedFields[0]);

    const isDateTimeField = (field) => {
        const dateTimeKeywords = ['date', 'time', 'start', 'end', 'datetime'];
        return dateTimeKeywords.some(keyword => 
            field.toLowerCase().includes(keyword)
        );
    };

    return (
        <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-5 space-y-4 max-h-32 overflow-y-auto">
            {matchedFields.map((field) => {
                const formattedLabel = formatFieldLabel(field);
                const fieldValue = service[field];

                return (
                    <div key={field} className="space-y-3">
                        <div className="space-y-3">
                            {topicFields.map((topicField, topicIndex) => (
                                topicField !== 'price' && (
                                    <div
                                        key={topicIndex}
                                        className="bg-gray-50 rounded-lg p-4 transition-all duration-200 hover:bg-gray-100"
                                    >
                                        <div className="text-sm font-medium text-gray-600 mb-2 flex items-center">
                                            {isDateTimeField(topicField) && (
                                                <FontAwesomeIcon icon={faClock} className="mr-2 text-amber-600" />
                                            )}
                                            {formatFieldName(topicField)}
                                        </div>
                                        {renderTopicContent(service[topicField],topicField)}
                                    </div>
                                )
                            ))}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}


function findAllServiceFields(service) {
    const fieldsToCheck = ['roomType', 'ticketType', 'carBrand', 'courseName'];
    return fieldsToCheck.filter((field) => field in service);
}

const renderTopicContent = (content,topicField) => {
    //console.log("What is content",content, topicField);
    const isDateTimeField = (field) => {
        const dateTimeKeywords = ['date', 'time', 'start', 'end', 'datetime'];
        return dateTimeKeywords.some(keyword => 
            field.toLowerCase().includes(keyword)
        );
    };

    if (Array.isArray(content)) {
        return (
            <ul className="grid grid-cols-2 gap-2">
                {content.map((value, i) => (
                    <li 
                        key={i} 
                        className="flex items-center space-x-2 text-gray-700"
                    >
                        <div className="w-1.5 h-1.5 rounded-full bg-amber-500"></div>
                        <span>
                            {typeof value === 'object' ? value.name : value}
                        </span>
                    </li>
                ))}
            </ul>
        );
    }
    
    return (
        <div className="text-gray-700">
            {isDateTimeField(topicField)?formatDateTime(content):content}
        </div>
    );

    
};

const checkService = (categoryForImage) => {
    const categoryMap = {
        "hotel": "rooms",
        "carRental": "cars",
        "restaurant": "courses",
        "event": "events"
    };
    return categoryMap[categoryForImage] || categoryForImage;
};

const getTopic = (category) => {
    const topicMap = {
        'roomType': ['roomType', 'guestAmount', 'roomSize', 'price', 'facilities'],
        'ticketType': ['ticketType', 'price', 'eventDate', 'start', 'end'],
        'carBrand': ['carBrand', 'amountSeat', 'price'],
        'courseName': ['courseName', 'menuList', 'price']
    };
    return topicMap[category] || [];
};

const formatFieldName = (field) => {
    return field
        .charAt(0).toUpperCase() + 
        field.slice(1).replace(/([A-Z])/g, ' $1');
};

const formatFieldLabel = (field) => {
    return field
        .replace(/([A-Z])/g, ' $1')
        .replace(/^./, str => str.toUpperCase());
};