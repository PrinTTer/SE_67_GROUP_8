import {  getBusiness } from "../../../data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBed } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";


export const Service = (prop) => {
    const { title } = prop
    const business = getBusiness(title);
    const linkTo = "/Detail/booking/"+title;
    
    return (
        <div className="p-4 rounded-lg gap-5 mb-5 bg-yellow-50 shadow-md border border-gray-300">
            <div className="col-span-2 border-b-2 p-2 flex items-center font-bold">
                <FontAwesomeIcon icon={faBed} className="mr-3 text-lg" />
                <span>Service Detail</span>
            </div>

            
            {business.service.map((item, index) => {
                if(business.type === "hotel") {
                    return (
                        <div key={index} className="p-2 bg-white rounded-lg shadow-sm border mt-3 grid grid-cols-3 gap-3 text-gray-700">
                        <div className="flex row-span-4 justify-center items-center">
                            <img src={item.img} className="rounded-lg " alt="Hotel Room" />
                        </div>
                        <div>
                            <h1 className="font-bold">Room Type</h1>
                            {item.roomType} 
                        </div>
                        <div>
                            <h1 className="font-bold">Room Facilities</h1>
                            {item["Room Facilities"]}
                        </div>
                        <div className="col-span-2">
                            <h1 className="font-bold">Size (sq.m.)</h1>
                            {item.size} 
                        </div>
                        <div className="col-span-1">
                            <h1 className="font-bold">Number of guests/room</h1>
                            {item["Number of guests/room"] + " Unit"} 
                        </div>
                        <div className="flex justify-start items-center font-bold row-span-2">
                        <Link to={linkTo+"/"+index.toString()}>
                            <button className="border py-2 px-6 rounded-2xl bg-[#007CE8] text-white cursor-pointer hover:bg-[#8bc7fc]">
                                Choose
                            </button> 
                        </Link>    
                        </div>
                        <div className="font-bold">
                            {item.price + " THB"} 
                        </div>
                    </div>) ;
                } else if (business.type === "event"){
                    return(
                        <div key={index} className="p-2 bg-white rounded-lg shadow-sm border mt-3 flex  gap-3 text-gray-700">
                            <div className="flex-1 flex justify-center ">
                                <img src={item.img} className="rounded-lg w-40 h-auto"/>
                            </div>
                            <div className="flex-4 grid  grid-cols-2">
                                <div>
                                    <h1 className="font-bold">TicketType</h1>
                                    {item.TicketType}
                                </div>
                                <div>
                                    <h1 className="font-bold">Round</h1>
                                    <h1>{item.Round.start} to {item.Round.end}</h1>
                                </div>
                                <div>
                                    <h1 className="font-bold">price</h1>
                                    {item.Price}
                                </div>  
                                <div className="flex justify-start items-center font-bold row-span-2">
                                    <button 
                                        onClick={() => alert("Hello")} 
                                        className="border py-2 px-6 rounded-2xl bg-[#007CE8] text-white cursor-pointer hover:bg-[#8bc7fc]"
                                    >
                                        Choose
                                    </button> 
                                </div>
                            </div>
                            
                            

                        </div>
                    );
                } else if(business.type === "food"){
                    return(
                        <div key={index} className="p-2 bg-white rounded-lg shadow-sm border mt-3 flex  gap-3 text-gray-700">
                            <div className="flex-1 flex justify-center ">
                                <img src={item.img} className="rounded-lg w-40 h-auto"/>
                            </div>
                            <div className="flex-4 grid  grid-cols-2">
                                <div>
                                    <h1 className="font-bold">Course Name</h1>
                                    {item["Course Name"]}
                                </div>
                                <div>
                                    <h1 className="font-bold">Price</h1>
                                    {item.price}
                                </div>
                                <div>
                                    <h1 className="font-bold">Menu</h1>
                                    <ul>
                                        {Object.entries(item["Menu List"]).map(([title, amount]) => (
                                            <li key={title}>{title}: {amount}</li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="flex justify-start items-center font-bold row-span-2">
                                    <button 
                                        onClick={() => alert("Hello")} 
                                        className="border py-2 px-6 rounded-2xl bg-[#007CE8] text-white cursor-pointer hover:bg-[#8bc7fc]"
                                    >
                                        Choose
                                    </button> 
                                </div>
                            </div>
                        </div>
                    );
                } else if (business.type === "car"){
                    return (
                        <div key={index} className="p-2 bg-white rounded-lg shadow-sm border mt-3 flex  gap-3 text-gray-700">
                            <div className="flex-1 flex justify-center ">
                                <img src={item.img} className="rounded-lg w-40 h-auto"/>
                            </div>
                            <div className="flex-4 grid  grid-cols-2">
                                <div>
                                    <h1 className="font-bold">Car Band</h1>
                                    {item.band}
                                </div>
                                <div>
                                    <h1 className="font-bold">Amount Seat</h1>
                                    {item.amountSeat}
                                </div>
                                <div>
                                    <h1 className="font-bold">Price</h1>
                                    {item.price}
                                </div>
                                <div className="flex justify-start items-center font-bold row-span-2">
                                    <button 
                                        className="border py-2 px-6 rounded-2xl bg-[#007CE8] text-white cursor-pointer hover:bg-[#8bc7fc]">
                                        Choose
                                    </button> 
                                
                                    
                                </div>
                            </div>
                        </div>
                    );
                }
                
            }
            )}

            

        </div>
    );
};


