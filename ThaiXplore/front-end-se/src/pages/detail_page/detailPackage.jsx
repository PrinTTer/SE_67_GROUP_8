import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import huahinPoster from '../../assets/huahin_desktop.jpg';
import { fetchData } from "../../services/apiService";

const DetailPackage = () => {
  const { id } = useParams();
  const [packageData, setPackageData] = useState(null);
  const [mergedServices, setMergedServices] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);

  useEffect(() => {
    const loadPackageAndBusinesses = async () => {
      try {
        const pkg = await fetchData(`/packages/${id}`);
        setPackageData(pkg);
        setSelectedServices(pkg.services.map((s) => s.serviceId));

        // ดึง businessId ทั้งหมดแบบ unique
        const businessIds = [...new Set(pkg.services.map(s => s.businessId))];

        // โหลด business แต่ละอัน
        const businessList = await Promise.all(
          businessIds.map(id => fetchData(`/businesses/${id}`))
        );

        // รวม service ทั้งหมดจากทุก business
        const allBusinessServices = businessList.flatMap(b =>
          b.services.map(s => ({
            ...s,
            businessId: b.business._id,
            businessName: b.business.businessName,
            businessCategory: b.business.category, // ดึงจาก b.business.category
          }))
        );

        // merge service จากแพคเกจกับรายละเอียดเต็ม
        const fullServices = pkg.services.map((s) => {
          const matched = allBusinessServices.find((b) => b._id === s.serviceId);
          return { ...s, ...matched };
        });
        console.log("fullServices", fullServices)
        setMergedServices(fullServices);
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };

    loadPackageAndBusinesses();
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

  // ฟังก์ชันแสดง service ตามประเภท
  const renderServiceByCategory = (service) => {
    switch (service.businessCategory) {
      case "hotel":
        return (
          <>
            <h3 className="text-lg font-semibold text-gray-800">{service.roomType}</h3>
            <p className="text-sm text-gray-600">ขนาดห้อง: {service.roomSize}</p>
            <p className="text-sm text-gray-600">รองรับ: {service.guestAmount} คน</p>
            {service.facilities?.length > 0 && (
              <ul className="text-sm text-gray-500 mt-1 list-disc list-inside">
                {service.facilities.map((f, i) => <li key={i}>{f}</li>)}
              </ul>
            )}
          </>
        );

      case "carRental":
        return (
          <>
            <h3 className="text-lg font-semibold text-gray-800">{service.carBrand}</h3>
            <p className="text-sm text-gray-600">ทะเบียน: {service.licensePlate}</p>
            <p className="text-sm text-gray-600">ที่นั่ง: {service.amountSeat} คน</p>
          </>
        );

      case "event":
        return (
          <>
            <h3 className="text-lg font-semibold text-gray-800">{service.ticketType || "บัตรเข้างาน"}</h3>
            <p className="text-sm text-gray-600">วันที่จัด: {new Date(service.eventDate).toLocaleDateString("th-TH")}</p>
            <p className="text-sm text-gray-600">
              เวลา: {new Date(service.start).toLocaleTimeString("th-TH")} - {new Date(service.end).toLocaleTimeString("th-TH")}
            </p>
          </>
        );

      case "restaurant":
      case "course":
        return (
          <>
            <h3 className="text-lg font-semibold text-gray-800">{service.courseName || "คอร์สทำอาหาร"}</h3>
            {service.menuList?.length > 0 && (
              <>
                <p className="text-sm text-gray-600 mb-1">เมนูที่เรียน:</p>
                <ul className="text-sm text-gray-500 list-disc list-inside">
                  {service.menuList.map((menu, i) => (
                    <li key={i}>{menu.name}</li>
                  ))}
                </ul>
              </>
            )}
          </>
        );

      default:
        return (
          <>
            <h3 className="text-lg font-semibold text-gray-800">ไม่ทราบประเภทบริการ</h3>
            <pre className="text-xs text-gray-400 mt-2">{JSON.stringify(service, null, 2)}</pre>
          </>
        );
    }
  };

  return (
    <div className="flex flex-col lg:flex-row bg-gray-50 min-h-screen">
      {/* Left Content */}
      <div className="w-full lg:w-3/4 p-6 lg:p-10">
        <div className="relative rounded-2xl overflow-hidden shadow-lg mb-8">
          <img src={huahinPoster} alt="poster" className="w-full h-auto object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
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
            {mergedServices.map((service) => (
              <div key={service.serviceId} className="group">
                <div className="flex items-start space-x-3">
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
                        fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                  </div>

                  <div className="flex-1 bg-gray-50 group-hover:bg-gray-100 rounded-xl overflow-hidden transition-all duration-300 border border-gray-100 p-4">
                    {renderServiceByCategory(service)}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 space-y-4">
            <div className="flex justify-between items-center text-lg border-t border-b border-gray-100 py-4">
              <span className="font-medium text-gray-800">ราคารวม</span>
              <span className="font-bold text-gray-900">{formattedPrice}</span>
            </div>
            <button className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-medium py-3 px-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center">
              <span>ซื้อแพคเกจเลย</span>
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
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
