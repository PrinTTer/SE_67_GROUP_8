import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import huahinPoster from "../../assets/huahin_desktop.jpg";
import { fetchData, postData } from "../../services/apiService";

const DetailPackage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [packageData, setPackageData] = useState(null);
  const [mergedServices, setMergedServices] = useState([]);
  const [isBuying, setIsBuying] = useState(false); // ✅ Added loading state

  const handleBuyPackage = async () => {
    try {
      setIsBuying(true); // ✅ Start loading
      const body = {
        packageId: packageData._id,
        amount: 1,
        paymentMethod: "credit card",
      };

      const result = await postData("/users/packages", body);

      alert("Package purchased successfully!");
      // If you want to navigate to another page after successful purchase:
      // navigate(`/user/orders/${result.orderId}`);
    } catch (error) {
      console.error("Failed to purchase package", error);
      alert(
        "An error occurred while purchasing the package. Please try again later"
      );
    } finally {
      setIsBuying(false); // ✅ Stop loading whether success or fail
    }
  };

  useEffect(() => {
    const loadPackageAndBusinesses = async () => {
      try {
        const pkg = await fetchData(`/packages/${id}`);
        setPackageData(pkg);

        const businessIds = [...new Set(pkg.services.map((s) => s.businessId))];
        const businessList = await Promise.all(
          businessIds.map((id) => fetchData(`/businesses/${id}`))
        );

        const allBusinessServices = businessList.flatMap((b) =>
          b.services.map((s) => ({
            ...s,
            businessId: b.business._id,
            businessName: b.business.businessName,
            businessCategory: b.business.category,
          }))
        );

        const fullServices = pkg.services.map((s) => {
          const matched = allBusinessServices.find(
            (b) => b._id === s.serviceId
          );
          return { ...s, ...matched };
        });

        setMergedServices(fullServices);
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };

    loadPackageAndBusinesses();
  }, [id]);

  if (!packageData)
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-32 w-32 bg-gray-200 rounded-full mb-4"></div>
          <div className="text-gray-400 text-xl font-light">Loading...</div>
        </div>
      </div>
    );

  const formattedDate = new Date(packageData.dateCreate).toLocaleDateString(
    "en-US",
    {
      day: "numeric",
      month: "long",
      year: "numeric",
    }
  );

  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "THB",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(packageData.price);

  const mapCategoryToFolder = (category) => {
    switch (category) {
      case "hotel":
        return "rooms";
      case "carRental":
        return "cars";
      case "restaurant":
      case "course":
        return "courses";
      case "event":
        return "events";
      default:
        return "others";
    }
  };

  const getServiceImageUrl = (category, filename) => {
    const folder = mapCategoryToFolder(category);
    return `http://localhost:3000/public/uploads/services/${folder}/${filename}`;
  };

  const getPackageImageUrl = (filename) => {
    return `http://localhost:3000/public/uploads/services/packages/${filename}`;
  };

  const renderServiceByCategory = (service) => {
    return (
      <div className="bg-white rounded-xl overflow-hidden shadow-md transition-transform hover:scale-[1.02] duration-300 border border-gray-200">
        {service.media?.length > 0 && (
          <img
            src={getServiceImageUrl(service.businessCategory, service.media[0])}
            alt="Service Image"
            className="w-full h-48 object-cover"
          />
        )}
        <div className="p-4">
          {(() => {
            switch (service.businessCategory) {
              case "hotel":
                return (
                  <>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {service.roomType}
                    </h3>
                    <p className="text-sm text-gray-600">
                      Size: {service.roomSize}
                    </p>
                    <p className="text-sm text-gray-600">
                      Capacity: {service.guestAmount} people
                    </p>
                    {service.facilities?.length > 0 && (
                      <ul className="text-sm text-gray-500 mt-1 list-disc list-inside">
                        {service.facilities.map((f, i) => (
                          <li key={i}>{f}</li>
                        ))}
                      </ul>
                    )}
                  </>
                );
              case "carRental":
                return (
                  <>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {service.carBrand}
                    </h3>
                    <p className="text-sm text-gray-600">
                      License Plate: {service.licensePlate}
                    </p>
                    <p className="text-sm text-gray-600">
                      Seats: {service.amountSeat} people
                    </p>
                  </>
                );
              case "event":
                return (
                  <>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {service.ticketType || "Event Ticket"}
                    </h3>
                    <p className="text-sm text-gray-600">
                      Event Date:{" "}
                      {new Date(service.eventDate).toLocaleDateString("en-US")}
                    </p>
                    <p className="text-sm text-gray-600">
                      Time:{" "}
                      {new Date(service.start).toLocaleTimeString("en-US")} -{" "}
                      {new Date(service.end).toLocaleTimeString("en-US")}
                    </p>
                  </>
                );
              case "restaurant":
              case "course":
                return (
                  <>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {service.courseName || "Cooking Course"}
                    </h3>
                    {service.menuList?.length > 0 && (
                      <>
                        <p className="text-sm text-gray-600 mb-1">
                          Menu Items:
                        </p>
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
                    <h3 className="text-lg font-semibold text-gray-800">
                      Unknown Service Type
                    </h3>
                    <pre className="text-xs text-gray-400 mt-2">
                      {JSON.stringify(service, null, 2)}
                    </pre>
                  </>
                );
            }
          })()}
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col lg:flex-row bg-gray-50 min-h-screen">
      <div className="w-full lg:w-3/4 p-6 lg:p-10">
        <div className="relative w-full aspect-video overflow-hidden rounded-2xl shadow-lg mb-8">
          <img
            src={
              packageData.media?.length > 0
                ? getPackageImageUrl(packageData.media[0])
                : huahinPoster
            }
            alt="poster"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-8 w-full">
            <h1 className="text-4xl font-bold text-white mb-2 drop-shadow-lg">
              {packageData.title}
            </h1>
            <div className="flex items-center space-x-4">
              <p className="text-sm text-gray-200">{formattedDate}</p>
              <div className="h-4 w-px bg-gray-300"></div>
              <p className="text-sm font-medium bg-amber-500/90 text-white px-4 py-1 rounded-full">
                {formattedPrice} / person
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
            <span className="w-1.5 h-8 bg-amber-500 mr-3 rounded-full"></span>
            Package Details
          </h2>
          <div className="whitespace-pre-line text-gray-700 leading-7 font-light">
            {packageData.description}
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/4 p-6 lg:p-8 bg-white shadow-sm">
        <div className="sticky top-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
            <span className="w-1.5 h-8 bg-amber-500 mr-3 rounded-full"></span>
            Services Included
          </h2>

          <div className="space-y-6">
            {mergedServices.map((service) => (
              <div key={service.serviceId}>
                {renderServiceByCategory(service)}
              </div>
            ))}
          </div>

          <div className="mt-8 space-y-4">
            <div className="flex justify-between items-center text-lg border-t border-b border-gray-100 py-4">
              <span className="font-medium text-gray-800">Total Price</span>
              <span className="font-bold text-gray-900">{formattedPrice}</span>
            </div>
            <button
              onClick={handleBuyPackage}
              disabled={isBuying} // ✅ Disable button when loading
              className={`w-full ${
                isBuying
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700"
              } text-white font-medium py-3 px-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center`}
            >
              {isBuying ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 mr-2 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8z"
                    ></path>
                  </svg>
                  Purchasing...
                </>
              ) : (
                <>
                  <span>Buy Package Now</span>
                  <svg
                    className="ml-2 w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </>
              )}
            </button>
            <p className="text-center text-xs text-gray-500 mt-2">
              Guaranteed lowest price. No hidden fees.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPackage;
