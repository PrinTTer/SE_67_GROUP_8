// src/components/PackageBlock.jsx
import { useEffect, useState } from "react";
import {
  fetchData,
  postData,
  putData,
  deleteData,
  postDataWithFiles,
} from "../../../services/apiService";
import {
  faPlusCircle,
  faTimesCircle,
  faBox,
  faTrash,
  faSave,
  faImage,
  faCheckCircle,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const PackageBlock = ({ businessId, userId }) => {
  const [packages, setPackages] = useState([]);
  const [quotations, setQuotations] = useState([]);
  const [serviceDetails, setServiceDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(null);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [packagesPerPage] = useState(3); // Show 3 packages per page

  const generateTempId = () =>
    "temp_" + Math.random().toString(36).substring(2, 10);

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
    existingMedia: [],
  });

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        // 1. ดึง services ของตัวเอง
        const userServices = await fetchData(`/users/${userId}/services`);
        const mappedUserServices = userServices.map((s) => ({
          ...s,
          businessId: s.businessId,
          businessCategory: s.category,
          serviceId: s._id,
          isOwnService: true,
        }));
        console.log(mappedUserServices);
  
        // 2. ดึง quotations ที่ user เป็นคนขอ
        const allQuotations = await fetchData("/quotations");
        const userQuotations = allQuotations.filter((q) => q.userId === userId);
        setQuotations(userQuotations);
  
        // 3. ดึง businesses จาก quotations เหล่านั้น
        const businessIds = [
          ...new Set(userQuotations.map((q) => q.toBusinessId)),
        ];
        const businesses = await Promise.all(
          businessIds.map((id) => fetchData(`/businesses/${id}`))
        );
  
        // 4. สร้างรายการ services จาก quotations
        const quotationServices = businesses.flatMap((b) =>
          b.services.map((s) => ({
            ...s,
            businessId: b.business._id,
            businessCategory: b.business.category,
            businessName: b.business.businessName,
          }))
        );
  
        // ✅ 5. รวมทั้ง services ของตัวเองและจาก quotation
        const combinedServices = [...quotationServices, ...mappedUserServices];
        setServiceDetails(combinedServices);
  
        // 6. โหลด packages
        const pkgRes = await fetchData(`/packages/business/${businessId}`);
        const pkgMapped = pkgRes.map((pkg) => ({
          id: pkg._id,
          data: {
            ...pkg,
            media: [],
            existingMedia: pkg.media || [],
          },
        }));
        setPackages(
          pkgMapped.length > 0
            ? pkgMapped
            : [{ id: generateTempId(), data: getEmptyPackage() }]
        );
      } catch (err) {
        console.error(err);
        alert("Failed to load data");
      } finally {
        setIsLoading(false);
      }
    };
  
    if (businessId && userId) loadData();
  }, [businessId, userId]);
  

  const updatePackageData = (id, newData) => {
    setPackages((prev) =>
      prev.map((pkg) => (pkg.id === id ? { ...pkg, data: newData } : pkg))
    );
  };

  const handleSave = async (pkgId, data, updateIdCallback) => {
    setSaveLoading(pkgId);
    const payload = {
      title: data.title,
      description: data.description,
      media: data.existingMedia || [],
      dateCreate: data.dateCreate || new Date().toISOString(),
      startDate: data.startDate,
      endDate: data.endDate,
      totalExpirationDate: data.totalExpirationDate,
      price: data.price,
      totalPackage: data.totalPackage,
      services: data.services.map((s) => {
        const item = {
          serviceId: s.serviceId,
          businessId: s.businessId,
        };
        if (s.quotationId) {
          item.quotationId = s.quotationId;
        }
        return item;
      }),
    };

    try {
      let packageId = data._id;
      const isExisting =
        typeof packageId === "string" && packageId.length === 24;

      if (isExisting) {
        await putData(`/packages/${packageId}`, payload);
      } else {
        const created = await postData(
          `/businesses/${businessId}/packages`,
          payload
        );
        packageId = created._id;
        updateIdCallback(packageId);
      }

      if (data.media && data.media.length > 0) {
        await postDataWithFiles(
          `/packages/${packageId}/images`,
          data.media,
          {},
          "services_packages"
        );

        const updatedPackage = await fetchData(`/packages/${packageId}`);
        updateIdCallback(packageId, updatedPackage.media);
      }

      alert("Package saved successfully");
    } catch (err) {
      console.error(err);
      alert("Save failed: " + (err.message || "Unknown error"));
    } finally {
      setSaveLoading(null);
    }
  };

  const handleDeletePackage = async (id) => {
    if (!window.confirm("Are you sure you want to delete this package?"))
      return;
    try {
      await deleteData(`/packages/${id}`);
      setPackages((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  const handleDeleteImage = async (packageId, imagePath, index) => {
    try {
      await deleteData(`/packages/${packageId}/images/${index}`);
      const updated = packages.map((pkg) =>
        pkg.id === packageId
          ? {
              ...pkg,
              data: {
                ...pkg.data,
                existingMedia: pkg.data.existingMedia.filter(
                  (path) => path !== imagePath
                ),
              },
            }
          : pkg
      );
      setPackages(updated);
    } catch (err) {
      console.error(err);
      alert("Failed to delete image");
    }
  };

  const userOwnedServices = serviceDetails.filter((s) => s.isOwnService);

const allServices = [
  // From quotations
  ...quotations.flatMap(
    (q) =>
      q.servicesDetails?.map((s) => {
        const matched = serviceDetails.find(
          (detail) => detail._id === s.serviceId
        );
        return {
          ...s,
          quotationId: q._id,
          ...matched,
        };
      }) || []
  ),
  // From own services
  ...userOwnedServices,
];

  // Get current packages for pagination
  const indexOfLastPackage = currentPage * packagesPerPage;
  const indexOfFirstPackage = indexOfLastPackage - packagesPerPage;
  const currentPackages = packages.slice(
    indexOfFirstPackage,
    indexOfLastPackage
  );
  const totalPages = Math.ceil(packages.length / packagesPerPage);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  // Add new package handler with page navigation
  const handleAddNewPackage = () => {
    const newPackage = { id: generateTempId(), data: getEmptyPackage() };
    setPackages([...packages, newPackage]);
    // Navigate to the last page to see the new package
    setCurrentPage(Math.ceil((packages.length + 1) / packagesPerPage));
  };

  return (
    <div className="p-8 bg-white rounded-xl shadow-lg border border-yellow-100">
      <div className="flex items-center mb-8 pb-4 border-b border-yellow-200">
        <FontAwesomeIcon
          icon={faBox}
          className="text-yellow-500 text-2xl mr-4"
        />
        <h2 className="text-2xl font-bold text-gray-800">Manage Packages</h2>
      </div>

      <button
        className="flex items-center mb-8 bg-yellow-50 text-yellow-600 px-6 py-4 rounded-lg shadow-sm hover:bg-yellow-100 transition-colors duration-200"
        onClick={handleAddNewPackage}
      >
        <FontAwesomeIcon icon={faPlusCircle} className="mr-3" />
        <span className="font-medium">Create New Package</span>
      </button>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-16 bg-gray-50 rounded-xl">
          <div className="animate-spin h-12 w-12 border-b-2 border-yellow-500 rounded-full mb-4" />
          <p className="text-gray-600 font-medium">Loading packages...</p>
        </div>
      ) : (
        <>
          {currentPackages.map((pkg) => (
            <div
              key={pkg.id}
              className="mb-10 rounded-xl overflow-hidden bg-white border border-gray-100 shadow-md"
            >
              {/* Package Header */}
              <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 px-6 py-4 flex justify-between items-center text-white">
                <h3 className="font-bold text-lg">
                  {pkg.data.title || "New Package"}
                </h3>
                <button
                  className="text-white bg-red-500 hover:bg-red-600 rounded-full p-2 transition-colors duration-200"
                  onClick={() =>
                    pkg.id.startsWith("temp_")
                      ? setPackages(packages.filter((p) => p.id !== pkg.id))
                      : handleDeletePackage(pkg.id)
                  }
                >
                  <FontAwesomeIcon icon={faTrash} className="w-4 h-4" />
                </button>
              </div>

              {/* Package Content */}
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {[
                    { label: "Package Name", key: "title", type: "text" },
                    { label: "Price", key: "price", type: "number" },
                    { label: "Quantity", key: "totalPackage", type: "number" },
                    {
                      label: "Validity (days)",
                      key: "totalExpirationDate",
                      type: "number",
                    },
                    { label: "Start Date", key: "startDate", type: "date" },
                    { label: "End Date", key: "endDate", type: "date" },
                  ].map((f, idx) => (
                    <div key={idx} className="space-y-2">
                      <label className="text-gray-700 font-medium block">
                        {f.label}
                      </label>
                      <input
                        type={f.type}
                        className="w-full p-3 border border-yellow-200 rounded-lg focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 outline-none transition-all duration-200"
                        value={pkg.data[f.key]}
                        onChange={(e) =>
                          updatePackageData(pkg.id, {
                            ...pkg.data,
                            [f.key]: e.target.value,
                          })
                        }
                      />
                    </div>
                  ))}

                  <div className="md:col-span-2 space-y-2">
                    <label className="text-gray-700 font-medium block">
                      Description
                    </label>
                    <textarea
                      className="w-full p-3 border border-yellow-200 rounded-lg focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 outline-none transition-all duration-200 min-h-[120px]"
                      value={pkg.data.description}
                      onChange={(e) =>
                        updatePackageData(pkg.id, {
                          ...pkg.data,
                          description: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                {/* Image Upload Section */}
                <div className="bg-yellow-50 p-6 rounded-lg mb-8">
                  <div className="flex items-center mb-4">
                    <FontAwesomeIcon
                      icon={faImage}
                      className="text-yellow-500 mr-2"
                    />
                    <h4 className="text-lg font-medium text-gray-800">
                      Package Images
                    </h4>
                  </div>

                  <div className="space-y-2 mb-6">
                    <label className="inline-block bg-yellow-500 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-yellow-600 transition-colors duration-200">
                      <span>Select Images</span>
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        className="hidden"
                        onChange={(e) =>
                          updatePackageData(pkg.id, {
                            ...pkg.data,
                            media: Array.from(e.target.files),
                          })
                        }
                      />
                    </label>
                    <p className="text-sm text-gray-500">
                      Upload high-quality images to showcase your package
                    </p>
                  </div>

                  {/* Existing Images */}
                  {pkg.data._id &&
                    pkg.data.existingMedia &&
                    pkg.data.existingMedia.length > 0 && (
                      <div className="mb-6">
                        <h5 className="font-medium text-gray-700 mb-3 flex items-center">
                          <FontAwesomeIcon
                            icon={faCheckCircle}
                            className="text-yellow-500 mr-2"
                          />
                          Existing Images
                        </h5>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                          {pkg.data.existingMedia.map((img, idx) => (
                            <div key={idx} className="relative group">
                              <div className="aspect-square overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
                                <img
                                  src={`http://localhost:3000/public/uploads/services/packages/${img}`}
                                  className="object-cover w-full h-full"
                                  alt={`Package image ${idx + 1}`}
                                />
                              </div>
                              <button
                                onClick={() =>
                                  handleDeleteImage(pkg.data._id, img, idx + 1)
                                }
                                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-md"
                                title="Delete image"
                              >
                                <FontAwesomeIcon
                                  icon={faTimesCircle}
                                  className="w-4 h-4"
                                />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                  {/* New Images Preview */}
                  {pkg.data.media && pkg.data.media.length > 0 && (
                    <div>
                      <h5 className="font-medium text-gray-700 mb-3 flex items-center">
                        <FontAwesomeIcon
                          icon={faPlusCircle}
                          className="text-yellow-500 mr-2"
                        />
                        New Images to Upload
                      </h5>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {Array.from(pkg.data.media).map((file, idx) => (
                          <div key={idx} className="relative group">
                            <div className="aspect-square overflow-hidden rounded-lg border border-yellow-200 bg-white shadow-sm">
                              <img
                                src={URL.createObjectURL(file)}
                                className="object-cover w-full h-full"
                                alt={`New image ${idx + 1}`}
                              />
                            </div>
                            <button
                              onClick={() =>
                                updatePackageData(pkg.id, {
                                  ...pkg.data,
                                  media: Array.from(pkg.data.media).filter(
                                    (_, i) => i !== idx
                                  ),
                                })
                              }
                              className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-md"
                              title="Remove from upload"
                            >
                              <FontAwesomeIcon
                                icon={faTimesCircle}
                                className="w-4 h-4"
                              />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Services Section */}
                <div className="bg-yellow-50 p-6 rounded-lg mb-8">
                  <h4 className="text-lg font-medium text-gray-800 mb-4">
                    Package Services
                  </h4>

                  <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-2">
                      Add Services to Package
                    </label>
                    <select
                      className="w-full p-3 border border-yellow-200 rounded-lg focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 outline-none transition-all duration-200"
                      onChange={(e) => {
                        const selected = allServices.find(
                          (s) => s.serviceId === e.target.value
                        );
                        if (selected) {
                          updatePackageData(pkg.id, {
                            ...pkg.data,
                            services: [
                              ...pkg.data.services,
                              {
                                quotationId: selected.quotationId,
                                serviceId: selected.serviceId,
                                businessId: selected.businessId,
                              },
                            ],
                          });
                        }
                      }}
                    >
                      <option value="">-- Select a service --</option>
                      {allServices.map((s, i) => (
                        <option key={i} value={s.serviceId}>
                          [{s.businessCategory}] {renderServiceName(s)}
                          {s.quotationId
                            ? " (from quotation)"
                            : " (your own service)"}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Selected Services */}
                  {pkg.data.services.length > 0 && (
                    <div className="space-y-3">
                      <h5 className="font-medium text-gray-700">
                        Selected Services
                      </h5>
                      {pkg.data.services.map((s, i) => {
                        const serviceDetail =
                          allServices.find(
                            (detail) => detail.serviceId === s.serviceId
                          ) || {};

                        return (
                          <div
                            key={i}
                            className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm"
                          >
                            <div className="flex justify-between">
                              <div className="font-medium text-yellow-600">
                                {renderServiceName(serviceDetail)}
                              </div>
                              <button
                                onClick={() =>
                                  updatePackageData(pkg.id, {
                                    ...pkg.data,
                                    services: pkg.data.services.filter(
                                      (_, idx) => idx !== i
                                    ),
                                  })
                                }
                                className="text-red-500 hover:text-red-700 transition-colors duration-200"
                              >
                                <FontAwesomeIcon
                                  icon={faTimesCircle}
                                  className="mr-1"
                                />
                                <span className="text-sm">Remove</span>
                              </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-2 text-xs text-gray-600">
                              <div className="bg-gray-50 p-2 rounded">
                                <span className="font-semibold block">
                                  Service ID:
                                </span>
                                <div className="truncate">{s.serviceId}</div>
                              </div>
                              <div className="bg-gray-50 p-2 rounded">
                                <span className="font-semibold block">
                                  Business ID:
                                </span>
                                <div className="truncate">{s.businessId}</div>
                              </div>
                              <div className="bg-gray-50 p-2 rounded">
                                <span className="font-semibold block">
                                  Quotation ID:
                                </span>
                                <div className="truncate">{s.quotationId}</div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Save Button */}
                <div className="flex justify-end">
                  <button
                    onClick={() =>
                      handleSave(pkg.id, pkg.data, (newId, updatedMedia) => {
                        setPackages((prev) =>
                          prev.map((p) =>
                            p.id === pkg.id
                              ? {
                                  ...p,
                                  id: newId,
                                  data: {
                                    ...p.data,
                                    _id: newId,
                                    existingMedia:
                                      updatedMedia || p.data.existingMedia,
                                    media: [],
                                  },
                                }
                              : p
                          )
                        );
                      })
                    }
                    disabled={saveLoading === pkg.id}
                    className={`px-6 py-3 rounded-lg font-medium text-white flex items-center ${
                      saveLoading === pkg.id
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-yellow-500 hover:bg-yellow-600"
                    } transition-colors duration-200`}
                  >
                    {saveLoading === pkg.id ? (
                      <>
                        <div className="animate-spin h-5 w-5 border-b-2 border-white rounded-full mr-2"></div>
                        Saving...
                      </>
                    ) : (
                      <>
                        <FontAwesomeIcon icon={faSave} className="mr-2" />
                        Save Package
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* Pagination */}
          {packages.length > packagesPerPage && (
            <div className="flex items-center justify-center mt-8">
              <div className="flex items-center space-x-2">
                <button
                  onClick={prevPage}
                  disabled={currentPage === 1}
                  className={`p-2 rounded-full ${
                    currentPage === 1
                      ? "text-gray-400 cursor-not-allowed"
                      : "text-yellow-500 hover:bg-yellow-100"
                  }`}
                >
                  <FontAwesomeIcon icon={faChevronLeft} />
                </button>

                <div className="flex space-x-1">
                  {Array.from({ length: totalPages }, (_, index) => (
                    <button
                      key={index}
                      onClick={() => paginate(index + 1)}
                      className={`w-8 h-8 flex items-center justify-center rounded-full ${
                        currentPage === index + 1
                          ? "bg-yellow-500 text-white"
                          : "text-gray-700 hover:bg-yellow-100"
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>

                <button
                  onClick={nextPage}
                  disabled={currentPage === totalPages}
                  className={`p-2 rounded-full ${
                    currentPage === totalPages
                      ? "text-gray-400 cursor-not-allowed"
                      : "text-yellow-500 hover:bg-yellow-100"
                  }`}
                >
                  <FontAwesomeIcon icon={faChevronRight} />
                </button>
              </div>

              <div className="ml-4 text-sm text-gray-500">
                Page {currentPage} of {totalPages} ({packages.length} packages)
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

const renderServiceName = (s) => {
  switch (s.businessCategory) {
    case "hotel":
      return `Room ${s.roomType} (${s.guestAmount} guests)`;
    case "carRental":
      return `Car ${s.carBrand} (${s.amountSeat} seats)`;
    case "event":
      return `Ticket ${s.ticketType} - ${new Date(
        s.eventDate
      ).toLocaleDateString("en-US")}`;
    case "course":
    case "restaurant":
      return `Course ${s.courseName}`;
    default:
      return `Service ID: ${s._id}`;
  }
};
