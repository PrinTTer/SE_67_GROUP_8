import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faBoxArchive } from '@fortawesome/free-solid-svg-icons';

const PackageDetail = (prop) => {
    const { item, category } = prop;
    const services = item?.services;
    console.log("item in package",item);
    const formatFieldName = (field) => {
        return field
            .charAt(0).toUpperCase() + 
            field.slice(1).replace(/([A-Z])/g, ' $1');
    };

    return (
        <div className="flex flex-col w-full h-full bg-white rounded-lg shadow-md overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-white px-6 py-4 flex items-center space-x-3">
                <div className="w-8 h-8 flex items-center justify-center">
                    <FontAwesomeIcon icon={faBoxArchive} className="text-xl" />
                </div>
                <h2 className="text-xl font-bold tracking-wide">
                    {category} Details
                </h2>
            </div>

            {/* Content */}
            <div className="flex-grow overflow-y-auto p-6">
                <div className="space-y-6">
                    {services?.map((service, serviceIndex) => {
                        const matchedFields = findAllServiceFields(service);
                        console.log(services);
                        const topicFields = getTopic(matchedFields[0]);

                        return (
                            <div 
                                key={serviceIndex} 
                                className="bg-white rounded-lg border border-gray-100 shadow-sm p-5 space-y-4"
                            >
                                {matchedFields.map((field) => {
                                    const imagePath = `http://localhost:3000/public/uploads/services/${checkService(field)}/${service?.media?.[0]}`;
                                    const formattedLabel = formatFieldLabel(field);
                                    
                                    return (
                                        <div key={field} className="space-y-3">
                                            {/* Image Section */}
                                            {service.media?.[0] ? (
                                                <img 
                                                    src={imagePath}
                                                    alt={formattedLabel}
                                                    className="w-full h-48 object-cover rounded-lg transition-transform duration-300 hover:scale-[1.02]"
                                                />
                                            ) : (
                                                <div className="flex flex-col items-center justify-center text-gray-400 h-48 w-full border-2 border-dashed border-gray-200 rounded-lg">
                                                    <FontAwesomeIcon icon={faImage} className="text-4xl mb-2" />
                                                    <span className="text-sm">No picture available</span>
                                                </div>
                                            )}

                                            {/* Main Field */}
                                            <div className="text-gray-700 font-semibold">
                                                <span className="text-amber-600 mr-2">•</span>
                                                {formattedLabel}: {service[field]}
                                            </div>

                                            {/* Additional Topics */}
                                            <div className="space-y-3">
                                                {topicFields.map((topicField, topicIndex) => (
                                                    topicField !== 'price' && (
                                                        <div 
                                                            key={topicIndex} 
                                                            className="bg-gray-50 rounded-lg p-4 transition-all duration-200 hover:bg-gray-100"
                                                        >
                                                            <div className="text-sm font-medium text-gray-600 mb-2">
                                                                {formatFieldName(topicField)}
                                                            </div>
                                                            
                                                            {renderTopicContent(service[topicField])}
                                                        </div>
                                                    )
                                                ))}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Footer */}
            <div className="border-t border-gray-100 px-6 py-4 flex items-center justify-between">
                <span className="text-sm text-gray-500">
                    {category === 'hotel' ? 'Room Details' : 'Package Details'}
                </span>
                <div className="text-sm font-medium text-amber-600">
                    ThaiXplore
                </div>
            </div>
        </div>
    );
};

// Helper function to render topic content
const renderTopicContent = (content) => {
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
            {content}
        </div>
    );
};

export default PackageDetail;

// Other utility functions remain the same as in the original code
function findAllServiceFields(service) {
    const fieldsToCheck = ['roomType', 'ticketType', 'carBrand', 'courseName'];
    return fieldsToCheck.filter((field) => field in service);
}

const checkService = (categoryForImage) => {
    const categoryMap = {
        'roomType': 'rooms',
        'carBrand': 'cars',
        'courseName': 'courses',
        'ticketType': 'events'
    };
    return categoryMap[categoryForImage] || 'others';
}

const getTopic = (category) => {
    const topicMap = {
        'roomType': ['roomType', 'guestAmount', 'roomSize', 'price', 'facilities'],
        'ticketType': ['ticketType', 'price', 'eventDate', 'start', 'end'],
        'carBrand': ['carBrand', 'amountSeat', 'price'],
        'courseName': ['courseName', 'menuList', 'price']
    };
    return topicMap[category] || [];
};

const formatFieldLabel = (field) => {
    return field
        .replace(/([A-Z])/g, ' $1')
        .replace(/^./, str => str.toUpperCase());
}