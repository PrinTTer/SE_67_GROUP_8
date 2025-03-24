import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { fetchData } from '../../services/apiService';

const BookingHistory = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBookings = async () => {
            setLoading(true);
            setError(null);
            try {
                const res = await fetchData("/bookings");
                setBookings(res);
            } catch (error) {
                setError("Failed to load bookings");
                console.error("Error fetching bookings:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBookings(); // call the fetch function when the component mounts
    }, []);

    console.log(bookings);

    return(
        <>
            <div className="flex flex-5">
                <div className="flex flex-1 border-1 m-10 flex-col">
                    <h1 className="text-4xl">My Booking</h1>
                    <div className="flex border w-full h-full p-8">
                        <div className="flex flex-col border w-full">

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default BookingHistory;

export const BookingUser = () => {
    return(
        <div>
            <h1>test</h1>
        </div>
    );
    
}