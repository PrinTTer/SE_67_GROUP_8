import { useEffect, useState } from "react";
import { fetchData } from '../../services/apiService';
import BookingDetail from "./component/bookingDetail";
import BookingForm from "./component/bookingForm";
import { useLocation } from "react-router-dom";
import PackageDetail from "./component/packageDetail";

const Booking = () => {
    const location = useLocation();
    const {item, category , bookingDetail} = location.state || {}; // ป้องกัน null
    const [packagesArr, setPackagesArr] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    //const [package, setPackage] = useState("");
    //console.log("item: \n",item, category);

    //console.log("BookingDetail",(bookingDetail));

    useEffect(() => {
        if(category === "package"){
            console.log("item from package: ",item);
            const fetchPackage = async () => {
                setLoading(true);
                setError(null);
                try {
                    const pkg = await fetchData(`/packages-details/${item?.packageId}`);
                    console.log("Package Details: ",pkg);
                    setPackagesArr(pkg);
                } catch (error) {
                    setError("Failed to load Package");
                    console.error("Error fetching Package:", error);
                } finally {
                    setLoading(false);
                }
            }
            fetchPackage();
        }else if(category === "quotation"){
            
        }
        
    }, []);
    
  
    return(
        <>  
            
            <div className="flex flex-5 items-center justify-center">
                <div className="flex flex-[1.2] h-full">
                    {category === "package" ? (
                        <PackageDetail item={packagesArr} category={category}/>
                    ) : (
                        <BookingDetail item={item} category={category}/>
                    )}
                    
                </div>
                <div className="flex flex-[3.8] h-full">
                    {category === "package" ? (
                        <BookingForm item={item} category={category} bookingDetail={bookingDetail}/>
                    ) : (
                        <BookingForm item={item} category={category} bookingDetail={bookingDetail}/>
                    )}
                </div>
            </div>
        </>
    );
}

export default Booking;