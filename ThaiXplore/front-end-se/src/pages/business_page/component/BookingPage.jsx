import { faCalendarAlt, faClipboardCheck, faImage, faMoneyBillWave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { fetchData } from "../../../services/apiService";
import { formatDateTime } from "../../../utils/FormatDateTime";
import LoadingSpinner from "../../../components/LoadingSpinner";

export const BusinessBookingPage = (prop) => {
    const { business, businessId, userId } = prop;
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBookings = async () => {
            setLoading(true);
            setError(null);
            try {
                const bookingsData = await fetchData(`/businesses/${businessId}/bookings`);
                const bookingsWithServiceDetails = await Promise.all(bookingsData.map(async (booking) => {
                    const businessData = await fetchData(`/businesses/${booking.businessId}`);
                    const detailedBooking = booking.bookingDetail.map(detail => {
                        const service = businessData.services.find(service => service._id === detail.serviceId);
                        return { ...detail, service, businessImage: businessData.business.imageUrl };
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
        <div className="p-6 bg-white rounded-lg shadow-lg border border-yellow-100">
            <div className="flex items-center mb-6 border-b border-yellow-200 pb-4">
                <FontAwesomeIcon
                    icon={faClipboardCheck}
                    className="text-yellow-500 text-2xl mr-3"
                />
                <h2 className="text-2xl font-bold text-gray-800">Booking History</h2>
            </div>
            {
                loading ? <LoadingSpinner />
                    :
                    <div className="h-screen overflow-y-auto hide-scrollbar">
                        {bookings.length > 0 ? (
                            bookings.map((booking, index) => (
                                <div
                                    key={index}
                                    className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100"
                                >
                                    <div className="grid md:grid-cols-3 gap-0">
                                        {/* Image Section - 1/3 width */}
                                        <div className="md:col-span-1 relative">
                                            {booking.bookingDetail[0].service?.media === undefined ? (
                                                <div className="flex flex-col items-center justify-center text-gray-400 h-full w-full p-6">
                                                    <FontAwesomeIcon icon={faImage} className="text-5xl mb-3 text-gray-300" />
                                                    <span className="text-sm text-gray-500">No picture available</span>
                                                </div>
                                            ) : (
                                                <img
                                                    src={`http://localhost:3000/public/uploads/services/${checkService(booking.businessData.business.category)}/${booking?.bookingDetail[0]?.service?.media[0]}`}
                                                    alt={booking.businessData.business.businessName}
                                                    className="w-full h-full object-cover"
                                                />
                                            )}
                                            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white p-4">
                                                <h2 className="text-xl font-bold truncate">
                                                    {booking.businessData.business.businessName}
                                                </h2>
                                            </div>
                                        </div>

                                        {/* Booking Details Section - 2/3 width */}
                                        <div className="md:col-span-2 p-6">
                                            {/* Booking Status and Date */}
                                            <div className="flex justify-between items-center mb-6">
                                                <span
                                                    className={`px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wide 
                                                            ${booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                                                            booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                                                'bg-red-100 text-red-800'}`}
                                                >
                                                    {booking.status}
                                                </span>
                                                <div className="flex items-center text-gray-500">
                                                    <FontAwesomeIcon icon={faCalendarAlt} className="mr-2" />
                                                    <p className="text-sm">
                                                        Booked on {formatDateTime(booking.bookingDate, { dateOnly: true })}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Booking Details */}
                                            {booking.bookingDetail.map((detail, idx) => (
                                                <div key={idx} className="bg-gray-50 rounded-lg p-5 mb-4 border border-gray-200">
                                                    {/* Total Price */}
                                                    <div className="flex justify-between items-center mb-4">
                                                        <div className="flex items-center text-amber-600">
                                                            <FontAwesomeIcon icon={faMoneyBillWave} className="mr-2" />
                                                            <span className="font-semibold text-lg">
                                                                {booking.totalPrice ? `${booking.totalPrice} THB` : 'N/A'}
                                                            </span>
                                                        </div>
                                                    </div>

                                                    {/* Date Range */}
                                                    <div className="grid grid-cols-2 gap-4 mb-4">
                                                        <div className="bg-white p-3 rounded-lg shadow-sm">
                                                            <p className="text-xs text-gray-500 mb-1 flex items-center">
                                                                <FontAwesomeIcon icon={faCalendarAlt} className="mr-2 text-amber-600" />
                                                                Start Date
                                                            </p>
                                                            <p className="font-medium">
                                                                {formatDateTime(detail.startDate, { dateOnly: true })}
                                                            </p>
                                                        </div>
                                                        <div className="bg-white p-3 rounded-lg shadow-sm">
                                                            <p className="text-xs text-gray-500 mb-1 flex items-center">
                                                                <FontAwesomeIcon icon={faCalendarAlt} className="mr-2 text-amber-600" />
                                                                End Date
                                                            </p>
                                                            <p className="font-medium">
                                                                {formatDateTime(detail.endDate, { dateOnly: true })}
                                                            </p>
                                                        </div>
                                                    </div>

                                                    {/* Service Details */}
                                                    <div>
                                                        <h3 className="text-lg font-semibold text-gray-700 mb-3">Service Details</h3>
                                                        {detail.service && renderServiceDetails(detail.service)}
                                                    </div>
                                                </div>
                                            ))}
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
            }


        </div>
    );
}

export default BusinessBookingPage;

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
        <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-5 space-y-4">
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
                                        {renderTopicContent(service[topicField], topicField)}
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

const renderTopicContent = (content, topicField) => {
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
            {isDateTimeField(topicField) ? formatDateTime(content, { dateOnly: true }) : content}
        </div>
    );


};