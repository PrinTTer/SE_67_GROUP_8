import { useEffect, useState } from "react";
import {
  postData,
  fetchData,
  postDataWithFiles,
  putData,
  deleteData,
} from "../../../services/apiService";
import {
  faPlusCircle,
  faTimesCircle,
  faBox,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const PackageBlock = ({ businessId, userId }) => {
  const [packages, setPackages] = useState([{ id: Date.now(), data: getEmptyPackage() }]);
  const [quotations, setQuotations] = useState([]);
  const [serviceDetails, setServiceDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadQuotationsAndPackages = async () => {
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

        const res = await fetchData(`/packages/business/${businessId}`);
        const existingPackages = res.map((pkg) => ({
          id: pkg._id,
          data: {
            ...pkg,
            media: pkg.media || [],
          },
        }));

        setPackages(
          existingPackages.length > 0
            ? existingPackages
            : [{ id: Date.now(), data: getEmptyPackage() }]
        );
      } catch (err) {
        console.error("Error loading data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    if (businessId && userId) loadQuotationsAndPackages();
  }, [businessId, userId]);

  const addPackage = () => {
    setPackages([...packages, { id: Date.now(), data: getEmptyPackage() }]);
  };

  const removePackage = (id) => {
    setPackages(packages.filter((pkg) => pkg.id !== id));
  };

  const handleDeletePackage = async (packageId) => {
    if (!window.confirm("Are you sure you want to delete this package?")) return;

    setIsLoading(true);
    try {
      await deleteData(`/packages/${packageId}`);
      setPackages(packages.filter((p) => p.id !== packageId));
      alert("Package deleted successfully.");
    } catch (err) {
      console.error(err);
      alert("Failed to delete package");
    } finally {
      setIsLoading(false);
    }
  };

  const updatePackageData = (id, newData) => {
    setPackages(
      packages.map((pkg) => (pkg.id === id ? { ...pkg, data: newData } : pkg))
    );
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      for (const pkg of packages) {
        const data = pkg.data;
        const payload = {
          title: data.title,
          description: data.description,
          media: [],
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

        let packageId = pkg.id;
        const isExisting = typeof packageId === "string" && packageId.length === 24;

        if (isExisting) {
          await putData(`/packages/${packageId}`, payload);
          console.log(`Updated package ${packageId}`);
        } else {
          const newPkg = await postData(
            `/businesses/${businessId}/packages`,
            payload
          );
          packageId = newPkg._id;
          console.log(`Created package ${packageId}`);
        }

        if (data.media && data.media.length > 0) {
          await postDataWithFiles(
            `/packages/${packageId}/images`,
            data.media,
            {},
            "services_packages"
          );
        }
      }

      alert("All packages submitted successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to submit packages");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg border border-yellow-100">
      <div className="flex items-center mb-6 border-b border-yellow-200 pb-4">
        <FontAwesomeIcon icon={faBox} className="text-yellow-500 text-2xl mr-3" />
        <h2 className="text-2xl font-bold text-gray-800">Manage Packages</h2>
      </div>

      <div
        className="flex items-center text-yellow-600 cursor-pointer mb-6 hover:text-yellow-700 transition-colors duration-200 bg-yellow-50 p-3 rounded-lg"
        onClick={addPackage}
      >
        <FontAwesomeIcon icon={faPlusCircle} className="mr-2" />
        <span className="font-medium">Add New Package</span>
      </div>

      {isLoading ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading data...</p>
        </div>
      ) : (
        packages.map((pkg) => (
          <PackageForm
            key={pkg.id}
            data={pkg.data}
            onChange={(newData) => updatePackageData(pkg.id, newData)}
            onRemove={() =>
              typeof pkg.id === "string" && pkg.id.length === 24
                ? handleDeletePackage(pkg.id)
                : removePackage(pkg.id)
            }
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
        {isLoading ? "Submitting..." : "Save All Packages"}
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

  const handleDeleteImage = async (packageId, index) => {
    if (!window.confirm("Delete this image?")) return;
    try {
      await deleteData(`/packages/${packageId}/images/${index}`);
      updateField(
        "media",
        data.media.filter((_, i) => i !== index - 1)
      );
    } catch (err) {
      console.error(err);
      alert("Failed to delete image");
    }
  };

  return (
    <div className="bg-yellow-50 p-5 rounded-lg shadow-md mb-6 border border-yellow-200 transition-all duration-300">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-lg text-gray-800">
          {localData.title || "New Package"}
        </h3>
        <div className="flex space-x-3">
          <button onClick={() => setIsExpanded(!isExpanded)} className="text-yellow-600 hover:text-yellow-800">
            {isExpanded ? "Collapse" : "Expand"}
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <input className="input" placeholder="Package Name" value={localData.title} onChange={(e) => updateField("title", e.target.value)} />
            <input className="input" type="number" placeholder="Price" value={localData.price} onChange={(e) => updateField("price", e.target.value)} />
            <input className="input" type="number" placeholder="Quantity" value={localData.totalPackage} onChange={(e) => updateField("totalPackage", e.target.value)} />
            <input className="input" type="number" placeholder="Validity Days" value={localData.totalExpirationDate} onChange={(e) => updateField("totalExpirationDate", e.target.value)} />
            <input className="input" type="date" placeholder="Start Date" value={localData.startDate} onChange={(e) => updateField("startDate", e.target.value)} />
            <input className="input" type="date" placeholder="End Date" value={localData.endDate} onChange={(e) => updateField("endDate", e.target.value)} />
            <textarea className="input col-span-2" placeholder="Description" value={localData.description} onChange={(e) => updateField("description", e.target.value)} />
            <input type="file" accept="image/*" multiple onChange={(e) => updateField("media", Array.from(e.target.files))} />
          </div>

          {/* ✅ Show uploaded images */}
          {data._id && data.media && data.media.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-4">
              {data.media.map((imgName, idx) => (
                <div key={idx} className="relative w-32 h-32">
                  <img
                    src={`http://localhost:3000/public/uploads/services/packages/${imgName}`}
                    alt="uploaded"
                    className="object-cover w-full h-full rounded border"
                  />
                  <button
                    onClick={() => handleDeleteImage(data._id, idx + 1)}
                    className="absolute top-0 right-0 bg-red-500 text-white text-xs p-1 rounded-bl"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};
