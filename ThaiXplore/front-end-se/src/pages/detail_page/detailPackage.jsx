import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import huahinPoster from '../../assets/huahin_desktop.jpg';

const DetailPackage = () => {
  const { id } = useParams();
  const [packageData, setPackageData] = useState(null);
  const [selectedServices, setSelectedServices] = useState([]);

  useEffect(() => {
    // จำลองข้อมูลที่ดึงจาก backend
    const mockDetail = {
      _id: "67b359a71fa8b571d84ac218",
      title: "Hua Hin Creation : ผ่อนคลาย สร้างสรรค์",
      description: `Hua Hin Creation : ผ่อนคลาย สร้างสรรค์\nจ.ประจวบคีรีขันธ์ (3 วัน 2 คืน)\nTheme\n- การสร้างทีมวิริค (Treasured Team Building)\n- กิจกรรมบรรยากาศชายหาด (Beach Bliss)\n\nวันที่ 1\nเริ่มต้นการเดินทางด้วย Welcome Drink จากเครื่องดื่มสมุนไพรสด รีเฟรชร่างกาย...\n\nวันที่ 2\nสนุกกับ Aqua Zumba, กิจกรรมเก็บขยะริมหาด, ปิดท้ายด้วย Campfire Sharing...\n\nวันที่ 3\nปั้นปราสาททราย, team building, ปิดทริปด้วยอาหารทะเลแสนอร่อย`,
      dateCreate: "2025-02-17T15:45:43.169Z",
      price: 10000,
      services: [
        {
          quotationId: "quote_001",
          serviceId: "67a1",
          businessId: "biz_001",
          name: "แอร์ สเปซ หัวหิน",
          description: "ร้านอาหารวิวทะเล บรรยากาศดี เหมาะกับการจัดเลี้ยง"
        },
        {
          quotationId: "quote_002",
          serviceId: "67a2",
          businessId: "biz_002",
          name: "อ่าวตะเกียบซีฟู้ด",
          description: "อาหารทะเลสด ริมชายหาด บรรยากาศดี"
        },
        {
          quotationId: "quote_003",
          serviceId: "67a3",
          businessId: "biz_003",
          name: "Social Club Hua Hin",
          description: "กิจกรรม team building พร้อมเครื่องเสียง"
        }
      ]
    };

    setPackageData(mockDetail);
    setSelectedServices(mockDetail.services.map((s) => s.serviceId)); // default: all selected
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
    year: "numeric"
  });

  return (
    <div className="flex flex-5 bg-gray-50 min-h-screen">
      {/* Left Content */}
      <div className="w-3/4 p-6">
        {/* Poster */}
        <img src={huahinPoster} alt="poster" className="w-full h-auto rounded-xl mb-6 shadow" />

        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-800 mb-2">{packageData.title}</h1>
        <p className="text-sm text-gray-500 mb-6">{formattedDate}</p>

        {/* Description */}
        <div className="whitespace-pre-line text-gray-700 leading-7">
          {packageData.description}
        </div>

        <div>
        <p className="text-sm text-gray-500 mb-6">ราคา: {packageData.price} ต่อคน</p>
        </div>
        

      </div>

      {/* Right SideBar */}
<div className="w-1/4 p-6 border-l border-gray-200 bg-white shadow-sm">
  <h2 className="text-xl font-semibold text-gray-800 mb-4">บริการภายในแพคเกจ</h2>

  <div className="space-y-4">
    {packageData.services.map((service) => (
      <div key={service.serviceId} className="flex items-start">
        {/* กล่องข้อมูลบริการ */}
        <div className="flex flex-col lg:flex-row flex-1 rounded-lg overflow-hidden bg-white border border-gray-100 shadow-sm">
          {/* รูปภาพ */}
          <div className="lg:w-1/3 w-full overflow-hidden">
            {service.image ? (
              <img
                src={service.image}
                alt={service.name}
                className="w-full h-32 lg:h-full object-cover transition-transform duration-700 hover:scale-110"
              />
            ) : (
              <div className="w-full h-32 lg:h-full flex items-center justify-center bg-gray-100 text-gray-500 text-sm">
                No Image
              </div>
            )}
          </div>

          {/* ข้อความ */}
          <div className="p-4 lg:w-2/3">
            <h3 className="text-lg font-bold text-gray-800 mb-1">
              {service.name}
            </h3>
            <p className="text-sm text-gray-600">{service.description}</p>
          </div>
        </div>

        {/* Checkbox */}
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

  {/* ปุ่มซื้อแพคเกจ */}
  <button className="mt-6 w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded-xl">
    ซื้อแพคเกจ
  </button>
</div>

    </div>
  );
};

export default DetailPackage;
