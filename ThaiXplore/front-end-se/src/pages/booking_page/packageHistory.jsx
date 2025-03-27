import { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import { fetchData } from '../../services/apiService';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboardList, faImage } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import BookingDetail from './component/bookingDetail';

const PackageHistory = () => {
    const { user } = useSelector((state) => state.auth);  // ใช้ Redux store เพื่อดึงข้อมูลผู้ใช้
    const [packages, setPackages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // ส่ง package ที่ user ใช้ ไปยังหน้า booking
    const handlePackage = (thisPackage) => {
        const item = thisPackage
        const category = "package";
        const bookingDetail = {
            adult: "",
            bookingAmount: "",
            child : "",
            endDate : "",
            startDate : "",
            time : "",
        };
        console.log("Packages what I want to use: ",item ,category);
        navigate('/booking', { state: {item, category, bookingDetail} } );
    }


    useEffect(() => {
        if (user && user.packages) {
            const packageIds = user.packages.map(pkg => pkg.packageId);  // ดึง packageId ออกจาก user.package
            console.log("Package IDs: ", packageIds);  // แสดงผล packageIds ที่ดึงออกมา

            // หากต้องการใช้ packageId ไปดึงข้อมูลเพิ่มเติม
            const fetchPackageDetails = async () => {
                setLoading(true);
                setError(null);
                try {
                    const packageDetails = await Promise.all(
                        packageIds.map(async (packageId) => {
                            const packageData = await fetchData(`/packages/${packageId}`);  // เรียก API สำหรับแต่ละ packageId
                            return packageData;  // คืนค่าผลลัพธ์จากแต่ละการ fetch
                        })
                    );
                    setPackages(packageDetails); 
                } catch (error) {
                    setError("Failed to load package");
                    console.error("Error fetching package details:", error);
                } finally {
                    setLoading(false);
                }
            };

            fetchPackageDetails();  // เรียกใช้ fetchPackageDetails เพื่อดึงข้อมูล
        }
    }, [user]);
    console.log("User Details: ",user);
    console.log("Packages Details: ",packages);

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Header section with gradient */}
            <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-white px-6 py-4 rounded-t-lg mb-6">
                <div className="flex items-center">
                    <div className="flex items-center justify-center w-10 h-10 text-white mr-4">
                        <FontAwesomeIcon icon={faClipboardList} className="text-2xl" />
                    </div>
                    <h1 className="text-3xl font-bold">My Packages</h1>
                </div>
            </div>

            {/* Loading and Error States */}
            {loading && (
                <div className="text-center py-8">
                    <p className="text-gray-600 text-xl">Loading packages...</p>
                </div>
            )}

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                    <span className="block sm:inline">{error}</span>
                </div>
            )}

            {/* Packages Container */}
            <div className="space-y-6">
                {packages.length > 0 ? (
                    packages.map((pkg, index) => (
                        <div 
                            key={index} 
                            className="flex bg-white border border-gray-100 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
                        >
                            {/* Image Section */}
                            <div className="w-1/3 relative">
                                {pkg?.image ? (
                                    <img 
                                        src={pkg?.image} 
                                        alt={pkg?.name} 
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="flex flex-col items-center justify-center text-gray-400 h-full w-full">
                                        <FontAwesomeIcon icon={faImage} className="text-4xl mb-2" />
                                        <span className="text-sm">No picture</span>
                                    </div>
                                )}
                                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-3">
                                    <h2 className="text-xl font-semibold">
                                        {pkg?.title}
                                    </h2>
                                </div>
                            </div>

                            {/* Package Details Section */}
                            <div className="w-2/3 p-6">
                                {/* Package Status */}
                                <div className="flex justify-between items-center mb-4">
                                    <span 
                                        className={`px-3 py-1 rounded-full text-sm font-medium  
                                            ${user?.packages[index]?.status === 'used' ? 'bg-green-100 text-green-800' 
                                            : 'bg-red-100 text-red-800'}`}
                                    >
                                        {user?.packages[index]?.status.charAt(0).toUpperCase() + user?.packages[index]?.status.slice(1)}
                                    </span>
                                    {user?.packages[index]?.status === "unused" ? (
                                        <span 
                                            className={"px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-medium hover:cursor-pointer hover:bg-amber-200 hover:shadow-md"}
                                            onClick={()=>handlePackage(user?.packages[index])}
                                        >
                                            Use This Package
                                        </span>
                                    ) : (<div></div>)
                                    }
                                </div>

                                {/* Package Details */}
                                <div className="bg-gray-50 rounded-lg p-4 mb-4 border border-gray-200">
                                    <h3 className="text-lg font-medium text-gray-700">
                                        {pkg?.description}
                                    </h3>
                                    <div className="text-gray-600">
                                        <div className="flex justify-between">
                                            <p>Expiration Date: {new Date(user?.packages[index]?.expirationDate).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                    ))

                    
                ) : (
                    <div className="text-center py-8 bg-gray-50 rounded-lg">
                        <p className="text-gray-600 text-xl">No packages found.</p>
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

export default PackageHistory;
