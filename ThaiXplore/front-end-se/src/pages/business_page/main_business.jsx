import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { fetchData } from "../../services/apiService";

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

  console.log(businesses);

  return (
    <>
      <div className="flex flex-5">
        <div className="flex flex-1  flex-col p-5 m-8">
          <h1 className="">Your Business</h1>
          {
            isLoading ?
              (
                <div>
                  loading..
                </div>
              )
              :
              (
                <div>
                  {businesses.map((obj, index) => (
                    <div key={index} className="flex w-full h-32 items-center justify-center border-1 rounded-lg my-4 hover:bg-gray-300">
                      Business
                    </div>
                  ))}
                </div>

              )
          }
          <Link to={"/profile/mainBusiness/createBusiness"}>
            <div className="flex w-full h-32 items-center justify-center border-1 rounded-lg my-4 hover:bg-gray-300">
              <FontAwesomeIcon icon={faCirclePlus} size="lg" className="mx-4" />
              <h1 className="text-xl font-medium">Add Business</h1>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default MainBusiness;
