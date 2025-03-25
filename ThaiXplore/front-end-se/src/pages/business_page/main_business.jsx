import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchData } from "../../services/apiService";
import { BusinessBlock } from "../../components/BusinessBlock";

const MainBusiness = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [businesses, setBusinesses] = useState([]);

  const fetchBusinesses = async () => {
    try {
      setIsLoading(true);
      const data = await fetchData("/my-businesses");
      setBusinesses(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBusinesses();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="bg-[#ff6600] text-white px-6 py-4">
            <div className="text-2xl font-bold">My Business</div>
          </div>
          
          <div className="p-6">
            <Link to={"/profile/mainBusiness/createBusiness"}>
              <div className="flex items-center justify-center border-2 border-dashed border-[#ff6600] text-[#ff6600] rounded-lg py-8 mb-6 hover:bg-[#fff2e6] transition-colors duration-300 cursor-pointer">
                <FontAwesomeIcon icon={faCirclePlus} size="xl" className="mr-4" />
                <span className="text-xl font-medium">Add New Business</span>
              </div>
            </Link>

            {isLoading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-[#ff6600] mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading businesses...</p>
              </div>
            ) : businesses.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <p>No businesses found. Click 'Add New Business' to get started.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {businesses.map((business, index) => (
                  <BusinessBlock key={index} business={business} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainBusiness;