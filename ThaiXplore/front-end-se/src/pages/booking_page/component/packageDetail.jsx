import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHotel, faCalendar, faCar, faUtensils } from '@fortawesome/free-solid-svg-icons';

const PackageDetail = (prop) => {
    const { item, category } = prop;
    
    // ตรวจสอบว่ามีข้อมูลใน item หรือไม่
    if (!item || typeof item !== 'object') {
        return <div>Error: Invalid package data</div>;
    }

    // ฟังก์ชันเพื่อแสดงชื่อของ category
    const getCategoryName = (category) => {
        switch(category) {
            case 'hotel': return 'Hotel';
            case 'event': return 'Event';
            case 'carRental': return 'Car Rental';
            case 'restaurant': return 'Restaurant';
            default: return 'Package';
        }
    };

    return (
        <div className="flex flex-1 flex-col w-full h-full bg-white border-r-2 border-gray-200 rounded-lg shadow-sm">
            {/* ส่วนหัว */}
            <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-white px-6 py-4">
                <div className="flex items-center">
                    <div className="flex items-center justify-center w-8 h-8 text-white mr-3">
                        {/* แสดงไอคอนของประเภท */}
                        <span className="text-xl">{category === 'hotel' ? <FontAwesomeIcon icon={faHotel} /> : null}</span>
                    </div>
                    <h2 className="text-xl font-bold">
                        {getCategoryName(category)} Details
                    </h2>
                </div>
            </div>

            {/* ส่วนแสดงข้อมูล */}
            <div className="flex-1 overflow-y-auto p-6">
                <div className="space-y-5">
                    {/* แสดงข้อมูลบางฟิลด์ */}
                    <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-4">
                        <div className="font-medium text-gray-700 mb-3">
                            Title
                        </div>
                        <div className="text-gray-600">
                            {item?.title || 'No title available'}
                        </div>
                    </div>

                    <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-4">
                        <div className="font-medium text-gray-700 mb-3">
                            Price
                        </div>
                        <div className="text-gray-600">
                            {item?.price ? `${item.price} THB` : 'Price not available'}
                        </div>
                    </div>

                    <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-4">
                        <div className="font-medium text-gray-700 mb-3">
                            Room Type
                        </div>
                        <div className="text-gray-600">
                            {item?.roomType || 'No room type available'}
                        </div>
                    </div>

                    {/* สามารถเพิ่มข้อมูลอื่นๆ ที่ต้องการแสดง */}
                </div>
            </div>

            {/* ส่วนท้าย */}
            <div className="border-t border-gray-100 px-6 py-4">
                <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                        {category === 'hotel' ? 'Room details' : 'Package details'}
                    </span>
                    <div className="text-sm font-medium text-amber-600">
                        ThaiXplore
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PackageDetail;
