import { NavBarWithOutText } from "../../component/navbar";
import BookingDetail from "./component/bookingDetail";
import BookingForm from "./component/bookingForm";
import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from 'axios';
const Booking = () => {
    const { id, index } = useParams();
    
    
    
  //fetch from axios

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const fetchData = async () => {
      try {
        
          setLoading(true);
          // eslint-disable-next-line no-unused-vars
          const loginRes = await axios.post("http://localhost:3000/auth/login", {
              email: "hatsawat.i@ku.th",
              password: "root2"
          },{withCredentials : true});
          
          
          const res = await axios.get(`http://localhost:3000/businesses/${id}`,{withCredentials : true});
          const data_format = await res.data;
          console.log("Here");
          console.log(data_format);
          setData(data_format);
      } catch (error) {
          setError(error.message);
      } finally {
          setLoading(false);
      }
  };

      useEffect(() => {
        fetchData();
    }, []);

    

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;
    
   
    console.log(data);
    return(
        <div className="flex flex-1">
            <NavBarWithOutText/>
            <div className="flex flex-[1.2]">
                {/* <BookingDetail business={business} index={index}/> */}
            </div>
            <div className="flex flex-[3.8]">
                {/* <BookingForm/> */}
            </div>
        </div>
    );
}

export default Booking;