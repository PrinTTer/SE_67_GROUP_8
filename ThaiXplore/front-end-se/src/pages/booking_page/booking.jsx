import { NavBarWithOutText } from "../../component/navbar";
import BookingDetail from "./component/bookingDetail";
import BookingForm from "./component/bookingForm";
import { useParams } from "react-router-dom";
import { getBusiness } from "../../data";

const Booking = () => {
    const { title, index } = useParams();
    const business = getBusiness(title);

    return(
        <div className="flex flex-1">
            <NavBarWithOutText/>
            <div className="flex flex-[1.2]">
                <BookingDetail business={business} index={index}/>
            </div>
            <div className="flex flex-[3.8]">
                <BookingForm/>
            </div>
            
        </div>
    );
}

export default Booking;