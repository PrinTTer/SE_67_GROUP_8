import {  useState , useEffect} from 'react';
import { faPlus, faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


import {HotelService } from './HotelService';
import {EventService } from './EventService';
import {CarService } from './CarService';
import { RestaurantService } from './RestaurantService';

import axios from 'axios';

export const ServiceBlock = (prop) => {
    const { title, type, businessId, business } = prop;
    console.log("BUSID is " + businessId);
    const [show, setShow] = useState(true);
       
    const toggle = () => {
        setShow(!show);
    };


    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    
  
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`http://localhost:3000/businesses/${businessId}`, { withCredentials: true });
        const data_format = await res.data;
        setData(data_format);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
  
    useEffect(() => {
      fetchData();
    },[] );

    return (
        <div className="shadow-md m-4 p-4 rounded-md bg-[#F1F5F9]">
            <div className="grid grid-cols-2 border-b-2 p-1 text-lg mb-2">
                <div>{title}</div>
                <div className="flex justify-end items-end">
                    <button onClick={toggle}>
                        <FontAwesomeIcon icon={faPlus} className="border rounded-full p-1 cursor-pointer" />
                    </button>
                </div>
            </div>
            <div className={`${!show ? "block" : "hidden"}`}>
                <div className={`${type=="hotel" ? "block" : "hidden"}  `}>
                    <HotelService  id={businessId} title={title} type={type} fetchData={fetchData} data={data}/>
                </div>
                <div className={`${type=="event" ? "block" : "hidden"}  `}>
                    <EventService  id={businessId} title={title} type={type} fetchData={fetchData} data={data}/>
                    
                </div>
                <div className={`${type=="carRental" ? "block" : "hidden"}  `}>
                    <CarService  id={businessId} title={title}  type={type} fetchData={fetchData} data={data}/>
                    
                </div>

                <div className={`${type=="restaurant" ? "block" : "hidden"}  `}>
                    <RestaurantService  id={businessId} title={title} type={type} fetchData={fetchData} data={data}/>
                    
                </div>
            </div>
        </div>
    );
};


export const FileUpload = (prop) => {
    const { setImage } = prop
    const [fileName, setFileName] = useState("");

    const handleChange = (event) => {
        const file = event.target.files[0]; // Get the first file
        if (file) {
            setFileName(file.name); // Set file name to state
            setImage(file);
        }
    };

    return (
        <div className="relative flex flex-col text-green-400 w-fit h-fit cursor-pointer bg-[#F8FAFC] shadow-md p-2 rounded-md">
            {/* Hidden Input Covering Entire Area */}
            <input
                type="file"
                id="img"
                accept="image/*" 
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                onChange={handleChange}
            />

            <div className="flex items-center">
                <FontAwesomeIcon icon={faCirclePlus} className="text-lg" />
                <span className="ml-2 text-gray-700">{fileName || "No file selected"}</span>
            </div>
        </div>
    );
};

export const getTopic = (category) => {
    let List = [];
    if (category === "hotel") {
        List = ["roomType", "guestAmount", "roomSize", "price", "facilities"];
    } else if (category === "event") {
        List = ["ticketType", "price", "quantity", "eventDate", "start", "end"];
    } else if (category === "carRental") {
        List = ["carBrand", "amountSeat", "price"];
    } else if (category === "restaurant") {
        List = ["courseName", "menuList", "price"];
    }
    return List;
};
