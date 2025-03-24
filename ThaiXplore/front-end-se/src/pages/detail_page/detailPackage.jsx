import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import huahinPoster from '../../assets/huahin_desktop.jpg';
import { fetchData } from '../../services/apiService';

const DetailPackage = () => {
  const { id } = useParams();
  const [packageData, setPackageData] = useState(null);
  const [selectedServices, setSelectedServices] = useState([]);

  useEffect(() => {
    const fetchPackage = async () => {
      try {
        const detail = await fetchData(`packages/${id}`);
        setPackageData(detail);
        setSelectedServices(detail.services.map((s) => s.serviceId));
      } catch (error) {
        console.error("Error loading package:", error);
      }
    };
  
    fetchPackage();
  }, [id]);
  

  const toggleService = (serviceId) => {
    setSelectedServices((prev) =>
      prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  if (!packageData) return <div className="p-10">Loading...</div>;

  const formattedDate = new Date(packageData.dateCreate).toLocaleDateString("th-TH", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="flex flex-5 bg-gray-50 min-h-screen">
      {/* Left Content */}
      <div className="w-3/4 p-6">
        <img src={huahinPoster} alt="poster" className="w-full h-auto rounded-xl mb-6 shadow" />

        <h1 className="text-3xl font-bold text-gray-800 mb-2">{packageData.title}</h1>
        <p className="text-sm text-gray-500 mb-6">{formattedDate}</p>

        <div className="whitespace-pre-line text-gray-700 leading-7">
          {packageData.description || "ไม่มีรายละเอียด"}
        </div>

        <div>
          <p className="text-sm text-gray-500 mb-6">ราคา: {packageData.price} ต่อคน</p>
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="w-1/4 p-6 border-l border-gray-200 bg-white shadow-sm">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">บริการภายในแพคเกจ</h2>

        <div className="space-y-4">
          {packageData.services?.map((service) => (
            <div key={service.serviceId} className="flex items-start">
              <div className="flex flex-col lg:flex-row flex-1 rounded-lg overflow-hidden bg-white border border-gray-100 shadow-sm">
                <div className="lg:w-1/3 w-full overflow-hidden">
                  <div className="w-full h-32 lg:h-full flex items-center justify-center bg-gray-100 text-gray-500 text-sm">
                    No Image
                  </div>
                </div>

                <div className="p-4 lg:w-2/3">
                  <h3 className="text-lg font-bold text-gray-800 mb-1">
                    {service.name || `บริการ ${service.serviceId}`}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {service.description || "ไม่มีคำอธิบาย"}
                  </p>
                </div>
              </div>

              <div className="ml-3 mt-2">
                <input
                  type="checkbox"
                  checked={selectedServices.includes(service.serviceId)}
                  onChange={() => toggleService(service.serviceId)}
                  className="w-5 h-5 accent-amber-500"
                />
              </div>
            </div>
          ))}
        </div>

        <button className="mt-6 w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded-xl">
          ซื้อแพคเกจ
        </button>
      </div>
    </div>
  );
};

export default DetailPackage;
