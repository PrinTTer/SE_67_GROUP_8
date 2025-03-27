import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faTimes,
  faTimesCircle,
  faCheckCircle,
  faBuilding,
  faBoxOpen
} from "@fortawesome/free-solid-svg-icons";
import { fetchData } from "../../services/apiService";
import { useParams } from "react-router-dom";
import { PackageBlock } from "./component/PackagePage";
import Addblock from "./component/AddBlock";
import { useSelector } from "react-redux";
import { BusinessEdit } from './component/BusinessEdit';
import LoadingSpinner from "../../components/LoadingSpinner";
import { ServiceBlock } from "./component/ServiceBlock";

const AddDetails = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [business, setBusiness] = useState(null);
  const [activeTab, setActiveTab] = useState('details');
  const { user } = useSelector((state) => state.auth);

  const fetchBusiness = async () => {
    try {
      setIsLoading(true);
      const data = await fetchData(`/businesses/${id}`);
      setBusiness(data);
    } catch (error) {
      console.error("Error fetching business:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchBusiness();
    }
  }, [id]);

  const type = business?.business?.category || "event";

  const topicConfig = {
    hotel: [
      "Hotel Information",
      "Room details",
      "Specify food and beverage service information",
      "Recreation facility",
      "Description"
    ],
    event: ["Event Information", "Ticket details", "Description"],
    restaurant: [
      "Working Date Information", 
      "Course details", 
      "Description"
    ],
    carRental: ["Working Date Information", "Car details", "Description"]
  };

  const topicBusines = topicConfig[type] || [];

  if (isLoading) {
    return (
      <div className="flex-1 min-h-[300px] p-6 bg-white rounded-xl shadow-md flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 bg-[#F7F7F7]">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <BusinessEdit 
          business={business} 
          fetchBusiness={fetchBusiness} 
        />

        <div className="p-6">
          {/* Tabs */}
          <div className="flex space-x-4 mb-4">
            <button
              onClick={() => setActiveTab('details')}
              className={`
                flex items-center space-x-2 px-4 py-2 rounded-lg transition-all
                ${activeTab === 'details' 
                  ? 'bg-[#FF6F00] text-white' 
                  : 'bg-[#F0F0F0] text-[#4A4A4A] hover:bg-[#E0E0E0]'}
              `}
            >
              <FontAwesomeIcon icon={faBuilding} />
              <span>{type}</span>
            </button>
            <button
              onClick={() => setActiveTab('package')}
              className={`
                flex items-center space-x-2 px-4 py-2 rounded-lg transition-all
                ${activeTab === 'package' 
                  ? 'bg-[#FF6F00] text-white' 
                  : 'bg-[#F0F0F0] text-[#4A4A4A] hover:bg-[#E0E0E0]'}
              `}
            >
              <FontAwesomeIcon icon={faBoxOpen} />
              <span>Package</span>
            </button>
          </div>

          {/* Content Sections */}
          <div className="bg-[#F0F0F0] rounded-lg p-4">
            {activeTab === 'details' && (
              <div>
                {business?.details?.map((element, index) => (
                  <Addblock
                    key={index}
                    title={element?.informationName}
                    type={type}
                    details={element}
                    detailId={element._id}
                    topicBusines={topicBusines}
                  />
                ))}
                <ServiceBlock 
                  title={topicBusines[1]} 
                  type={type} 
                  businessId={id} 
                  business={business}
                />
              </div>
            )}

            {activeTab === 'package' && (
              <PackageBlock 
                businessId={id} 
                userId={user?._id} 
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddDetails;