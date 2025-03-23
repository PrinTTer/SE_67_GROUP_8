import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHotel, faCalendar, faCar, faUtensils } from '@fortawesome/free-solid-svg-icons';
const BookingDetail = (prop) => {
    const {item, category} = prop;
    console.log(item);
    let Topic = [] ;
    Topic = getTopic(category);
    
    // Get icon based on category similar to the navbar
    const getCategoryIcon = (category) => {
        switch(category) {
            case 'hotel': return <FontAwesomeIcon icon={faHotel} />;
            case 'event': return <FontAwesomeIcon icon={faCalendar} />;
            case 'carRental': return <FontAwesomeIcon icon={faCar} />;
            case 'restaurant': return <FontAwesomeIcon icon={faUtensils} />;
            default: return '📋';
        }
    };

    // Format field name for display
    const formatFieldName = (field) => {
        return field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1');
    };

    // Get category display name
    const getCategoryName = (category) => {
        switch(category) {
            case 'hotel': return 'Hotel';
            case 'event': return 'Event';
            case 'carRental': return 'Car Rental';
            case 'restaurant': return 'Restaurant';
            default: return 'Booking';
        }
    };

    return(
        <div className="flex flex-1 flex-col w-full h-full bg-white border-r-2 border-gray-200 rounded-lg shadow-sm">
            {/* Header section with background color */}
            <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-white px-6 py-4">
                <div className="flex items-center">
                    <div className="flex items-center justify-center w-8 h-8 text-white mr-3">
                        <span className="text-xl">{getCategoryIcon(category)}</span>
                    </div>
                    <h2 className="text-xl font-bold">
                        {getCategoryName(category)} Details
                    </h2>
                </div>
            </div>
            
            {/* Content section */}
            <div className="flex-1 overflow-y-auto p-6">
                <div className="space-y-5">
                    {Topic.map((field, index) => (
                        <div key={index} className="bg-white rounded-lg border border-gray-100 shadow-sm p-4 
                                                   transition-all duration-200 hover:shadow-md">
                            <div className="font-medium text-gray-700 mb-3">
                                {formatFieldName(field)}
                            </div>  
                            {Array.isArray(item[field]) ? (
                                <ul className="grid grid-cols-2 gap-3">
                                    {item[field].map((value, i) => (
                                        typeof value === "object" ? (
                                            <li key={i} className="flex items-center gap-2">
                                                <div className="w-1.5 h-1.5 rounded-full bg-amber-500"></div>
                                                <span className="text-gray-600">{value.name}</span>
                                            </li>
                                        ) : (
                                            <li key={i} className="flex items-center gap-2">
                                                <div className="w-1.5 h-1.5 rounded-full bg-amber-500"></div>
                                                <span className="text-gray-600">{value}</span>
                                            </li>
                                        )
                                    ))}
                                </ul>
                            ) : (
                                <div className={`${field === 'price' ? 'font-semibold text-amber-600' : 'text-gray-600'}`}>
                                    {field === 'price' ? `${item[field]} THB` : item[field]}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
            
            {/* Footer section */}
            <div className="border-t border-gray-100 px-6 py-4">
                <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                        {category === 'hotel' ? 'Room details' : 
                         category === 'event' ? 'Event information' : 
                         category === 'carRental' ? 'Vehicle details' : 
                         category === 'restaurant' ? 'Dining information' : 'Booking details'}
                    </span>
                    <div className="text-sm font-medium text-amber-600">
                        ThaiXplore
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BookingDetail;

const getTopic = (category) => {
    let List = [];
    if(category === 'hotel'){
        List = ['roomType', 'guestAmount', 'roomSize', 'price', 'facilities'];
    }
    else if (category === 'event'){
        List = ['ticketType', 'price', 'eventDate', 'start', 'end'];
    }
    else if (category === 'carRental'){
        List = ['carBrand',  'amountSeat', 'price'];
    }
    else if (category === 'restaurant'){
        List = ['courseName', 'menuList', 'price'];
    }
    return List;
};