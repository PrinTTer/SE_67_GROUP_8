import {  getBusiness, getService } from "../../../data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBed } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";


export const Service = (prop) => {
    const { title } = prop
    const business = getBusiness(title);
    const Topic = getService(title);
    const linkTo = "/Detail/booking/"+title;
    
    return (
        <div className="p-4 rounded-lg gap-5 mb-5 bg-yellow-50 shadow-md border border-gray-300">
            <div className="col-span-2 border-b-2 p-2 flex items-center font-bold">
                <FontAwesomeIcon icon={faBed} className="mr-3 text-lg" />
                <span>Service Detail</span>
            </div>
            {business.service.map((eachService, serviceIndex) => (
                <div key={serviceIndex} className="grid grid-cols-3 gap-4 p-4 bg-white shadow-md rounded-lg mb-3">
                    {Topic.map((item, topicIndex) => 
                        topicIndex === 0 ? (
                           
                            <div key={topicIndex} className="row-span-3 ">
                                <img
                                    src={eachService[item]} 
                                    className=" rounded-lg object-cover "
                                />
                            </div>
                        ) : (
                            
                            <div key={topicIndex} className="text-lg font-medium">
                                <div className="font-bold">
                                    {item} 
                                </div>
                                
                                {
                                    typeof eachService[item] === "object" ? Object.entries(eachService[item]).map(([key, value]) => (
                                        <div key={key}>
                                            {key}: {value}
                                        </div>
                                    ))
                                    : eachService[item]
                                }
                            </div>
                        )
                    )}
                    <div className="flex justify-start items-center font-bold row-span-2">
                        <Link to={linkTo+"/"+serviceIndex.toString()}>
                        <button 
                            className="border py-2 px-6 rounded-2xl bg-[#007CE8] text-white cursor-pointer hover:bg-[#8bc7fc]">
                            Choose
                        </button>   
                        </Link>    
                    </div>
                    
                </div>
                
            ))}
            

            

        </div>
    );
};


