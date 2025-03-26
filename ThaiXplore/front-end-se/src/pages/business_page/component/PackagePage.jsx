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
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const PackageBlock = ({ businessId, userId }) => {
  const [packages, setPackages] = useState([]);
  const [quotations, setQuotations] = useState([]);
  const [serviceDetails, setServiceDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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
    existingMedia: [], // Add this to track existing media
  });

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const allQuotations = await fetchData("/quotations");
        const userQuotations = allQuotations.filter((q) => q.userId === userId);
        setQuotations(userQuotations);

        const businessIds = [
          ...new Set(userQuotations.map((q) => q.toBusinessId)),
        ];
        const businesses = await Promise.all(
          businessIds.map((id) => fetchData(`/businesses/${id}`))
        );
        const allServices = businesses.flatMap((b) =>
          b.services.map((s) => ({
            ...s,
            businessId: b.business._id,
            businessCategory: b.business.category,
            businessName: b.business.businessName,
          }))
        );
        setServiceDetails(allServices);

        const pkgRes = await fetchData(`/packages/business/${businessId}`);
        const pkgMapped = pkgRes.map((pkg) => ({
          id: pkg._id,
          data: { 
            ...pkg, 
            media: [], // Keep this empty for new file uploads
            existingMedia: pkg.media || [] // Store existing media separately
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
    const payload = {
      title: data.title,
      description: data.description,
      media: data.existingMedia || [], // Use existing media in payload
      dateCreate: data.dateCreate || new Date().toISOString(),
      startDate: data.startDate,
      endDate: data.endDate,
      totalExpirationDate: data.totalExpirationDate,
      price: data.price,
      totalPackage: data.totalPackage,
      services: data.services.map((s) => ({
        quotationId: s.quotationId,
        serviceId: s.serviceId,
        businessId: s.businessId,
      })),
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

      // Only upload new media files if there are any
      if (data.media && data.media.length > 0) {
        await postDataWithFiles(
          `/packages/${packageId}/images`,
          data.media,
          {},
          "services_packages"
        );
        
        // After successful upload, update the package with the newly added media
        const updatedPackage = await fetchData(`/packages/${packageId}`);
        updateIdCallback(packageId, updatedPackage.media);
      }

      alert("Saved successfully");
    } catch (err) {
      console.error(err);
      alert("Save failed");
    }
  };

  const handleDeletePackage = async (id) => {
    if (!window.confirm("Delete this package?")) return;
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
                existingMedia: pkg.data.existingMedia.filter((path) => path !== imagePath),
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

  const allServices = quotations.flatMap(
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
  );

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg border border-yellow-100">
      <div className="flex items-center mb-6 border-b border-yellow-200 pb-4">
        <FontAwesomeIcon
          icon={faBox}
          className="text-yellow-500 text-2xl mr-3"
        />
        <h2 className="text-2xl font-bold text-gray-800">Manage Packages</h2>
      </div>

      <div
        className="flex items-center text-yellow-600 cursor-pointer mb-6 hover:text-yellow-700 bg-yellow-50 p-3 rounded-lg"
        onClick={() =>
          setPackages([
            ...packages,
            { id: generateTempId(), data: getEmptyPackage() },
          ])
        }
      >
        <FontAwesomeIcon icon={faPlusCircle} className="mr-2" />
        <span>Add New Package</span>
      </div>

      {isLoading ? (
        <div className="text-center py-8">
          <div className="animate-spin h-12 w-12 border-b-2 border-yellow-500 rounded-full mx-auto" />
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      ) : (
        packages.map((pkg) => (
          <div
            key={pkg.id}
            className="bg-yellow-50 p-5 mb-6 rounded-lg border border-yellow-200 shadow-md"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-lg">
                {pkg.data.title || "New Package"}
              </h3>
              <FontAwesomeIcon
                icon={faTimesCircle}
                className="text-red-500 text-xl cursor-pointer hover:text-red-700"
                onClick={() =>
                  pkg.id.startsWith("temp_")
                    ? setPackages(packages.filter((p) => p.id !== pkg.id))
                    : handleDeletePackage(pkg.id)
                }
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
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
                <div key={idx}>
                  <label className="text-gray-700 font-medium mb-1 block">
                    {f.label}
                  </label>
                  <input
                    type={f.type}
                    className="w-full p-2 border border-yellow-200 rounded-lg bg-white"
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

              <div className="md:col-span-2">
                <label className="block text-gray-700 font-medium mb-1">
                  Description
                </label>
                <textarea
                  className="w-full p-2 border border-yellow-200 rounded-lg bg-white"
                  value={pkg.data.description}
                  onChange={(e) =>
                    updatePackageData(pkg.id, {
                      ...pkg.data,
                      description: e.target.value,
                    })
                  }
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Upload New Images
                </label>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) =>
                    updatePackageData(pkg.id, {
                      ...pkg.data,
                      media: Array.from(e.target.files),
                    })
                  }
                  className="w-full p-2 border border-yellow-200 rounded-lg bg-white"
                />
              </div>
            </div>

            {/* Display Existing Uploaded Images */}
            {pkg.data._id && pkg.data.existingMedia && pkg.data.existingMedia.length > 0 && (
              <div className="mb-4">
                <h4 className="font-medium text-gray-700 mb-2">Existing Images</h4>
                <div className="flex flex-wrap gap-4 mb-4">
                  {pkg.data.existingMedia.map((img, idx) => (
                    <div key={idx} className="relative w-32 h-32">
                      <img
                        src={`http://localhost:3000/public/uploads/services/packages/${img}`}
                        className="object-cover w-full h-full rounded border"
                        alt={`Package image ${idx + 1}`}
                      />
                      <button
                        onClick={() => handleDeleteImage(pkg.data._id, img, idx + 1)}
                        className="absolute top-0 right-0 bg-red-500 text-white text-xs p-1 rounded-bl"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Show new uploaded files preview */}
            {pkg.data.media && pkg.data.media.length > 0 && (
              <div className="mb-4">
                <h4 className="font-medium text-gray-700 mb-2">New Images to Upload</h4>
                <div className="flex flex-wrap gap-4">
                  {Array.from(pkg.data.media).map((file, idx) => (
                    <div key={idx} className="relative w-32 h-32">
                      <img
                        src={URL.createObjectURL(file)}
                        className="object-cover w-full h-full rounded border"
                        alt={`New image ${idx + 1}`}
                      />
                      <button
                        onClick={() => 
                          updatePackageData(pkg.id, {
                            ...pkg.data,
                            media: Array.from(pkg.data.media).filter((_, i) => i !== idx)
                          })
                        }
                        className="absolute top-0 right-0 bg-red-500 text-white text-xs p-1 rounded-bl"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Select Service */}
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Add Services
              </label>
              <select
                className="w-full p-3 border border-yellow-200 rounded-lg bg-white"
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
                <option value="">-- Select Service --</option>
                {allServices.map((s, i) => (
                  <option key={i} value={s.serviceId}>
                    [{s.businessCategory}] {renderServiceName(s)}
                  </option>
                ))}
              </select>
            </div>

            {pkg.data.services.map((s, i) => (
              <li
                key={i}
                className="p-3 bg-white border border-yellow-200 rounded text-sm"
              >
                <div className="mb-2 font-medium text-gray-700">
                  Service:{" "}
                  {renderServiceName(
                    allServices.find(
                      (detail) => detail.serviceId === s.serviceId
                    ) || {}
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs text-gray-600">
                  <div>
                    <span className="font-semibold">Service ID:</span>
                    <div className="break-all">{s.serviceId}</div>
                  </div>
                  <div>
                    <span className="font-semibold">Business ID:</span>
                    <div className="break-all">{s.businessId}</div>
                  </div>
                  <div>
                    <span className="font-semibold">Quotation ID:</span>
                    <div className="break-all">{s.quotationId}</div>
                  </div>
                </div>
                <button
                  onClick={() =>
                    updatePackageData(pkg.id, {
                      ...pkg.data,
                      services: pkg.data.services.filter((_, idx) => idx !== i),
                    })
                  }
                  className="text-red-500 text-xs mt-2 hover:underline"
                >
                  Remove
                </button>
              </li>
            ))}

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
                              existingMedia: updatedMedia || p.data.existingMedia,
                              media: [] // Clear the media array after upload
                            } 
                          }
                        : p
                    )
                  );
                })
              }
              className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
            >
              Save This Package
            </button>
          </div>
        ))
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