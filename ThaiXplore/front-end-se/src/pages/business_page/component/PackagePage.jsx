import { useEffect, useState } from "react";
import {
  postData,
  fetchData,
  postDataWithFiles,
} from "../../../services/apiService";
import {
  faPlusCircle,
  faTimesCircle,
  faBox,
  faCalendarAlt,
  faTags,
  faFileAlt,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const PackageBlock = ({ businessId, userId }) => {
  const [packages, setPackages] = useState([
    { id: Date.now(), data: getEmptyPackage() },
  ]);
  const [quotations, setQuotations] = useState([]);
  const [serviceDetails, setServiceDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadQuotations = async () => {
      setIsLoading(true);
      try {
        const all = await fetchData("/quotations");
        const filtered = all.filter((q) => q.userId === userId);
        setQuotations(filtered);

        const businessIds = [...new Set(filtered.map((q) => q.toBusinessId))];
        const businesses = await Promise.all(
          businessIds.map((id) => fetchData(`/businesses/${id}`))
        );

        const servicesWithDetails = businesses.flatMap((b) =>
          b.services.map((s) => ({
            ...s,
            businessId: b.business._id,
            businessName: b.business.businessName,
            businessCategory: b.business.category,
          }))
        );
        setServiceDetails(servicesWithDetails);
      } catch (err) {
        console.error("Error fetching quotations or services:", err);
      } finally {
        setIsLoading(false);
      }
    };

    if (businessId && userId) loadQuotations();
  }, [businessId, userId]);

  const addPackage = () => {
    setPackages([...packages, { id: Date.now(), data: getEmptyPackage() }]);
  };

  const removePackage = (id) => {
    setPackages(packages.filter((pkg) => pkg.id !== id));
  };

  const updatePackageData = (id, newData) => {
    setPackages(
      packages.map((pkg) => (pkg.id === id ? { ...pkg, data: newData } : pkg))
    );
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const pkg = packages[0].data;

      const payload = {
        title: pkg.title,
        description: pkg.description,
        media: [],
        dateCreate: new Date().toISOString(),
        startDate: pkg.startDate,
        endDate: pkg.endDate,
        totalExpirationDate: pkg.totalExpirationDate,
        price: pkg.price,
        totalPackage: pkg.totalPackage,
        services: pkg.services.map((s) => ({
          quotationId: s.quotationId,
          serviceId: s.serviceId,
          businessId: s.businessId,
        })),
      };

      //POST สร้าง Package ก่อน
      const newPackage = await postData(
        `/businesses/${businessId}/packages`,
        payload
      );
      const packageId = newPackage._id;
      console.log("Package created:", packageId);

      //POST รูปภาพถ้ามี
      if (pkg.media && pkg.media.length > 0) {
        await postDataWithFiles(
          `/packages/${packageId}/images`,
          pkg.media,
          {}, // ไม่มีข้อมูลเสริมอื่น
          "services_packages" // title
        );
        console.log("รูปภาพถูกอัปโหลดแล้ว");
      }

      alert("ส่ง Package สำเร็จพร้อมรูปภาพ!");
    } catch (err) {
      console.error(err);
      alert("ส่ง Package ไม่สำเร็จ");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg border border-yellow-100">
      <div className="flex items-center mb-6 border-b border-yellow-200 pb-4">
        <FontAwesomeIcon
          icon={faBox}
          className="text-yellow-500 text-2xl mr-3"
        />
        <h2 className="text-2xl font-bold text-gray-800">จัดการแพ็คเกจ</h2>
      </div>

      <div
        className="flex items-center text-yellow-600 cursor-pointer mb-6 hover:text-yellow-700 transition-colors duration-200 bg-yellow-50 p-3 rounded-lg"
        onClick={addPackage}
      >
        <FontAwesomeIcon icon={faPlusCircle} className="mr-2" />
        <span className="font-medium">เพิ่มแพ็คเกจใหม่</span>
      </div>

      {isLoading ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">กำลังโหลดข้อมูล...</p>
        </div>
      ) : (
        packages.map((pkg) => (
          <PackageForm
            key={pkg.id}
            data={pkg.data}
            onChange={(newData) => updatePackageData(pkg.id, newData)}
            onRemove={() => removePackage(pkg.id)}
            quotationOptions={quotations}
            serviceDetails={serviceDetails}
          />
        ))
      )}

      <button
        onClick={handleSubmit}
        disabled={isLoading}
        className="mt-8 px-6 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 shadow-md transition-all duration-200 flex items-center justify-center w-full sm:w-auto"
      >
        <FontAwesomeIcon icon={faCheckCircle} className="mr-2" />
        {isLoading ? "กำลังส่งข้อมูล..." : "บันทึกแพ็คเกจทั้งหมด"}
      </button>
    </div>
  );
};

const getEmptyPackage = () => ({
  title: "",
  description: "",
  startDate: "",
  endDate: "",
  totalExpirationDate: 30,
  price: 0,
  totalPackage: 1,
  services: [],
  media: [],
});

const PackageForm = ({
  data,
  onChange,
  onRemove,
  quotationOptions,
  serviceDetails,
}) => {
  const [localData, setLocalData] = useState(data);
  const [isExpanded, setIsExpanded] = useState(true);

  const updateField = (key, value) => {
    const updated = { ...localData, [key]: value };
    setLocalData(updated);
    onChange(updated);
  };

  const addServiceFromDropdown = (serviceObj) => {
    updateField("services", [
      ...localData.services,
      {
        quotationId: serviceObj.quotationId,
        serviceId: serviceObj.serviceId,
        businessId: serviceObj.businessId,
      },
    ]);
  };

  const removeService = (index) => {
    updateField(
      "services",
      localData.services.filter((_, i) => i !== index)
    );
  };

  const allServices = quotationOptions.flatMap((q) =>
    q.servicesDetails.map((s) => {
      const matched = serviceDetails.find(
        (detail) => detail._id === s.serviceId
      );
      return {
        ...s,
        quotationId: q._id,
        toBusinessId: q.toBusinessId,
        ...matched,
      };
    })
  );

  return (
    <div className="bg-yellow-50 p-5 rounded-lg shadow-md mb-6 border border-yellow-200 transition-all duration-300">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-lg text-gray-800">
          {localData.title || "แพ็คเกจใหม่"}
        </h3>
        <div className="flex space-x-3">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-yellow-600 hover:text-yellow-800"
          >
            {isExpanded ? "ย่อ" : "ขยาย"}
          </button>
          <FontAwesomeIcon
            icon={faTimesCircle}
            className="text-red-500 text-xl cursor-pointer hover:text-red-700"
            onClick={onRemove}
          />
        </div>
      </div>

      {isExpanded && (
        <>
          {/* Input Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                ชื่อแพ็คเกจ
              </label>
              <input
                className="w-full p-2 border border-yellow-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                placeholder="ชื่อแพ็คเกจ"
                value={localData.title}
                onChange={(e) => updateField("title", e.target.value)}
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">
                ราคา
              </label>
              <input
                className="w-full p-2 border border-yellow-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                type="number"
                placeholder="ราคา"
                value={localData.price}
                onChange={(e) => updateField("price", e.target.value)}
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">
                จำนวน
              </label>
              <input
                className="w-full p-2 border border-yellow-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                type="number"
                placeholder="จำนวน"
                value={localData.totalPackage}
                onChange={(e) => updateField("totalPackage", e.target.value)}
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">
                อายุการใช้งาน (วัน)
              </label>
              <input
                className="w-full p-2 border border-yellow-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                type="number"
                placeholder="อายุการใช้งาน (วัน)"
                value={localData.totalExpirationDate}
                onChange={(e) =>
                  updateField("totalExpirationDate", e.target.value)
                }
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">
                วันที่เริ่มต้น
              </label>
              <input
                className="w-full p-2 border border-yellow-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                type="date"
                placeholder="วันที่เริ่มต้น"
                value={localData.startDate}
                onChange={(e) => updateField("startDate", e.target.value)}
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">
                วันที่สิ้นสุด
              </label>
              <input
                className="w-full p-2 border border-yellow-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                type="date"
                placeholder="วันที่สิ้นสุด"
                value={localData.endDate}
                onChange={(e) => updateField("endDate", e.target.value)}
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-gray-700 font-medium mb-1">
                รายละเอียดแพ็คเกจ
              </label>
              <textarea
                className="w-full p-2 border border-yellow-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent min-h-20"
                placeholder="รายละเอียดแพ็คเกจ"
                value={localData.description}
                onChange={(e) => updateField("description", e.target.value)}
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                อัพโหลดรูปภาพเเพ็คเกจ
              </label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) =>
                  updateField("media", Array.from(e.target.files))
                }
                className="w-full p-2 border border-yellow-200 rounded-lg"
              />
            </div>
          </div>

          {/* Dropdown Services */}
          <div className="mt-6 p-4 bg-white rounded-lg shadow-sm border border-yellow-100">
            <label className="font-bold flex items-center text-gray-700 mb-2">
              <FontAwesomeIcon
                icon={faPlusCircle}
                className="text-yellow-500 mr-2"
              />
              เพิ่มบริการจากใบเสนอราคา
            </label>
            <select
              className="w-full p-3 border border-yellow-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent bg-white"
              onChange={(e) => {
                const selected = allServices.find(
                  (s) => s.serviceId === e.target.value
                );
                if (selected) addServiceFromDropdown(selected);
              }}
            >
              <option value="">-- เลือกบริการ --</option>
              {allServices.map((s, index) => (
                <option key={index} value={s.serviceId}>
                  [{s.businessCategory}] {renderServiceByCategory(s)}
                </option>
              ))}
            </select>
          </div>

          {/* Selected Services */}
          <div className="mt-6 p-4 bg-white rounded-lg shadow-sm border border-yellow-100">
            <h4 className="font-bold text-gray-700 mb-3 flex items-center">
              <FontAwesomeIcon
                icon={faCheckCircle}
                className="text-yellow-500 mr-2"
              />
              บริการที่เลือกแล้ว
            </h4>

            {localData.services.length === 0 ? (
              <p className="text-gray-500 italic">ยังไม่มีบริการที่เลือก</p>
            ) : (
              <div className="space-y-2">
                {localData.services.map((s, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-yellow-50 rounded-md border border-yellow-100"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-medium">
                        {findServiceName(s.serviceId, allServices)}
                      </p>
                      <FontAwesomeIcon
                        icon={faTimesCircle}
                        className="text-red-500 cursor-pointer hover:text-red-700"
                        onClick={() => removeService(idx)}
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm">
                      <div className="p-2 bg-white rounded border border-yellow-100">
                        <span className="font-semibold">Service ID:</span>
                        <div className="text-gray-700 break-all mt-1">
                          {s.serviceId}
                        </div>
                      </div>
                      <div className="p-2 bg-white rounded border border-yellow-100">
                        <span className="font-semibold">Business ID:</span>
                        <div className="text-gray-700 break-all mt-1">
                          {s.businessId}
                        </div>
                      </div>
                      <div className="p-2 bg-white rounded border border-yellow-100">
                        <span className="font-semibold">Quotation ID:</span>
                        <div className="text-gray-700 break-all mt-1">
                          {s.quotationId}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

// Helper function to find service name from ID
const findServiceName = (serviceId, allServices) => {
  const service = allServices.find((s) => s.serviceId === serviceId);
  if (!service) return "ไม่พบชื่อบริการ";
  return `บริการ: ${renderServiceByCategory(service)}`;
};

const renderServiceByCategory = (service) => {
  const category = service.businessCategory;
  if (!category) return "ไม่ทราบประเภท";

  switch (category) {
    case "hotel":
      return `ห้อง ${service.roomType} (${service.guestAmount} คน)`;
    case "carRental":
      return `รถ ${service.carBrand} (${service.amountSeat} ที่นั่ง)`;
    case "event":
      return `บัตร ${service.ticketType} - วันที่ ${new Date(
        service.eventDate
      ).toLocaleDateString("th-TH")}`;
    case "restaurant":
    case "course":
      return `คอร์ส ${service.courseName || "ไม่ระบุชื่อ"}`;
    default:
      return `ID: ${service._id}`;
  }
};
