import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBed } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";


export const Service = (prop) => {
    const { title ,category ,id } = prop
    console.log(title , category)
    
    const linkTo = "/Detail/booking/"+id;
    let Topic = [] ;
    Topic = getTopic(category);
    console.log("Topic");
    console.log(Topic);
    return (
        <div className="p-4 rounded-lg gap-5 mb-5 bg-yellow-50 shadow-md border border-gray-300">
            <div className="col-span-2 border-b-2 p-2 flex items-center font-bold">
                <FontAwesomeIcon icon={faBed} className="mr-3 text-lg" />
                <span>Service Detail</span>
            </div>
            { Array.isArray(title) && title.map((item, index) => (
                <div key={index} className="grid grid-cols-3 gap-4 p-4 bg-white shadow-md rounded-lg mt-3">
                {Topic.map((field, index) => (
                    <div key={index}>
                        <div className="font-bold ">{field}</div>  
                        {Array.isArray(item[field]) ? (
                            <ul className="list-disc pl-5 grid grid-cols-2">
                                {item[field].map((value, i) => (

                                    typeof value === "object" ? (
                                        <li key={i}>{value.name}</li>
                                    ) : (
                                        <li key={i}>{value}</li>
                                    )
                                ))}
                            </ul>
                        ) : (
                            <div>{item[field]}</div>
                        )}
                    </div>
                ))}

                <div className="flex justify-end items-center font-bold col-span-3  ">
                        <Link to={linkTo+"/"+index}>
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

 const getTopic = (category) => {
    let List = [];
    if(category === 'hotel'){
        List = ['roomType', 'guestAmount', 'roomSize', 'price', 'facilities'];
    }
    else if (category === 'event'){
        List = ['ticketType', 'price', 'eventDate', 'start', 'end'];
    }
    else if (category === 'carRental'){
        List = ['carBrand',  'amountSeat', 'price'];
    }
    else if (category === 'restaurant'){
        List = ['courseName', 'menuList', 'price'];
    }
    return List;
};



