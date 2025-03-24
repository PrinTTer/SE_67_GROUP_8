import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import huahinPoster from '../../assets/huahin_desktop.jpg';
import { fetchData } from "../../services/apiService";

const DetailPackage = () => {
  const { id } = useParams();
  const [packageData, setPackageData] = useState(null);
  const [selectedServices, setSelectedServices] = useState([]);

  useEffect(() => {
    const loadPackageDetail = async () => {
      try {
        const response = await fetchData(`/packages/${id}`);
        console.log("Response from API:", response);
        setPackageData(response);
        setSelectedServices(response.services.map((s) => s.serviceId)); // default: all selected
      } catch (error) {
        console.error("Error loading package detail:", error);
      }
    };
  
    loadPackageDetail();
  }, [id]);

  const toggleService = (serviceId) => {
    setSelectedServices((prev) =>
      prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  if (!packageData) return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="animate-pulse flex flex-col items-center">
        <div className="h-32 w-32 bg-gray-200 rounded-full mb-4"></div>
        <div className="text-gray-400 text-xl font-light">กำลังโหลดข้อมูล...</div>
      </div>
    </div>
  );

  const formattedDate = new Date(packageData.dateCreate).toLocaleDateString("th-TH", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
  
  const formattedPrice = new Intl.NumberFormat('th-TH', { 
    style: 'currency', 
    currency: 'THB',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(packageData.price);

  return (
    <div className="flex flex-col lg:flex-row bg-gray-50 min-h-screen">
      {/* Left Content */}
      <div className="w-full lg:w-3/4 p-6 lg:p-10">
        {/* Poster with gradient overlay */}
        <div className="relative rounded-2xl overflow-hidden shadow-lg mb-8">
          <img 
            src={huahinPoster} 
            alt="poster" 
            className="w-full h-auto object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          
          {/* Title overlay on image */}
          <div className="absolute bottom-0 left-0 p-8 w-full">
            <h1 className="text-4xl font-bold text-white mb-2 drop-shadow-lg">{packageData.title}</h1>
            <div className="flex items-center space-x-4">
              <p className="text-sm text-gray-200">{formattedDate}</p>
              <div className="h-4 w-px bg-gray-300"></div>
              <p className="text-sm font-medium bg-amber-500/90 text-white px-4 py-1 rounded-full">
                {formattedPrice} / คน
              </p>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
            <span className="w-1.5 h-8 bg-amber-500 mr-3 rounded-full"></span>
            รายละเอียดแพคเกจ
          </h2>
          
          <div className="whitespace-pre-line text-gray-700 leading-7 font-light">
            {packageData.description}
          </div>
        </div>
      </div>

      {/* Right SideBar */}
      <div className="w-full lg:w-1/4 p-6 lg:p-8 bg-white shadow-sm">
        <div className="sticky top-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
            <span className="w-1.5 h-8 bg-amber-500 mr-3 rounded-full"></span>
            บริการภายในแพคเกจ
          </h2>

          <div className="space-y-5">
            {packageData.services.map((service) => (
              <div key={service.serviceId} className="group">
                <div className="flex items-start space-x-3">
                  {/* Checkbox - Elegant Style */}
                  <div className="pt-1">
                    <div className="relative">
                      <input
                        type="checkbox"
                        id={`service-${service.serviceId}`}
                        checked={selectedServices.includes(service.serviceId)}
                        onChange={() => toggleService(service.serviceId)}
                        className="peer appearance-none h-5 w-5 rounded-sm border border-gray-300 checked:border-amber-500 checked:bg-amber-500 cursor-pointer transition-all duration-200"
                      />
                      <svg 
                        className="absolute top-0 left-0 h-5 w-5 text-white pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity duration-200" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24" 
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                  </div>

                  {/* Service Card */}
                  <div className="flex-1 bg-gray-50 group-hover:bg-gray-100 rounded-xl overflow-hidden transition-all duration-300 border border-gray-100">
                    {service.image ? (
                      <img
                        src={service.image}
                        alt={service.name}
                        className="w-full h-40 object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-40 flex items-center justify-center bg-gray-100 text-gray-400">
                        <svg className="w-12 h-12 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                        </svg>
                      </div>
                    )}
                    <div className="p-4">
                      <h3 className="text-lg font-medium text-gray-800 mb-1">{service.name}</h3>
                      <p className="text-sm text-gray-600 font-light">{service.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Buy Button */}
          <div className="mt-8 space-y-4">
            <div className="flex justify-between items-center text-lg border-t border-b border-gray-100 py-4">
              <span className="font-medium text-gray-800">ราคารวม</span>
              <span className="font-bold text-gray-900">{formattedPrice}</span>
            </div>
            
            <button className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-medium py-3 px-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center">
              <span>ซื้อแพคเกจเลย</span>
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </button>
            
            <p className="text-center text-xs text-gray-500 mt-2">การันตีราคาถูกที่สุด ไม่มีค่าใช้จ่ายแอบแฝง</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPackage;