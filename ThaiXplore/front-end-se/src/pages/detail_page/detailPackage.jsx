import huahinPoster from '../../assets/huahin_desktop.jpg';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

const DetailPackage = () => {
  const { id } = useParams(); // หากจะรับ id จาก route
  const [packageData, setPackageData] = useState(null);

  useEffect(() => {
    // mock data
    const mockData = {
      title: "Hua Hin Creation : ผ่อนคลาย สร้างสรรค์",
      date: "24 กุมภาพันธ์ 2568",
      description: `
        Hua Hin Creation : ผ่อนคลาย สร้างสรรค์
        จ.ประจวบคีรีขันธ์ (3 วัน 2 คืน)
        Theme
        - การสร้างทีมวิริค (Treasured Team Building)
        - กิจกรรมบรรยากาศชายหาด (Beach Bliss)
        
        วันที่ 1
        เริ่มต้นการเดินทางด้วย Welcome Drink จากเครื่องดื่มสมุนไพรสด รีเฟรชร่างกาย...
        
        วันที่ 2
        สนุกกับ Aqua Zumba, กิจกรรมเก็บขยะริมหาด, ปิดท้ายด้วย Campfire Sharing...

        วันที่ 3
        ปั้นปราสาททราย, team building, ปิดทริปด้วยอาหารทะเลแสนอร่อย
      `,
      services: [
        {
          name: "แอร์ สเปซ หัวหิน",
          description: "ร้านอาหารวิวทะเลชื่อดัง บรรยากาศดีเหมาะสำหรับกิจกรรมเปิดงาน"
        },
        {
          name: "อ่าวตะเกียบซีฟู้ด",
          description: "ร้านอาหารทะเลริมชายหาด บรรยากาศ Sea-to-Table"
        },
        {
          name: "Social Club Hua Hin",
          description: "สถานที่สำหรับ Team Building พร้อมพื้นที่กิจกรรม"
        }
      ]
    };

    setPackageData(mockData);
  }, []);

  if (!packageData) return <div>Loading...</div>;

  return (
    <div className="flex flex-5 w-full flex-col bg-gray-50 min-h-screen"> 
      {/* Image Poster */}
      <div className='p-6'>
        <img src={huahinPoster} alt="Package Poster" className="w-full h-auto object-cover" />
      </div>
      

      {/* Content */}
      <div className="max-w-5xl mx-auto p-6">
        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-800 mb-2">{packageData.title}</h1>
        <p className="text-sm text-gray-500 mb-6">{packageData.date}</p>

        {/* Description */}
        <div className="whitespace-pre-line text-gray-700 leading-7 mb-10">
          {packageData.description}
        </div>

        {/* Services */}
        <h2 className="text-2xl font-bold text-gray-800 mb-4">บริการที่รวมในแพคเกจ</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {packageData.services.map((item, index) => (
            <div key={index} className="bg-white shadow-md rounded-xl p-4">
              <h3 className="text-lg font-semibold text-amber-700">{item.name}</h3>
              <p className="text-gray-600 mt-1">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DetailPackage;
