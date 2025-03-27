import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBed } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";

export const Service = (prop) => {
    const { title, category, id, bookingDetail } = prop;
    const navigate = useNavigate();
    
    const serviceDetails = (item) => {
        //console.log(bookingDetail)
        navigate('/booking', {
            state: { item, category, bookingDetail }
        });
    };

    let Topic = getTopic(category);
    const [service, setService] = useState();
    const [head, setHead] = useState([]);

    useEffect(() => {
        switch(category){
            case "hotel": setService("rooms"); break;
            case "restaurant": setService("courses"); break;
            case "carRental": setService("cars"); break;
            case "event": setService("events"); break;
        }
    }, [category]);

    useEffect(() => {
        let newHead = [];
        switch (category) {
            case 'hotel': newHead = ['Room Type', 'Guest per Room', 'Room Size', 'Price', 'Facilities']; break;
            case 'event': newHead = ['Ticket Type', 'Price', 'Event Date', 'Start Date', 'End Date']; break;
            case 'carRental': newHead = ['Car Brand', 'Amount Seat', 'Price']; break;
            case 'restaurant': newHead = ['Course Name', 'Menu List', 'Price']; break;
            default: newHead = []; break;
        }
        setHead(newHead);
    }, [category]);

    const formatDate = (dateString, options={}) => {
        if (!dateString) return 'N/A';

    const defaultOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
        timeZone: 'Asia/Bangkok'  // Set the timezone to GMT+7 (Bangkok)
    };

    const mergedOptions = { ...defaultOptions, ...options };
    
    try {
        const date = new Date(dateString);
        
        // Check if date is valid
        if (isNaN(date.getTime())) return 'Invalid Date';

        // Format based on different scenarios
        if (options.timeOnly) {
            return date.toLocaleTimeString('en-US', { 
                hour: '2-digit', 
                minute: '2-digit', 
                hour12: true,
                timeZone: 'Asia/Bangkok' 
            });
        }

        if (options.dateOnly) {
            return date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                timeZone: 'Asia/Bangkok' 
            });
        }

        // Full date and time
        return date.toLocaleString('en-US', mergedOptions);
    } catch (error) {
        console.error('Error formatting date:', error);
        return 'N/A';
    }
    };

    return (
        <div className="p-4 rounded-lg gap-5 mb-5 bg-[#FFF4E0] shadow-md border border-[#FFA500]">
            <div className="col-span-2 border-b-2 border-[#FFA500] p-2 flex items-center font-bold text-[#8B4513]">
                <FontAwesomeIcon icon={faBed} className="mr-3 text-lg text-[#FFA500]" />
                <span>Service Detail</span>
            </div>
            
            {Array.isArray(title) && title.map((item, index) => (
                <div key={index} className="grid grid-cols-3 gap-4 p-4 bg-white shadow-md rounded-lg mt-3 border border-[#FFA500]">
                    <img 
                        src={`http://localhost:3000/public/uploads/services/${service}/${item?.media[0]}`} 
                        className="row-span-3 w-full h-auto object-cover rounded-lg"
                    />
                    {Topic.map((field, index) => (
                        <div key={index}>
                            <div className="font-bold text-[#8B4513]">{head[index]}</div>  
                            {Array.isArray(item[field]) ? (
                                <ul className="list-disc pl-5 grid grid-cols-2 text-[#8B4513]">
                                    {item[field].map((value, i) => (
                                        typeof value === "object" ? (
                                            <li key={i}>{value.name}</li>
                                        ) : (
                                            <li key={i}>{value}</li>
                                        )
                                    ))}
                                </ul>
                            ) : (
                                (field.toLowerCase().includes('date') || field.toLowerCase().includes('start') || field.toLowerCase().includes('end')) && item[field] ? (
                                    <div className="text-[#8B4513]">{formatDate(item[field])}</div>
                                ) : (
                                    <div className="text-[#8B4513]">{item[field]}</div>
                                )
                            )}
                        </div>
                    ))}

                    <div className="flex justify-end items-center font-bold col-span-3">
                        <button onClick={() => serviceDetails(item)} 
                            className="border border-[#FFA500] py-2 px-6 rounded-2xl bg-[#FFA500] text-white cursor-pointer hover:bg-[#FFD700] hover:text-[#8B4513]">
                            Choose
                        </button>   
                    </div> 
                </div>
            ))}
        </div>
    );
};

const getTopic = (category) => {
    let List = [];
    if (category === 'hotel') {
        List = ['roomType', 'guestAmount', 'roomSize', 'price', 'facilities'];
    } else if (category === 'event') {
        List = ['ticketType', 'price', 'eventDate', 'start', 'end'];
    } else if (category === 'carRental') {
        List = ['carBrand', 'amountSeat', 'price'];
    } else if (category === 'restaurant') {
        List = ['courseName', 'menuList', 'price'];
    }
    return List;
};