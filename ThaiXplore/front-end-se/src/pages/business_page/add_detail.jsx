import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faTimes,
  faTimesCircle,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";
import { getTopic } from "../../data";
import { ServiceBlock } from "./component/ServiceBlock";
import { fetchData, postData, putData } from "../../services/apiService";
import { useParams } from "react-router-dom";
import { PackageBlock } from "./component/PackagePage";
import Addblock from "./component/AddBlock";
import { useSelector } from "react-redux";
import { BusinessEdit } from './component/BusinessEdit';

const AddDetails = () => {
  let { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [business, setBusiness] = useState(null);
  const [show, setShow] = useState(true);
  const [head, setHead] = useState(business?.business?.category);
  const { user } = useSelector((state) => state.auth);


  useEffect(() => {
    if (user) {
      console.log("✅ User ID:", user._id);
    }
  }, [user]);

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

  let type = business?.business?.category || "event";

  let topicBusines;
  if (type == "hotel") {
    topicBusines = [
      "Hotel Information",
      "Room details",
      "Specify food and beverage service information",
      "Recreation facility",
      "Description",
    ];
  } else if (type == "event") {
    topicBusines = ["Event Information", "Ticket details", "Description"];
  } else if (type == "restaurant") {
    topicBusines = [
      "Working Date Information",
      "Course details",
      "Description",
    ];
  } else if (type == "carRental") {
    topicBusines = ["Working Date Information", "Car details", "Description"];
  }

  const toggle = (prop) => {
    const { title } = prop;

    if (head != title) {
      setShow(!show);
    }
    setHead(title);
  };
  if (isLoading) return <p>Loading...</p>;

  return (
    <div className='flex-cols flex-1'>
      <div className="flex flex-5  flex-col shadow-md">
        <div>
          <BusinessEdit business={business} fetchBusiness={fetchBusiness} />
        </div>
        <div className=" m-9 ">
          {/* 1 Image */}
          <div className={` grid grid-cols-1  ${business?.business?.media?.length === 1 ? "block" : "hidden"}`}>
            <img
              src={`http://localhost:3000/public/uploads/businesses/images/${business?.business?.media[0]}`}
              alt="Business Image"
              className="w-full h-[400px] object-cover"
            />
          </div>
          {/* No Image */}
          <div className={`col-span-2 ${business?.business?.media?.length === 0 ? "block" : "hidden"}`}>
            <img
              src={`https://st2.depositphotos.com/1561359/12101/v/950/depositphotos_121012076-stock-illustration-blank-photo-icon.jpg`}
              alt="Business Image"
              className="w-full h-[400px] object-cover"
            />
          </div>




        </div>





        <div className="flex-1 m-9">
          <div className="flex   rounded  gap-5 ml-2">
            <div
              className=" px-5 py-2 rounded-t-lg   bg-[#D9D9D9] cursor-pointer "
              onClick={() => toggle({ title: type })}
            >
              {type}
            </div>
            <div
              className=" px-5 py-2 rounded-t-lg   bg-[#D9D9D9] cursor-pointer "
              onClick={() => toggle({ title: "Package" })}
            >
              Package
            </div>
          </div>
          <div
            className={`bg-[#D9D9D9] p-4 rounded-lg ${show ? "block" : "hidden"
              }`}
          >
            {business?.details?.map((element, index) => {
              return (
                <Addblock
                  key={index}
                  title={element?.informationName}
                  type={type}
                  details={element}
                  detailId={element._id}
                  topicBusines={topicBusines}
                />
              );
            })}
            <ServiceBlock title={topicBusines[1]} type={type} businessId={id} business={business}/>
          </div>
          <div
            className={`bg-[#D9D9D9] p-4 rounded-lg ${!show ? "block" : "hidden"
              }`}
          >
            {/* <PackageBlock businessId={id} userId={"67c46fd9ff5f29ec1b16961e"} /> */}
            <PackageBlock businessId={id} userId={user?._id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddDetails;


