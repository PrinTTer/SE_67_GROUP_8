import { NavBarWithOutText } from "../../layouts/navbar";
import BookingDetail from "./component/bookingDetail";
import BookingForm from "./component/bookingForm";
import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from 'axios';
const Booking = () => {
    return(
        <>
            <div className="flex flex-5 items-center justify-center">
                <div className="flex flex-[1.2] h-full">
                    <BookingDetail/>
                </div>
                <div className="flex flex-[3.8] h-full">
                    <BookingForm/>
                </div>
            </div>
        </>
    );
}

export default Booking;