import BookingDetail from "./component/bookingDetail";
import BookingForm from "./component/bookingForm";
import { useParams, useLocation } from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from 'axios';
const Booking = () => {
    const location = useLocation();
    const {item, category} = location.state || {}; // ป้องกัน null
    console.log("Hee Hee "+category);
    return(
        <>
            <div className="flex flex-5 items-center justify-center">
                <div className="flex flex-[1.2] h-full">
                    <BookingDetail item={item} category={category}/>
                </div>
                <div className="flex flex-[3.8] h-full">
                    <BookingForm/>
                </div>
            </div>
        </>
    );
}

export default Booking;