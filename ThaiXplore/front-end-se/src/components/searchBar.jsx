import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const SearchBar = () => {
    return (
        <div className="flex gap-2 py-2 px-2 rounded-full border border-gray-300 w-fit h-fit">
            <div>
                <FontAwesomeIcon icon={faMagnifyingGlass}/>
            </div>
            <div>
                <input type="text" className="focus:outline-0"/>
            </div>
        </div>
    );
};