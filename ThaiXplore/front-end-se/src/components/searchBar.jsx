import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchData } from '../services/apiService'
import { getBusinessbyName } from '../data'

export const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    const [data, setData] = useState([]);

    
    
    useEffect(() => {

        const getBusiness = async () => {
                const result = await fetchData("businesses");
                setData(result);
            };

        getBusiness(); 
    }, []); 
    
    const Search = () => {
        const types = ["hotel", "event", "restaurant", "carRental"];
        
        console.log("Here")
        console.log(data) 
        
        if (types.includes(searchTerm)) {
            return navigate(`/listpage/${searchTerm}`);
        }
        else{
            if (!searchTerm.trim()){
                return navigate(`/`);
            }
            alert(searchTerm)
            return  navigate(`/listpage/${searchTerm}`);
            
        }
    };
    

    return (
        <div className="flex gap-2 py-2 px-2 rounded-full border border-gray-300 w-fit h-fit">
            <div>
                <FontAwesomeIcon 
                    icon={faMagnifyingGlass} 
                    onClick={Search} 
                    className="cursor-pointer"
                />
            </div>
            <div>
                <input
                    type="text"
                    className="focus:outline-0"
                    placeholder="Search (hotel, event, restaurant, carRental)"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && Search()} 
                />
            </div>
        </div>
    );
};
